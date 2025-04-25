
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  Tags,
  Settings, 
  BarChart,
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar as UISidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

import Logo from '../shared/Logo';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(!isMobile);

  const menuItems = [
    {
      title: t('dashboard'),
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      title: t('transactions'),
      icon: ArrowLeftRight,
      path: '/transactions',
    },
    {
      title: t('accounts'),
      icon: Wallet,
      path: '/accounts',
    },
    {
      title: t('categories'),
      icon: Tags,
      path: '/categories',
    },
    {
      title: t('reports'),
      icon: BarChart,
      path: '/reports',
    },
    {
      title: t('subscription'),
      icon: CreditCard,
      path: '/subscription',
    },
    {
      title: t('settings'),
      icon: Settings,
      path: '/settings',
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="h-screen">
      <SidebarProvider defaultOpen={isOpen} onOpenChange={setIsOpen}>
        <div className="min-h-screen flex w-full">
          <UISidebar className={cn(
            "h-screen border-r bg-white transition-all duration-300 ease-in-out",
            isOpen ? "w-64" : "w-0 md:w-16"
          )}>
            <div className="flex h-16 items-center justify-between px-4">
              {isOpen ? (
                <>
                  <Logo />
                  {isMobile && (
                    <button onClick={toggleSidebar}>
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full flex justify-center">
                  <Link to="/dashboard">
                    <Logo small />
                  </Link>
                </div>
              )}
            </div>
            <SidebarContent className="no-scrollbar">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild>
                          <Link 
                            to={item.path}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                              location.pathname === item.path ? 
                                "bg-accent text-accent-foreground" : 
                                "hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <item.icon className="h-5 w-5" />
                            {isOpen && <span>{item.title}</span>}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </UISidebar>

          {isMobile && !isOpen && (
            <button 
              onClick={toggleSidebar}
              className="fixed bottom-4 left-4 z-50 p-2 bg-primary text-white rounded-full shadow-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Sidebar;
