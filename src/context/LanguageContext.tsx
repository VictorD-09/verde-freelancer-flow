
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
    'general-settings': 'General Settings',
    'date-format': 'Date Format',
    'notification-description': 'Receive notifications about your finances',
    'upgrade-message': 'Upgrade to access premium features',
    'to-upgrade': 'To upgrade your account',
    'connect-stripe': 'Connect your Stripe account',
    
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
    'all-rights-reserved': 'All rights reserved',
    'privacy-policy': 'Privacy Policy',
    'terms-of-service': 'Terms of Service',
    'contact': 'Contact',
    
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
    
    // Landing page
    'landing-hero-title': 'Take control of your finances with Verde',
    'landing-hero-description': 'The financial management tool designed specifically for freelancers. Track your income, expenses, and get insights to grow your business.',
    'get-started-free': 'Get Started for Free',
    'learn-more': 'Learn More',
    'landing-features-title': 'Features designed for freelancers',
    'expense-tracking': 'Expense Tracking',
    'expense-tracking-description': 'Easily track and categorize your business expenses to stay organized and maximize tax deductions.',
    'income-management': 'Income Management',
    'income-management-description': 'Monitor your revenue streams and keep track of all your freelance income in one place.',
    'financial-reports': 'Financial Reports',
    'financial-reports-description': 'Get detailed reports and visualizations to understand your financial health and make better decisions.',
    'landing-benefits-title': 'Why choose Verde?',
    'easy-to-use': 'Easy to Use',
    'easy-to-use-description': 'Intuitive interface designed for freelancers, not accountants.',
    'time-saving': 'Time Saving',
    'time-saving-description': 'Spend less time on bookkeeping and more time on your business.',
    'financial-clarity': 'Financial Clarity',
    'financial-clarity-description': 'Understand your financial health at a glance with clear dashboards.',
    'multilingual': 'Multilingual',
    'multilingual-description': 'Available in multiple languages including English and Portuguese.',
    'landing-cta-title': 'Ready to take control of your finances?',
    'landing-cta-description': 'Join thousands of freelancers who are already managing their finances more effectively with Verde.'
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
    'general-settings': 'Configurações Gerais',
    'date-format': 'Formato de Data',
    'notification-description': 'Receber notificações sobre suas finanças',
    'upgrade-message': 'Faça upgrade para acessar recursos premium',
    'to-upgrade': 'Para atualizar sua conta',
    'connect-stripe': 'Conecte sua conta Stripe',
    
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
    'all-rights-reserved': 'Todos os direitos reservados',
    'privacy-policy': 'Política de Privacidade',
    'terms-of-service': 'Termos de Serviço',
    'contact': 'Contato',
    
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
    
    // Landing page
    'landing-hero-title': 'Assuma o controle de suas finanças com Verde',
    'landing-hero-description': 'A ferramenta de gestão financeira projetada especificamente para freelancers. Acompanhe suas receitas, despesas e obtenha insights para fazer seu negócio crescer.',
    'get-started-free': 'Comece Gratuitamente',
    'learn-more': 'Saiba Mais',
    'landing-features-title': 'Recursos projetados para freelancers',
    'expense-tracking': 'Controle de Despesas',
    'expense-tracking-description': 'Rastreie e categorize facilmente suas despesas comerciais para se manter organizado e maximizar as deduções fiscais.',
    'income-management': 'Gestão de Receitas',
    'income-management-description': 'Monitore suas fontes de receita e acompanhe toda a sua renda freelance em um só lugar.',
    'financial-reports': 'Relatórios Financeiros',
    'financial-reports-description': 'Obtenha relatórios detalhados e visualizações para entender sua saúde financeira e tomar melhores decisões.',
    'landing-benefits-title': 'Por que escolher o Verde?',
    'easy-to-use': 'Fácil de Usar',
    'easy-to-use-description': 'Interface intuitiva projetada para freelancers, não para contadores.',
    'time-saving': 'Economia de Tempo',
    'time-saving-description': 'Gaste menos tempo com contabilidade e mais tempo em seu negócio.',
    'financial-clarity': 'Clareza Financeira',
    'financial-clarity-description': 'Entenda sua saúde financeira de relance com painéis claros.',
    'multilingual': 'Multilíngue',
    'multilingual-description': 'Disponível em vários idiomas, incluindo inglês e português.',
    'landing-cta-title': 'Pronto para assumir o controle de suas finanças?',
    'landing-cta-description': 'Junte-se a milhares de freelancers que já estão gerenciando suas finanças com mais eficiência com o Verde.'
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
