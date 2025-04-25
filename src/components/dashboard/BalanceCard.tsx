
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinance } from '@/context/FinanceContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/context/SettingsContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

const BalanceCard = () => {
  const { totalBalance, totalIncome, totalExpense } = useFinance();
  const { t } = useLanguage();
  const { settings } = useSettings();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white border-green-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-muted-foreground">
            {t('total-balance')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(totalBalance, settings.currency)}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-green-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-muted-foreground flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-verde-600" />
            {t('income')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-verde-600">
            {formatCurrency(totalIncome, settings.currency)}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-green-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-muted-foreground flex items-center">
            <TrendingDown className="h-4 w-4 mr-2 text-red-500" />
            {t('expenses')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">
            {formatCurrency(totalExpense, settings.currency)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceCard;
