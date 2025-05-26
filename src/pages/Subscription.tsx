import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, Crown, Star, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

const Subscription = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const { 
    subscribed, 
    subscription_tier, 
    subscription_end, 
    loading, 
    createCheckout, 
    openCustomerPortal,
    checkSubscription
  } = useSubscription();

  // Handle success/cancel from Stripe checkout
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Assinatura ativada com sucesso!');
      checkSubscription();
    } else if (searchParams.get('canceled')) {
      toast.info('Configuração da assinatura foi cancelada');
    }
  }, [searchParams, checkSubscription]);

  const subscriptionPlans = [
    {
      id: 'freemium',
      name: 'Freemium',
      price: '$5.00',
      description: '7 dias grátis, depois $5/mês',
      priceId: 'price_freemium_plan',
      icon: <Zap className="h-6 w-6" />,
      features: [
        'Transações ilimitadas',
        'Relatórios básicos',
        'Até 5 contas',
        'Categorias padrão',
        '7 dias de teste grátis'
      ],
      isPopular: false,
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$14.99',
      description: 'Plano intermediário',
      priceId: 'price_standard_plan',
      icon: <Star className="h-6 w-6" />,
      features: [
        'Tudo do Freemium',
        'Relatórios avançados',
        'Contas ilimitadas',
        'Categorias personalizadas',
        'Exportação de dados',
        'Suporte prioritário'
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$29.99',
      description: 'Plano completo',
      priceId: 'price_premium_plan',
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Tudo do Standard',
        'Acesso para equipe',
        'APIs de integração',
        'Relatórios personalizados',
        'Backup automático',
        'Consultoria financeira',
        'Suporte 24/7'
      ],
      isPopular: false,
    },
  ];

  const handleSubscribe = (priceId: string) => {
    console.log('Subscribing to plan:', priceId);
    createCheckout(priceId);
  };

  const isCurrentPlan = (planId: string) => {
    if (!subscribed && planId === 'free') return true;
    return subscription_tier === planId;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
        <p className="text-xl text-muted-foreground">
          Gerencie suas finanças com o plano ideal para você
        </p>
      </div>

      {subscribed && (
        <Card className="border-verde-500 bg-verde-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Plano Atual: {subscription_tier}</h3>
                <p className="text-sm text-muted-foreground">
                  {subscription_end && `Renovação em: ${new Date(subscription_end).toLocaleDateString('pt-BR')}`}
                </p>
              </div>
              <Button onClick={openCustomerPortal} variant="outline">
                Gerenciar Assinatura
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-6 md:grid-cols-3">
        {subscriptionPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${isCurrentPlan(plan.id) ? 'border-verde-500 ring-2 ring-verde-200' : ''} ${plan.isPopular ? 'border-blue-500' : ''}`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
            )}
            
            {isCurrentPlan(plan.id) && (
              <div className="absolute -top-3 right-4">
                <span className="bg-verde-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Plano Atual
                </span>
              </div>
            )}

            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                {plan.icon}
              </div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <CardDescription className="text-center mt-2">
                {plan.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-3 text-verde-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter>
              {isCurrentPlan(plan.id) ? (
                <Button className="w-full" variant="outline" disabled>
                  Plano Atual
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={() => handleSubscribe(plan.priceId)}
                  disabled={loading}
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {loading ? 'Carregando...' : 'Assinar Agora'}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted/50 p-6 rounded-lg border mt-8">
        <h2 className="text-xl font-medium mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
          Informações Importantes
        </h2>
        <div className="space-y-4 text-sm">
          <p>
            • O plano Freemium oferece 7 dias de teste gratuito, após o período será cobrado $5/mês
          </p>
          <p>
            • Todos os planos são cobrados mensalmente e podem ser cancelados a qualquer momento
          </p>
          <p>
            • Você pode fazer upgrade ou downgrade do seu plano através do portal do cliente
          </p>
          <p>
            • Os pagamentos são processados de forma segura através do Stripe
          </p>
          <p>
            • Os produtos são criados automaticamente no Stripe quando necessário
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
