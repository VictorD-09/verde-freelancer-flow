
import React from 'react';
import SignInForm from '@/components/auth/SignInForm';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Logo from '@/components/shared/Logo';
import AppLayout from '@/components/layout/AppLayout';

const SignIn = () => {
  const { t } = useLanguage();
  
  return (
    <AppLayout requireAuth={false}>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
         
          
          <div className="mt-8">
            <SignInForm />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default SignIn;
