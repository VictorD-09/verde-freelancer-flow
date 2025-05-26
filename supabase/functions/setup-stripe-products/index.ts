
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SETUP-STRIPE-PRODUCTS] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    // Create or get products and prices
    const products = [
      {
        name: "Freemium",
        description: "Plano Freemium com 7 dias grátis",
        amount: 500, // $5.00
        interval: "month",
        trial_days: 7
      },
      {
        name: "Standard", 
        description: "Plano Standard intermediário",
        amount: 1499, // $14.99
        interval: "month"
      },
      {
        name: "Premium",
        description: "Plano Premium completo", 
        amount: 2999, // $29.99
        interval: "month"
      }
    ];

    const createdPrices = [];

    for (const productData of products) {
      logStep(`Creating/checking product: ${productData.name}`);
      
      // Check if product already exists
      const existingProducts = await stripe.products.list({
        limit: 100,
      });
      
      let product = existingProducts.data.find(p => p.name === productData.name);
      
      if (!product) {
        // Create product
        product = await stripe.products.create({
          name: productData.name,
          description: productData.description,
          type: 'service',
        });
        logStep(`Created product: ${product.name}`, { productId: product.id });
      } else {
        logStep(`Found existing product: ${product.name}`, { productId: product.id });
      }

      // Check if price already exists for this product
      const existingPrices = await stripe.prices.list({
        product: product.id,
        limit: 100,
      });
      
      let price = existingPrices.data.find(p => 
        p.unit_amount === productData.amount && 
        p.recurring?.interval === productData.interval
      );

      if (!price) {
        // Create price
        const priceData: any = {
          product: product.id,
          unit_amount: productData.amount,
          currency: 'usd',
          recurring: {
            interval: productData.interval,
          },
        };

        price = await stripe.prices.create(priceData);
        logStep(`Created price for ${product.name}`, { 
          priceId: price.id, 
          amount: productData.amount 
        });
      } else {
        logStep(`Found existing price for ${product.name}`, { 
          priceId: price.id, 
          amount: productData.amount 
        });
      }

      createdPrices.push({
        product: product.name,
        productId: product.id,
        priceId: price.id,
        amount: productData.amount,
        trialDays: productData.trial_days
      });
    }

    logStep("All products and prices ready", { count: createdPrices.length });

    return new Response(JSON.stringify({ 
      success: true,
      products: createdPrices,
      message: "Produtos e preços configurados com sucesso"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in setup-stripe-products", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
