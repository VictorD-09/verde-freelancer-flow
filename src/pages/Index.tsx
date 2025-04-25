
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import Logo from '@/components/shared/Logo';
import { Database, Wallet, AreaChart, CheckCircle, Globe } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <AppLayout requireAuth={false}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Logo />
            <div className="space-x-4">
              <Button variant="ghost" onClick={() => navigate('/signin')}>
                {t('sign-in')}
              </Button>
              <Button onClick={() => navigate('/signup')}>
                {t('sign-up')}
              </Button>
            </div>
          </div>
        </header>

        {/* Hero section */}
        <section className="flex-1 bg-gradient-to-b from-verde-50 to-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {t('landing-hero-title')}
                </h1>
                <p className="text-lg text-gray-600">
                  {t('landing-hero-description')}
                </p>
                <div className="pt-4">
                  <Button size="lg" className="mr-4" onClick={() => navigate('/signup')}>
                    {t('get-started-free')}
                  </Button>
                  <Button size="lg" variant="outline">
                    {t('learn-more')}
                  </Button>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-lg border">
                <img 
                  src="/placeholder.svg" 
                  alt="Dashboard preview" 
                  className="rounded"
                  width="600"
                  height="400"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('landing-features-title')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border">
                <div className="w-12 h-12 bg-verde-100 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="h-6 w-6 text-verde-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('expense-tracking')}</h3>
                <p className="text-gray-600">
                  {t('expense-tracking-description')}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <div className="w-12 h-12 bg-verde-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-verde-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('income-management')}</h3>
                <p className="text-gray-600">
                  {t('income-management-description')}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border">
                <div className="w-12 h-12 bg-verde-100 rounded-lg flex items-center justify-center mb-4">
                  <AreaChart className="h-6 w-6 text-verde-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('financial-reports')}</h3>
                <p className="text-gray-600">
                  {t('financial-reports-description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-16 bg-verde-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t('landing-benefits-title')}
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-verde-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('easy-to-use')}</h3>
                  <p className="text-gray-600">{t('easy-to-use-description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-verde-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('time-saving')}</h3>
                  <p className="text-gray-600">{t('time-saving-description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-verde-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('financial-clarity')}</h3>
                  <p className="text-gray-600">{t('financial-clarity-description')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="h-6 w-6 text-verde-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('multilingual')}</h3>
                  <p className="text-gray-600">{t('multilingual-description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t('landing-cta-title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('landing-cta-description')}
            </p>
            <Button size="lg" onClick={() => navigate('/signup')}>
              {t('get-started-free')}
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Logo />
                <p className="text-sm text-gray-600 mt-2">
                  &copy; {new Date().getFullYear()} Verde. {t('all-rights-reserved')}
                </p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-600 hover:text-verde-600">{t('privacy-policy')}</a>
                <a href="#" className="text-sm text-gray-600 hover:text-verde-600">{t('terms-of-service')}</a>
                <a href="#" className="text-sm text-gray-600 hover:text-verde-600">{t('contact')}</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AppLayout>
  );
};

export default Index;
