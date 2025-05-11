
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import BalanceCard from '@/components/dashboard/BalanceCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import CategorySummary from '@/components/dashboard/CategorySummary';
import AppLayout from '@/components/layout/AppLayout';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getUserName = () => {
    return user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  };

  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          {t('welcome-back')}, {getUserName()}!
        </h1>

        <BalanceCard />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentTransactions />
          <div className="space-y-6">
            <CategorySummary type="income" />
            <CategorySummary type="expense" />
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
