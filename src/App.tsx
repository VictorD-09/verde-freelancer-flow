
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";
import { SettingsProvider } from "./context/SettingsContext";

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
                  <Route path="/" element={<SignIn />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/transactions/new" element={<TransactionForm />} />
                  <Route path="/transactions/edit/:id" element={<TransactionForm />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/accounts/new" element={<AccountForm />} />
                  <Route path="/accounts/edit/:id" element={<AccountForm />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/new" element={<CategoryForm />} />
                  <Route path="/categories/edit/:id" element={<CategoryForm />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/subscription" element={<Subscription />} />
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
