
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '@/context/FinanceContext';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { formatCurrency } from '@/context/SettingsContext';
import { Button } from '@/components/ui/button';
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

const AccountList = () => {
  const navigate = useNavigate();
  const { accounts, deleteAccount, transactions } = useFinance();
  const { t } = useLanguage();
  const { settings } = useSettings();
  
  // Check if account has transactions
  const hasTransactions = (accountId: string) => {
    return transactions.some(transaction => transaction.accountId === accountId);
  };
  
  // Handle account delete
  const handleDelete = (id: string) => {
    if (hasTransactions(id)) {
      toast.error(t('cannot-delete-account-with-transactions'));
      return;
    }
    
    deleteAccount(id);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{t('accounts')}</h2>
        <Button onClick={() => navigate('/accounts/new')}>
          <Plus className="mr-2 h-4 w-4" /> {t('add-account')}
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {accounts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('account-name')}</TableHead>
                  <TableHead>{t('account-type')}</TableHead>
                  <TableHead className="text-right">{t('balance')}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.name}</TableCell>
                    <TableCell>{account.type}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(account.balance, settings.currency)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/accounts/edit/${account.id}`)}>
                            {t('edit')}
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                {t('delete')}
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t('delete-account')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {hasTransactions(account.id)
                                    ? t('cannot-delete-account-with-transactions')
                                    : t('delete-account-confirm')}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(account.id)}
                                  disabled={hasTransactions(account.id)}
                                >
                                  {t('delete')}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">{t('no-accounts')}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => navigate('/accounts/new')}
              >
                <Plus className="mr-2 h-4 w-4" /> {t('add-account')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountList;
