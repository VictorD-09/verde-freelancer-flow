
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

  return (
    <AppLayout requireAuth={true}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          {t('welcome-back')}, {user?.name}!
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
    </AppLayout>
  );
};

export default Dashboard;
