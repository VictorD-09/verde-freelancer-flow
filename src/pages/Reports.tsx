
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/context/SettingsContext';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = [
  '#4CAF50', '#8BC34A', '#CDDC39', '#2E7D32', '#388E3C', '#689F38', '#558B2F',
  '#FF5722', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3',
];

const Reports = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { transactions, categories, accounts } = useFinance();

  // Helper function to get last n months
  const getLastMonths = (n: number) => {
    const months = [];
    const now = new Date();
    
    for (let i = 0; i < n; i++) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.unshift(month);
    }
    
    return months;
  };

  // Generate monthly data for line chart
  const monthlyData = getLastMonths(6).map(month => {
    const monthName = month.toLocaleDateString('en-US', { month: 'short' });
    const year = month.getFullYear();
    const startDate = new Date(year, month.getMonth(), 1);
    const endDate = new Date(year, month.getMonth() + 1, 0);
    
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date >= startDate && date <= endDate;
    });
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
    
    const expense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
    
    return {
      name: `${monthName} ${year}`,
      income,
      expense,
      balance: income - expense,
    };
  });

  // Generate category data for pie chart
  const categoryData = categories.map(category => {
    const categoryTransactions = transactions.filter(t => 
      t.categoryId === category.id && t.type === category.type
    );
    
    const total = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    return {
      name: category.name,
      value: total,
      type: category.type,
    };
  }).filter(item => item.value > 0);

  // Generate account data for bar chart
  const accountData = accounts.map(account => ({
    name: account.name,
    balance: account.balance,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('reports')}</h1>
      
      {/* Monthly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('financial-overview')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number, settings.currency)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  name={t('income')} 
                  stroke="#4CAF50" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="expense" 
                  name={t('expenses')} 
                  stroke="#FF5722" 
                />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  name={t('balance')} 
                  stroke="#2196F3"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Account Balances */}
      <Card>
        <CardHeader>
          <CardTitle>{t('account-balances')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={accountData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number, settings.currency)} />
                <Legend />
                <Bar dataKey="balance" name={t('balance')} fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Category Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income by Category */}
        <Card>
          <CardHeader>
            <CardTitle>{t('income-by-category')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData.filter(c => c.type === 'income')}
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
                    {categoryData.filter(c => c.type === 'income').map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number, settings.currency)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Expenses by Category */}
        <Card>
          <CardHeader>
            <CardTitle>{t('expenses-by-category')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData.filter(c => c.type === 'expense')}
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
                    {categoryData.filter(c => c.type === 'expense').map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number, settings.currency)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
