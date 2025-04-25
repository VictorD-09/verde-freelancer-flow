
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define types for our financial entities
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  date: string;
  categoryId: string;
  accountId: string;
  description: string;
}

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

interface FinanceContextType {
  transactions: Transaction[];
  accounts: Account[];
  categories: Category[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

// Sample data for initial state
const sampleCategories: Category[] = [
  { id: 'cat1', name: 'Salary', type: 'income' },
  { id: 'cat2', name: 'Freelancing', type: 'income' },
  { id: 'cat3', name: 'Investments', type: 'income' },
  { id: 'cat4', name: 'Rent', type: 'expense' },
  { id: 'cat5', name: 'Groceries', type: 'expense' },
  { id: 'cat6', name: 'Utilities', type: 'expense' },
  { id: 'cat7', name: 'Entertainment', type: 'expense' },
  { id: 'cat8', name: 'Eating Out', type: 'expense' },
  { id: 'cat9', name: 'Transportation', type: 'expense' },
];

const sampleAccounts: Account[] = [
  { id: 'acc1', name: 'Cash', type: 'Cash', balance: 1000 },
  { id: 'acc2', name: 'Checking Account', type: 'Bank Account', balance: 5000 },
  { id: 'acc3', name: 'Savings Account', type: 'Bank Account', balance: 10000 },
];

const generateSampleTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const currentDate = new Date();
  
  // Generate random transactions for the last 30 days
  for (let i = 0; i < 15; i++) {
    // Random date within last 30 days
    const transactionDate = new Date(
      currentDate.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    );
    
    // Random type
    const type = Math.random() > 0.4 ? 'income' : 'expense';
    
    // Random category based on type
    const typeCategories = sampleCategories.filter(cat => cat.type === type);
    const category = typeCategories[Math.floor(Math.random() * typeCategories.length)];
    
    // Random account
    const account = sampleAccounts[Math.floor(Math.random() * sampleAccounts.length)];
    
    // Random amount (income typically larger than expenses)
    const amount = type === 'income' 
      ? Math.floor(Math.random() * 1000) + 500 
      : Math.floor(Math.random() * 300) + 20;
    
    // Create transaction
    transactions.push({
      id: `trans${i}`,
      type,
      amount,
      date: transactionDate.toISOString().split('T')[0],
      categoryId: category.id,
      accountId: account.id,
      description: `${type === 'income' ? 'Payment for' : 'Payment to'} ${category.name}`,
    });
  }
  
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  // States for financial data
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Calculate total balance
  const totalBalance = accounts.reduce((total, account) => total + account.balance, 0);
  
  // Calculate total income and expenses
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
  
  // Load initial data
  useEffect(() => {
    const loadedTransactions = localStorage.getItem('transactions');
    const loadedAccounts = localStorage.getItem('accounts');
    const loadedCategories = localStorage.getItem('categories');
    
    if (loadedTransactions) {
      setTransactions(JSON.parse(loadedTransactions));
    } else {
      const sampleTransactions = generateSampleTransactions();
      setTransactions(sampleTransactions);
      localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
    }
    
    if (loadedAccounts) {
      setAccounts(JSON.parse(loadedAccounts));
    } else {
      setAccounts(sampleAccounts);
      localStorage.setItem('accounts', JSON.stringify(sampleAccounts));
    }
    
    if (loadedCategories) {
      setCategories(JSON.parse(loadedCategories));
    } else {
      setCategories(sampleCategories);
      localStorage.setItem('categories', JSON.stringify(sampleCategories));
    }
  }, []);
  
  // Save data when it changes
  useEffect(() => {
    if (transactions.length > 0) localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);
  
  useEffect(() => {
    if (accounts.length > 0) localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);
  
  useEffect(() => {
    if (categories.length > 0) localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  
  // Transaction functions
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: Math.random().toString(36).substring(2, 15) };
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update account balance
    const updatedAccounts = accounts.map(account => {
      if (account.id === transaction.accountId) {
        const balanceChange = transaction.type === 'income' ? transaction.amount : -transaction.amount;
        return { ...account, balance: account.balance + balanceChange };
      }
      return account;
    });
    
    setAccounts(updatedAccounts);
    toast.success('Transaction added');
  };
  
  const updateTransaction = (id: string, updatedFields: Partial<Transaction>) => {
    const oldTransaction = transactions.find(t => t.id === id);
    if (!oldTransaction) return;
    
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, ...updatedFields } : t)
    );
    
    // If amount, type, or account changed, update account balances
    if (
      updatedFields.amount !== undefined || 
      updatedFields.type !== undefined || 
      updatedFields.accountId !== undefined
    ) {
      // Revert old transaction effect on account
      let updatedAccounts = accounts.map(account => {
        if (account.id === oldTransaction.accountId) {
          const balanceChange = oldTransaction.type === 'income' ? -oldTransaction.amount : oldTransaction.amount;
          return { ...account, balance: account.balance + balanceChange };
        }
        return account;
      });
      
      // Apply new transaction effect
      const newType = updatedFields.type || oldTransaction.type;
      const newAmount = updatedFields.amount || oldTransaction.amount;
      const newAccountId = updatedFields.accountId || oldTransaction.accountId;
      
      updatedAccounts = updatedAccounts.map(account => {
        if (account.id === newAccountId) {
          const balanceChange = newType === 'income' ? newAmount : -newAmount;
          return { ...account, balance: account.balance + balanceChange };
        }
        return account;
      });
      
      setAccounts(updatedAccounts);
    }
    
    toast.success('Transaction updated');
  };
  
  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    setTransactions(prev => prev.filter(t => t.id !== id));
    
    // Update account balance
    const updatedAccounts = accounts.map(account => {
      if (account.id === transaction.accountId) {
        const balanceChange = transaction.type === 'income' ? -transaction.amount : transaction.amount;
        return { ...account, balance: account.balance + balanceChange };
      }
      return account;
    });
    
    setAccounts(updatedAccounts);
    toast.success('Transaction deleted');
  };
  
  // Account functions
  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount = { ...account, id: Math.random().toString(36).substring(2, 15) };
    setAccounts(prev => [...prev, newAccount]);
    toast.success('Account added');
  };
  
  const updateAccount = (id: string, updatedFields: Partial<Account>) => {
    setAccounts(prev => 
      prev.map(a => a.id === id ? { ...a, ...updatedFields } : a)
    );
    toast.success('Account updated');
  };
  
  const deleteAccount = (id: string) => {
    // Check if there are transactions using this account
    const hasTransactions = transactions.some(t => t.accountId === id);
    if (hasTransactions) {
      toast.error('Cannot delete account with transactions');
      return;
    }
    
    setAccounts(prev => prev.filter(a => a.id !== id));
    toast.success('Account deleted');
  };
  
  // Category functions
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Math.random().toString(36).substring(2, 15) };
    setCategories(prev => [...prev, newCategory]);
    toast.success('Category added');
  };
  
  const updateCategory = (id: string, updatedFields: Partial<Category>) => {
    setCategories(prev => 
      prev.map(c => c.id === id ? { ...c, ...updatedFields } : c)
    );
    toast.success('Category updated');
  };
  
  const deleteCategory = (id: string) => {
    // Check if there are transactions using this category
    const hasTransactions = transactions.some(t => t.categoryId === id);
    if (hasTransactions) {
      toast.error('Cannot delete category with transactions');
      return;
    }
    
    setCategories(prev => prev.filter(c => c.id !== id));
    toast.success('Category deleted');
  };
  
  return (
    <FinanceContext.Provider value={{
      transactions,
      accounts,
      categories,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      addAccount,
      updateAccount,
      deleteAccount,
      addCategory,
      updateCategory,
      deleteCategory,
      totalBalance,
      totalIncome,
      totalExpense
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
