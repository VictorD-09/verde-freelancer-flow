
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinance } from '@/context/FinanceContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/context/SettingsContext';
import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RecentTransactions = () => {
  const { transactions, accounts, categories } = useFinance();
  const { t } = useLanguage();
  const { settings } = useSettings();
  
  // Get most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  // Get account name by ID
  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown Account';
  };
  
  // Get category name by ID
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Uncategorized';
  };
  
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          {t('recent-transactions')}
        </CardTitle>
        <Link to="/transactions">
          <Button variant="ghost" size="sm" className="gap-1 text-sm">
            {t('all')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center p-2 hover:bg-muted/50 rounded-md">
                <div className="mr-4">
                  {transaction.type === 'income' ? (
                    <div className="w-10 h-10 rounded-full bg-verde-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-verde-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {transaction.description}
                  </p>
                  <div className="flex text-xs text-muted-foreground">
                    <span>{getCategoryName(transaction.categoryId)}</span>
                    <span className="mx-1">•</span>
                    <span>{getAccountName(transaction.accountId)}</span>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  transaction.type === 'income' ? 'text-verde-600' : 'text-red-500'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount, settings.currency)}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">{t('no-transactions')}</p>
              <Link to="/transactions/new">
                <Button variant="outline" size="sm" className="mt-2">
                  {t('add-transaction')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
