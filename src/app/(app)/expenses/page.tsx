'use client';

import { useState } from 'react';
import { ExpensesTable } from '@/components/expenses/expenses-table';
import { mockExpenses, mockCategories } from '@/lib/data';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { ExpenseForm } from '@/components/expenses/expense-form';
import { Expense } from '@/lib/types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);

  const handleExpenseAdded = (newExpense: Expense) => {
    setExpenses(prev => [newExpense, ...prev]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            View and manage all your logged expenses.
          </CardDescription>
        </div>
        <ExpenseForm 
          categories={mockCategories} 
          onExpenseAdded={handleExpenseAdded}
        />
      </CardHeader>
      <CardContent>
        <ExpensesTable expenses={expenses} categories={mockCategories} />
      </CardContent>
    </Card>
  );
}
