
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import TransactionList from '@/components/transactions/TransactionList';

const Transactions = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('transactions')}</h1>
      <TransactionList />
    </div>
  );
};

export default Transactions;
