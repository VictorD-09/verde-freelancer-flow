
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { priceId } = await req.json();
    
    if (!priceId) {
      throw new Error("Price ID is required");
    }

    logStep("Price ID received", { priceId });

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

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      logStep("Creating new customer");
    }

    // Create direct price mapping for our known plans
    let actualPriceId = priceId;
    
    // Map our plan IDs to create products if needed
    if (priceId === 'price_freemium_plan' || priceId === 'price_standard_plan' || priceId === 'price_premium_plan') {
      // Create products first
      const products = [
        {
          name: "Freemium",
          description: "Plano Freemium com 7 dias grátis",
          amount: 500, // $5.00
          interval: "month",
          trial_days: 7,
          planId: 'price_freemium_plan'
        },
        {
          name: "Standard", 
          description: "Plano Standard intermediário",
          amount: 1499, // $14.99
          interval: "month",
          planId: 'price_standard_plan'
        },
        {
          name: "Premium",
          description: "Plano Premium completo", 
          amount: 2999, // $29.99
          interval: "month",
          planId: 'price_premium_plan'
        }
      ];

      const selectedProduct = products.find(p => p.planId === priceId);
      if (selectedProduct) {
        logStep(`Creating product and price for ${selectedProduct.name}`);
        
        // Check if product already exists
        const existingProducts = await stripe.products.list({
          limit: 100,
        });
        
        let product = existingProducts.data.find(p => p.name === selectedProduct.name);
        
        if (!product) {
          product = await stripe.products.create({
            name: selectedProduct.name,
            description: selectedProduct.description,
            type: 'service',
          });
          logStep(`Created product: ${product.name}`, { productId: product.id });
        }

        // Check if price already exists for this product
        const existingPrices = await stripe.prices.list({
          product: product.id,
          limit: 100,
        });
        
        let price = existingPrices.data.find(p => 
          p.unit_amount === selectedProduct.amount && 
          p.recurring?.interval === selectedProduct.interval
        );

        if (!price) {
          price = await stripe.prices.create({
            product: product.id,
            unit_amount: selectedProduct.amount,
            currency: 'usd',
            recurring: {
              interval: selectedProduct.interval,
            },
          });
          logStep(`Created price for ${product.name}`, { 
            priceId: price.id, 
            amount: selectedProduct.amount 
          });
        }

        actualPriceId = price.id;
      }
    }

    logStep("Using price ID for checkout", { actualPriceId });

    // Define trial period based on plan
    const trialPeriodDays = priceId === 'price_freemium_plan' ? 7 : undefined;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: actualPriceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      subscription_data: trialPeriodDays ? {
        trial_period_days: trialPeriodDays,
      } : undefined,
      success_url: `${req.headers.get("origin")}/subscription?success=true`,
      cancel_url: `${req.headers.get("origin")}/subscription?canceled=true`,
      allow_promotion_codes: true,
    });

    logStep("Checkout session created", { sessionId: session.id, trialDays: trialPeriodDays });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
