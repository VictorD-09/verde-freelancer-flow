
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinance } from '@/context/FinanceContext';
import { useLanguage } from '@/context/LanguageContext';
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
import { TrendingUp, TrendingDown, Plus, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

const CategoryList = () => {
  const navigate = useNavigate();
  const { categories, deleteCategory, transactions } = useFinance();
  const { t } = useLanguage();
  
  // Check if category has transactions
  const hasTransactions = (categoryId: string) => {
    return transactions.some(transaction => transaction.categoryId === categoryId);
  };
  
  // Handle category delete
  const handleDelete = (id: string) => {
    if (hasTransactions(id)) {
      toast.error(t('cannot-delete-category-with-transactions'));
      return;
    }
    
    deleteCategory(id);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">{t('categories')}</h2>
        <Button onClick={() => navigate('/categories/new')}>
          <Plus className="mr-2 h-4 w-4" /> {t('add-category')}
        </Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          {categories.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('category-name')}</TableHead>
                  <TableHead>{t('category-type')}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {category.type === 'income' ? (
                          <>
                            <TrendingUp className="mr-2 h-4 w-4 text-verde-600" />
                            <span className="text-verde-600">{t('income')}</span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="mr-2 h-4 w-4 text-red-500" />
                            <span className="text-red-500">{t('expenses')}</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/categories/edit/${category.id}`)}>
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
                                <AlertDialogTitle>{t('delete-category')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {hasTransactions(category.id)
                                    ? t('cannot-delete-category-with-transactions')
                                    : t('delete-category-confirm')}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(category.id)}
                                  disabled={hasTransactions(category.id)}
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
              <p className="text-muted-foreground">{t('no-categories')}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => navigate('/categories/new')}
              >
                <Plus className="mr-2 h-4 w-4" /> {t('add-category')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryList;
