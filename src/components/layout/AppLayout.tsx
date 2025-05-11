
import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface AppLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const AppLayout = ({ children, requireAuth = true }: AppLayoutProps) => {
  const { user, loading } = useAuth();

  // If auth is required and user isn't authenticated, redirect to signin
  if (requireAuth && !loading && !user) {
    return <Navigate to="/signin" replace />;
  }
  
  // If auth is NOT required and user IS authenticated, redirect to dashboard
  if (!requireAuth && !loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Only render sidebar when authenticated */}
      {user && (
        <div className="flex">
          <Sidebar />
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {user && <TopBar />}
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
