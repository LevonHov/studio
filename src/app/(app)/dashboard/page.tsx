'use client';

import { useMemo } from 'react';
import { mockCategories, mockExpenses } from '@/lib/data';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { CategoryPieChart } from '@/components/dashboard/category-pie-chart';
import { BudgetBarChart } from '@/components/dashboard/budget-bar-chart';
import { ExpensesTable } from '@/components/expenses/expenses-table';
import { ErrorBoundary } from '@/components/error-boundary';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

export default function DashboardPage() {
  const { totalBudget, totalExpenses, remainingBudget, expensesByCategory, recentExpenses } = useMemo(() => {
    const totalBudget = mockCategories.reduce((sum, cat) => sum + cat.budget, 0);
    const totalExpenses = mockExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const remainingBudget = totalBudget - totalExpenses;

    const expensesByCategory = mockCategories.map((category) => {
      const categoryExpenses = mockExpenses
        .filter((expense) => expense.categoryId === category.id)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return {
        name: category.name,
        spent: categoryExpenses,
        budget: category.budget,
        fill: category.color,
      };
    });

    const recentExpenses = mockExpenses
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      totalBudget,
      totalExpenses,
      remainingBudget,
      expensesByCategory,
      recentExpenses,
    };
  }, []);

  return (
    <div className="grid gap-6">
      <ErrorBoundary>
        <SummaryCards
          totalBudget={totalBudget}
          totalExpenses={totalExpenses}
          remainingBudget={remainingBudget}
        />
      </ErrorBoundary>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Budget vs. Spending</CardTitle>
            <CardDescription>
              A comparison of your budgeted amount versus actual spending per category.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ErrorBoundary>
              <BudgetBarChart data={expensesByCategory} />
            </ErrorBoundary>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>
              A breakdown of your spending by category for the current period.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ErrorBoundary>
              <CategoryPieChart data={expensesByCategory.filter((d) => d.spent > 0)} />
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ErrorBoundary>
            <ExpensesTable
              expenses={recentExpenses}
              categories={mockCategories}
              showHeader={false}
            />
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  );
}
