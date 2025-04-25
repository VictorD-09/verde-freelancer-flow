
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/context/SettingsContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleSubscribe = () => {
    toast.info(t('connect-stripe-message'));
  };
  
  const handleManage = () => {
    navigate('/settings');
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('subscription')}</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Free Plan */}
        <Card className="border-verde-500">
          <CardHeader>
            <CardTitle>{t('free-plan')}</CardTitle>
            <div className="mt-4 flex items-baseline justify-center">
              <span className="text-3xl font-bold">$0</span>
              <span className="ml-1 text-sm text-muted-foreground">/ {t('month')}</span>
            </div>
            <CardDescription className="text-center">
              <div className="bg-verde-50 text-verde-800 rounded-full px-2 py-0.5 text-xs font-medium inline-block mt-2">
                {t('current-plan')}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('unlimited-transactions')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('basic-reports')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('up-to-3-accounts')}</span>
              </div>
              <div className="flex items-center text-m">
                <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{t('limited-categories')}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" onClick={handleManage}>
              {t('manage-subscription')}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Premium Plan */}
        <Card>
          <CardHeader>
            <CardTitle>{t('premium-plan')}</CardTitle>
            <div className="mt-4 flex items-baseline justify-center">
              <span className="text-3xl font-bold">$4.99</span>
              <span className="ml-1 text-sm text-muted-foreground">/ {t('month')}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('unlimited-transactions')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('advanced-reports')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('unlimited-accounts')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('unlimited-categories')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('data-export')}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubscribe}>
              {t('upgrade')}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Business Plan */}
        <Card>
          <CardHeader>
            <CardTitle>{t('business-plan')}</CardTitle>
            <div className="mt-4 flex items-baseline justify-center">
              <span className="text-3xl font-bold">$9.99</span>
              <span className="ml-1 text-sm text-muted-foreground">/ {t('month')}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('all-premium-features')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('team-access')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('custom-categories')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('integration-apis')}</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 mr-2 text-verde-500" />
                <span className="text-sm">{t('priority-support')}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubscribe}>
              {t('upgrade')}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-muted/50 p-6 rounded-lg border mt-8">
        <h2 className="text-xl font-medium mb-4">{t('subscription-info')}</h2>
        <div className="space-y-4">
          <p className="text-sm">
            {t('subscription-description')}
          </p>
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            <p className="text-sm">
              {t('connect-stripe-info')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
