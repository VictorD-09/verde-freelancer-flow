
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define supported languages
export type Language = 'en' | 'pt';

// Dictionary with translations
export const translations = {
  en: {
    // Auth
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
    'email': 'Email',
    'password': 'Password',
    'confirm-password': 'Confirm Password',
    'full-name': 'Full Name',
    'forgot-password': 'Forgot Password?',
    'sign-out': 'Sign Out',
    'dont-have-account': 'Don\'t have an account?',
    'already-have-account': 'Already have an account?',
    
    // Navigation
    'dashboard': 'Dashboard',
    'transactions': 'Transactions',
    'accounts': 'Accounts',
    'categories': 'Categories',
    'settings': 'Settings',
    'reports': 'Reports',
    
    // Dashboard
    'total-balance': 'Total Balance',
    'income': 'Income',
    'expenses': 'Expenses',
    'recent-transactions': 'Recent Transactions',
    'income-by-category': 'Income by Category',
    'expenses-by-category': 'Expenses by Category',
    'financial-overview': 'Financial Overview',
    'this-month': 'This Month',
    'welcome-back': 'Welcome back',
    
    // Transactions
    'add-transaction': 'Add Transaction',
    'edit-transaction': 'Edit Transaction',
    'delete-transaction': 'Delete Transaction',
    'transaction-type': 'Transaction Type',
    'transaction-date': 'Date',
    'transaction-amount': 'Amount',
    'transaction-category': 'Category',
    'transaction-account': 'Account',
    'transaction-description': 'Description',
    'transaction-added': 'Transaction added successfully',
    'transaction-updated': 'Transaction updated successfully',
    'transaction-deleted': 'Transaction deleted successfully',
    'filter-transactions': 'Filter Transactions',
    'no-transactions': 'No transactions found',
    
    // Accounts
    'add-account': 'Add Account',
    'edit-account': 'Edit Account',
    'delete-account': 'Delete Account',
    'account-name': 'Account Name',
    'account-type': 'Account Type',
    'account-balance': 'Initial Balance',
    'account-added': 'Account added successfully',
    'account-updated': 'Account updated successfully',
    'account-deleted': 'Account deleted successfully',
    'no-accounts': 'No accounts found',
    
    // Categories
    'add-category': 'Add Category',
    'edit-category': 'Edit Category',
    'delete-category': 'Delete Category',
    'category-name': 'Category Name',
    'category-type': 'Category Type',
    'category-added': 'Category added successfully',
    'category-updated': 'Category updated successfully',
    'category-deleted': 'Category deleted successfully',
    'no-categories': 'No categories found',
    
    // Settings
    'profile-settings': 'Profile Settings',
    'notification-settings': 'Notification Settings',
    'language-settings': 'Language Settings',
    'currency': 'Currency',
    'theme': 'Theme',
    'light': 'Light',
    'dark': 'Dark',
    'system': 'System',
    'save': 'Save',
    'cancel': 'Cancel',
    'profile-updated': 'Profile updated successfully',
    'settings-saved': 'Settings saved successfully',
    
    // Misc
    'loading': 'Loading...',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'date': 'Date',
    'amount': 'Amount',
    'description': 'Description',
    'all': 'All',
    'today': 'Today',
    'yesterday': 'Yesterday',
    'this-week': 'This Week',
    'this-month': 'This Month',
    'last-month': 'Last Month',
    'custom-range': 'Custom Range',
    'from': 'From',
    'to': 'To',
    'apply': 'Apply',
    'reset': 'Reset',
    'edit': 'Edit',
    'delete': 'Delete',
    'yes': 'Yes',
    'no': 'No',
    'confirm': 'Confirm',
    
    // Subscription
    'subscription': 'Subscription',
    'current-plan': 'Current Plan',
    'upgrade-plan': 'Upgrade Plan',
    'billing-info': 'Billing Information',
    'payment-method': 'Payment Method',
    'billing-history': 'Billing History',
    'free-plan': 'Free Plan',
    'basic-plan': 'Basic Plan',
    'premium-plan': 'Premium Plan',
    'manage-subscription': 'Manage Subscription',
    'cancel-subscription': 'Cancel Subscription',
    'payment-processed': 'Payment processed successfully',
    'checkout': 'Checkout',
  },
  pt: {
    // Auth
    'sign-in': 'Entrar',
    'sign-up': 'Cadastrar',
    'email': 'Email',
    'password': 'Senha',
    'confirm-password': 'Confirmar Senha',
    'full-name': 'Nome Completo',
    'forgot-password': 'Esqueceu a senha?',
    'sign-out': 'Sair',
    'dont-have-account': 'Não tem uma conta?',
    'already-have-account': 'Já tem uma conta?',
    
    // Navigation
    'dashboard': 'Painel',
    'transactions': 'Transações',
    'accounts': 'Contas',
    'categories': 'Categorias',
    'settings': 'Configurações',
    'reports': 'Relatórios',
    
    // Dashboard
    'total-balance': 'Saldo Total',
    'income': 'Receitas',
    'expenses': 'Despesas',
    'recent-transactions': 'Transações Recentes',
    'income-by-category': 'Receitas por Categoria',
    'expenses-by-category': 'Despesas por Categoria',
    'financial-overview': 'Visão Financeira',
    'this-month': 'Este Mês',
    'welcome-back': 'Bem-vindo de volta',
    
    // Transactions
    'add-transaction': 'Adicionar Transação',
    'edit-transaction': 'Editar Transação',
    'delete-transaction': 'Excluir Transação',
    'transaction-type': 'Tipo de Transação',
    'transaction-date': 'Data',
    'transaction-amount': 'Valor',
    'transaction-category': 'Categoria',
    'transaction-account': 'Conta',
    'transaction-description': 'Descrição',
    'transaction-added': 'Transação adicionada com sucesso',
    'transaction-updated': 'Transação atualizada com sucesso',
    'transaction-deleted': 'Transação excluída com sucesso',
    'filter-transactions': 'Filtrar Transações',
    'no-transactions': 'Nenhuma transação encontrada',
    
    // Accounts
    'add-account': 'Adicionar Conta',
    'edit-account': 'Editar Conta',
    'delete-account': 'Excluir Conta',
    'account-name': 'Nome da Conta',
    'account-type': 'Tipo de Conta',
    'account-balance': 'Saldo Inicial',
    'account-added': 'Conta adicionada com sucesso',
    'account-updated': 'Conta atualizada com sucesso',
    'account-deleted': 'Conta excluída com sucesso',
    'no-accounts': 'Nenhuma conta encontrada',
    
    // Categories
    'add-category': 'Adicionar Categoria',
    'edit-category': 'Editar Categoria',
    'delete-category': 'Excluir Categoria',
    'category-name': 'Nome da Categoria',
    'category-type': 'Tipo de Categoria',
    'category-added': 'Categoria adicionada com sucesso',
    'category-updated': 'Categoria atualizada com sucesso',
    'category-deleted': 'Categoria excluída com sucesso',
    'no-categories': 'Nenhuma categoria encontrada',
    
    // Settings
    'profile-settings': 'Configurações de Perfil',
    'notification-settings': 'Configurações de Notificação',
    'language-settings': 'Configurações de Idioma',
    'currency': 'Moeda',
    'theme': 'Tema',
    'light': 'Claro',
    'dark': 'Escuro',
    'system': 'Sistema',
    'save': 'Salvar',
    'cancel': 'Cancelar',
    'profile-updated': 'Perfil atualizado com sucesso',
    'settings-saved': 'Configurações salvas com sucesso',
    
    // Misc
    'loading': 'Carregando...',
    'search': 'Buscar',
    'filter': 'Filtrar',
    'sort': 'Ordenar',
    'date': 'Data',
    'amount': 'Valor',
    'description': 'Descrição',
    'all': 'Todos',
    'today': 'Hoje',
    'yesterday': 'Ontem',
    'this-week': 'Esta Semana',
    'this-month': 'Este Mês',
    'last-month': 'Mês Passado',
    'custom-range': 'Período Personalizado',
    'from': 'De',
    'to': 'Até',
    'apply': 'Aplicar',
    'reset': 'Resetar',
    'edit': 'Editar',
    'delete': 'Excluir',
    'yes': 'Sim',
    'no': 'Não',
    'confirm': 'Confirmar',
    
    // Subscription
    'subscription': 'Assinatura',
    'current-plan': 'Plano Atual',
    'upgrade-plan': 'Atualizar Plano',
    'billing-info': 'Informações de Cobrança',
    'payment-method': 'Método de Pagamento',
    'billing-history': 'Histórico de Cobrança',
    'free-plan': 'Plano Gratuito',
    'basic-plan': 'Plano Básico',
    'premium-plan': 'Plano Premium',
    'manage-subscription': 'Gerenciar Assinatura',
    'cancel-subscription': 'Cancelar Assinatura',
    'payment-processed': 'Pagamento processado com sucesso',
    'checkout': 'Finalizar Compra',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
