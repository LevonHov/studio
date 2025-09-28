'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
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

export function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingBudgets, setEditingBudgets] = useState<Record<string, number>>({});

  const handleBudgetChange = (categoryId: string, newBudget: number) => {
    setEditingBudgets(prev => ({
      ...prev,
      [categoryId]: newBudget
    }));
  };

  const saveBudgetChange = (categoryId: string) => {
    const newBudget = editingBudgets[categoryId];
    if (newBudget !== undefined && newBudget >= 0) {
      setCategories(prev => 
        prev.map(cat => 
          cat.id === categoryId 
            ? { ...cat, budget: newBudget }
            : cat
        )
      );
      
      const category = categories.find(cat => cat.id === categoryId);
      toast({
        title: 'Budget Updated',
        description: `Budget for ${category?.name} updated to $${newBudget.toFixed(2)}`,
      });
      
      // Remove from editing state
      setEditingBudgets(prev => {
        const { [categoryId]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const addCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a category name.',
        variant: 'destructive',
      });
      return;
    }

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCategoryName.trim(),
      icon: ShoppingCart, // Default icon
      budget: 0,
      color: 'hsl(var(--chart-1))', // Default color
    };

    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    
    toast({
      title: 'Category Added',
      description: `${newCategory.name} has been added successfully.`,
    });
  };

  const deleteCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    
    toast({
      title: 'Category Deleted',
      description: `${category?.name} has been deleted.`,
    });
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <category.icon
                className="h-6 w-6"
                style={{ color: category.color }}
              />
              <span className="font-medium flex-1">{category.name}</span>
            </div>
            <div className="flex items-center gap-2 w-1/3">
              <span className="text-muted-foreground">$</span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={editingBudgets[category.id] ?? category.budget}
                onChange={(e) => handleBudgetChange(category.id, parseFloat(e.target.value) || 0)}
                onBlur={() => saveBudgetChange(category.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    saveBudgetChange(category.id);
                  }
                }}
                className="max-w-[120px]"
                aria-label={`Budget for ${category.name}`}
              />
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <span className="sr-only">Delete {category.name}</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Category</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete the "{category.name}" category? 
                    This action cannot be undone and will affect all associated expenses.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteCategory(category.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      ))}
      <Card className="border-dashed">
        <CardContent className="p-4 flex items-center gap-4">
          <Input 
            placeholder="New Category Name" 
            className="flex-1"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addCategory();
              }
            }}
          />
          <Button onClick={addCategory}>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
