
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

  const createCheckout = async (priceId: string) => {
    if (!user || !session) {
      toast.error('Please sign in to subscribe');
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
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
  };
};
