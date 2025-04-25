
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Translation {
  [key: string]: string;
}

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  availableLanguages: { code: string; name: string }[];
}

const englishTranslations: Translation = {
  'dashboard': 'Dashboard',
  'transactions': 'Transactions',
  'accounts': 'Accounts',
  'categories': 'Categories',
  'settings': 'Settings',
  'reports': 'Reports',
  'subscription': 'Subscription',
  'welcome-back': 'Welcome back',
  'total-balance': 'Total Balance',
  'income': 'Income',
  'expenses': 'Expenses',
  'recent-transactions': 'Recent Transactions',
  'income-by-category': 'Income by Category',
  'expenses-by-category': 'Expenses by Category',
  'no-transactions': 'No transactions found',
  'no-income': 'No income recorded',
  'no-expenses': 'No expenses recorded',
  'total': 'Total',
  'view-all': 'View All',
  'add-new': 'Add New',
  'save': 'Save',
  'cancel': 'Cancel',
  'delete': 'Delete',
  'edit': 'Edit',
  'name': 'Name',
  'type': 'Type',
  'amount': 'Amount',
  'date': 'Date',
  'description': 'Description',
  'category': 'Category',
  'account': 'Account',
  'balance': 'Balance',
  'sign-in': 'Sign In',
  'sign-up': 'Sign Up',
  'email': 'Email',
  'password': 'Password',
  'confirm-password': 'Confirm Password',
  'remember-me': 'Remember me',
  'forgot-password': 'Forgot password?',
  'dont-have-account': "Don't have an account?",
  'already-have-account': 'Already have an account?',
  'sign-in-to-continue': 'Sign in to continue to Verde',
  'logout': 'Logout',
  'profile': 'Profile',
  'language': 'Language',
  'currency': 'Currency',
  'theme': 'Theme',
  'light': 'Light',
  'dark': 'Dark',
  'system': 'System',
  'date-format': 'Date Format',
  'notifications': 'Notifications',
  'enable-notifications': 'Enable Notifications',
  'save-changes': 'Save Changes',
  'profile-updated': 'Profile updated successfully',
  'settings-updated': 'Settings updated successfully',
  'delete-confirmation': 'Are you sure you want to delete this item?',
  'delete-cannot-undo': 'This action cannot be undone.',
  'confirm-delete': 'Yes, delete',
  'account-created': 'Account created successfully',
  'account-updated': 'Account updated successfully',
  'account-deleted': 'Account deleted successfully',
  'category-created': 'Category created successfully',
  'category-updated': 'Category updated successfully',
  'category-deleted': 'Category deleted successfully',
  'transaction-created': 'Transaction created successfully',
  'transaction-updated': 'Transaction updated successfully',
  'transaction-deleted': 'Transaction deleted successfully',
  'required-field': 'This field is required',
  'invalid-email': 'Invalid email address',
  'passwords-dont-match': 'Passwords do not match',
  'min-password-length': 'Password must be at least 6 characters long',
  'no-data': 'No data available',
  'loading': 'Loading...',
  'error-occurred': 'An error occurred',
  'try-again': 'Try again',
  'expense-tracking': 'Expense Tracking',
  'expense-tracking-description': 'Track all your expenses in one place with categorization and reporting.',
  'income-management': 'Income Management',
  'income-management-description': 'Manage multiple sources of income and get a clear view of your earnings.',
  'financial-reports': 'Financial Reports',
  'financial-reports-description': 'Get detailed reports and analytics to understand your financial patterns.',
  'easy-to-use': 'Easy to Use',
  'easy-to-use-description': 'Simple and intuitive interface designed for freelancers and small businesses.',
  'time-saving': 'Time Saving',
  'time-saving-description': 'Save hours on financial management with automated categorization and reporting.',
  'financial-clarity': 'Financial Clarity',
  'financial-clarity-description': 'Get a clear picture of your financial health with comprehensive dashboards.',
  'multilingual': 'Multilingual',
  'multilingual-description': 'Use the app in your preferred language with multiple language options.',
  'landing-hero-title': 'Simplified Financial Management for Freelancers',
  'landing-hero-description': 'Track expenses, manage incomes, and gain financial clarity with our intuitive finance tool.',
  'get-started-free': 'Get Started For Free',
  'learn-more': 'Learn More',
  'landing-features-title': 'Features Designed for Freelancers',
  'landing-benefits-title': 'Why Choose Verde?',
  'landing-cta-title': 'Ready to Take Control of Your Finances?',
  'landing-cta-description': 'Join thousands of freelancers who have simplified their financial management with Verde.',
  'all-rights-reserved': 'All rights reserved.',
  'privacy-policy': 'Privacy Policy',
  'terms-of-service': 'Terms of Service',
  'contact': 'Contact',
  'monthly': 'Monthly',
  'yearly': 'Yearly',
  'current-plan': 'Current Plan',
  'upgrade': 'Upgrade',
  'downgrade': 'Downgrade',
  'cancel-subscription': 'Cancel Subscription',
  'manage-billing': 'Manage Billing',
  'payment-method': 'Payment Method',
  'billing-history': 'Billing History',
  'next-billing-date': 'Next Billing Date',
  'price': 'Price'
};

const portugueseTranslations: Translation = {
  'dashboard': 'Painel',
  'transactions': 'Transações',
  'accounts': 'Contas',
  'categories': 'Categorias',
  'settings': 'Configurações',
  'reports': 'Relatórios',
  'subscription': 'Assinatura',
  'welcome-back': 'Bem-vindo de volta',
  'total-balance': 'Saldo Total',
  'income': 'Receitas',
  'expenses': 'Despesas',
  'recent-transactions': 'Transações Recentes',
  'income-by-category': 'Receitas por Categoria',
  'expenses-by-category': 'Despesas por Categoria',
  'no-transactions': 'Nenhuma transação encontrada',
  'no-income': 'Nenhuma receita registrada',
  'no-expenses': 'Nenhuma despesa registrada',
  'total': 'Total',
  'view-all': 'Ver Todos',
  'add-new': 'Adicionar Novo',
  'save': 'Salvar',
  'cancel': 'Cancelar',
  'delete': 'Excluir',
  'edit': 'Editar',
  'name': 'Nome',
  'type': 'Tipo',
  'amount': 'Valor',
  'date': 'Data',
  'description': 'Descrição',
  'category': 'Categoria',
  'account': 'Conta',
  'balance': 'Saldo',
  'sign-in': 'Entrar',
  'sign-up': 'Cadastrar',
  'email': 'Email',
  'password': 'Senha',
  'confirm-password': 'Confirmar Senha',
  'remember-me': 'Lembrar de mim',
  'forgot-password': 'Esqueceu a senha?',
  'dont-have-account': 'Não tem uma conta?',
  'already-have-account': 'Já tem uma conta?',
  'sign-in-to-continue': 'Entre para continuar no Verde',
  'logout': 'Sair',
  'profile': 'Perfil',
  'language': 'Idioma',
  'currency': 'Moeda',
  'theme': 'Tema',
  'light': 'Claro',
  'dark': 'Escuro',
  'system': 'Sistema',
  'date-format': 'Formato de Data',
  'notifications': 'Notificações',
  'enable-notifications': 'Ativar Notificações',
  'save-changes': 'Salvar Alterações',
  'profile-updated': 'Perfil atualizado com sucesso',
  'settings-updated': 'Configurações atualizadas com sucesso',
  'delete-confirmation': 'Tem certeza que deseja excluir este item?',
  'delete-cannot-undo': 'Esta ação não pode ser desfeita.',
  'confirm-delete': 'Sim, excluir',
  'account-created': 'Conta criada com sucesso',
  'account-updated': 'Conta atualizada com sucesso',
  'account-deleted': 'Conta excluída com sucesso',
  'category-created': 'Categoria criada com sucesso',
  'category-updated': 'Categoria atualizada com sucesso',
  'category-deleted': 'Categoria excluída com sucesso',
  'transaction-created': 'Transação criada com sucesso',
  'transaction-updated': 'Transação atualizada com sucesso',
  'transaction-deleted': 'Transação excluída com sucesso',
  'required-field': 'Este campo é obrigatório',
  'invalid-email': 'Endereço de email inválido',
  'passwords-dont-match': 'As senhas não conferem',
  'min-password-length': 'A senha deve ter pelo menos 6 caracteres',
  'no-data': 'Nenhum dado disponível',
  'loading': 'Carregando...',
  'error-occurred': 'Ocorreu um erro',
  'try-again': 'Tentar novamente',
  'expense-tracking': 'Controle de Despesas',
  'expense-tracking-description': 'Acompanhe todas as suas despesas em um só lugar com categorização e relatórios.',
  'income-management': 'Gestão de Receitas',
  'income-management-description': 'Gerencie múltiplas fontes de receita e tenha uma visão clara dos seus ganhos.',
  'financial-reports': 'Relatórios Financeiros',
  'financial-reports-description': 'Obtenha relatórios detalhados e análises para entender seus padrões financeiros.',
  'easy-to-use': 'Fácil de Usar',
  'easy-to-use-description': 'Interface simples e intuitiva projetada para freelancers e pequenas empresas.',
  'time-saving': 'Economia de Tempo',
  'time-saving-description': 'Economize horas na gestão financeira com categorização e relatórios automatizados.',
  'financial-clarity': 'Clareza Financeira',
  'financial-clarity-description': 'Obtenha uma imagem clara da sua saúde financeira com painéis abrangentes.',
  'multilingual': 'Multilíngue',
  'multilingual-description': 'Use o aplicativo no seu idioma preferido com várias opções de idioma.',
  'landing-hero-title': 'Gestão Financeira Simplificada para Freelancers',
  'landing-hero-description': 'Acompanhe despesas, gerencie receitas e ganhe clareza financeira com nossa ferramenta financeira intuitiva.',
  'get-started-free': 'Comece Gratuitamente',
  'learn-more': 'Saiba Mais',
  'landing-features-title': 'Recursos Projetados para Freelancers',
  'landing-benefits-title': 'Por Que Escolher o Verde?',
  'landing-cta-title': 'Pronto para Assumir o Controle de Suas Finanças?',
  'landing-cta-description': 'Junte-se a milhares de freelancers que simplificaram sua gestão financeira com o Verde.',
  'all-rights-reserved': 'Todos os direitos reservados.',
  'privacy-policy': 'Política de Privacidade',
  'terms-of-service': 'Termos de Serviço',
  'contact': 'Contato',
  'monthly': 'Mensal',
  'yearly': 'Anual',
  'current-plan': 'Plano Atual',
  'upgrade': 'Atualizar',
  'downgrade': 'Fazer Downgrade',
  'cancel-subscription': 'Cancelar Assinatura',
  'manage-billing': 'Gerenciar Cobrança',
  'payment-method': 'Método de Pagamento',
  'billing-history': 'Histórico de Cobrança',
  'next-billing-date': 'Próxima Data de Cobrança',
  'price': 'Preço'
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get saved language from localStorage or use browser language
  const getBrowserLanguage = (): string => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'pt' ? 'pt' : 'en';
  };

  const [language, setLanguageState] = useState<string>(() => {
    const savedLang = localStorage.getItem('appLanguage');
    return savedLang || getBrowserLanguage();
  });

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  };

  const t = (key: string): string => {
    if (language === 'pt') {
      return portugueseTranslations[key] || englishTranslations[key] || key;
    }
    return englishTranslations[key] || key;
  };

  // Effect to update document language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
