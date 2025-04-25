
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinance } from '@/context/FinanceContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/context/SettingsContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategorySummaryProps {
  type: 'income' | 'expense';
}

const COLORS = [
  '#4CAF50', '#8BC34A', '#CDDC39', '#2E7D32', '#388E3C', '#689F38', '#558B2F',
  '#FF5722', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
];

const CategorySummary = ({ type }: CategorySummaryProps) => {
  const { transactions, categories } = useFinance();
  const { t } = useLanguage();
  const { settings } = useSettings();
  
  const chartData = useMemo(() => {
    // Filter transactions by type
    const filteredTransactions = transactions.filter(t => t.type === type);
    
    // Group by category and sum amounts
    const categoryTotals = new Map();
    
    filteredTransactions.forEach(transaction => {
      const currentTotal = categoryTotals.get(transaction.categoryId) || 0;
      categoryTotals.set(transaction.categoryId, currentTotal + transaction.amount);
    });
    
    // Convert to array of objects for chart
    return Array.from(categoryTotals.entries()).map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        name: category ? category.name : 'Unknown',
        value: amount as number,
      };
    }).sort((a, b) => b.value - a.value);
  }, [transactions, categories, type]);
  
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {type === 'income' ? t('income-by-category') : t('expenses-by-category')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return percent > 0.05 ? (
                      <text
                        x={x}
                        y={y}
                        fill="white"
                        textAnchor={x > cx ? 'start' : 'end'}
                        dominantBaseline="central"
                      >
                        {`${(percent * 100).toFixed(0)}%`}
                      </text>
                    ) : null;
                  }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number, settings.currency)} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {type === 'income' ? t('no-income') : t('no-expenses')}
            </p>
          </div>
        )}
        
        <div className="mt-4">
          <div className="text-sm font-medium text-muted-foreground">
            {t('total')}
          </div>
          <div className="text-2xl font-semibold">
            {formatCurrency(total, settings.currency)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySummary;
