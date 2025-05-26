
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface SubscriptionStatus {
  subscribed: boolean;
  subscription_tier: string;
  subscription_end: string | null;
  loading: boolean;
}

export const useSubscription = () => {
  const { user, session } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>({
    subscribed: false,
    subscription_tier: 'free',
    subscription_end: null,
    loading: true,
  });

  const checkSubscription = async () => {
    if (!user || !session) {
      setSubscriptionStatus(prev => ({ ...prev, loading: false }));
      return;
    }

    try {
      setSubscriptionStatus(prev => ({ ...prev, loading: true }));
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscriptionStatus({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || 'free',
        subscription_end: data.subscription_end,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscriptionStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const setupStripeProducts = async () => {
    if (!user || !session) {
      toast.error('Please sign in to setup products');
      return null;
    }

    try {
      const { data, error } = await supabase.functions.invoke('setup-stripe-products', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      
      toast.success('Produtos Stripe configurados com sucesso!');
      return data.products;
    } catch (error) {
      console.error('Error setting up Stripe products:', error);
      toast.error('Erro ao configurar produtos Stripe');
      return null;
    }
  };

  const createCheckout = async (priceId: string) => {
    if (!user || !session) {
      toast.error('Please sign in to subscribe');
      return;
    }

    try {
      // First setup products if needed
      const products = await setupStripeProducts();
      if (!products) return;

      // Find the correct price ID from the created products
      let actualPriceId = priceId;
      if (priceId === 'price_freemium_plan') {
        const freemiumProduct = products.find((p: any) => p.product === 'Freemium');
        if (freemiumProduct) actualPriceId = freemiumProduct.priceId;
      } else if (priceId === 'price_standard_plan') {
        const standardProduct = products.find((p: any) => p.product === 'Standard');
        if (standardProduct) actualPriceId = standardProduct.priceId;
      } else if (priceId === 'price_premium_plan') {
        const premiumProduct = products.find((p: any) => p.product === 'Premium');
        if (premiumProduct) actualPriceId = premiumProduct.priceId;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: actualPriceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error('Failed to create checkout session');
    }
  };

  const openCustomerPortal = async () => {
    if (!user || !session) {
      toast.error('Please sign in to manage subscription');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast.error('Failed to open customer portal');
    }
  };

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  return {
    ...subscriptionStatus,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
    setupStripeProducts,
  };
};
