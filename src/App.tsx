
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import { SettingsProvider } from "./context/SettingsContext";
import AppLayout from "./components/layout/AppLayout";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TransactionForm from "./pages/TransactionForm";
import Accounts from "./pages/Accounts";
import AccountForm from "./pages/AccountForm";
import Categories from "./pages/Categories";
import CategoryForm from "./pages/CategoryForm";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <FinanceProvider>
          <SettingsProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  } />
                  <Route path="/transactions" element={
                    <AppLayout>
                      <Transactions />
                    </AppLayout>
                  } />
                  <Route path="/transactions/new" element={
                    <AppLayout>
                      <TransactionForm />
                    </AppLayout>
                  } />
                  <Route path="/transactions/edit/:id" element={
                    <AppLayout>
                      <TransactionForm />
                    </AppLayout>
                  } />
                  <Route path="/accounts" element={
                    <AppLayout>
                      <Accounts />
                    </AppLayout>
                  } />
                  <Route path="/accounts/new" element={
                    <AppLayout>
                      <AccountForm />
                    </AppLayout>
                  } />
                  <Route path="/accounts/edit/:id" element={
                    <AppLayout>
                      <AccountForm />
                    </AppLayout>
                  } />
                  <Route path="/categories" element={
                    <AppLayout>
                      <Categories />
                    </AppLayout>
                  } />
                  <Route path="/categories/new" element={
                    <AppLayout>
                      <CategoryForm />
                    </AppLayout>
                  } />
                  <Route path="/categories/edit/:id" element={
                    <AppLayout>
                      <CategoryForm />
                    </AppLayout>
                  } />
                  <Route path="/settings" element={
                    <AppLayout>
                      <Settings />
                    </AppLayout>
                  } />
                  <Route path="/reports" element={
                    <AppLayout>
                      <Reports />
                    </AppLayout>
                  } />
                  <Route path="/subscription" element={
                    <AppLayout>
                      <Subscription />
                    </AppLayout>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </SettingsProvider>
        </FinanceProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
