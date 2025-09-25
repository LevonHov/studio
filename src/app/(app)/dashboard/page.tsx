import { mockCategories, mockExpenses } from '@/lib/data';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { CategoryPieChart } from '@/components/dashboard/category-pie-chart';
import { BudgetBarChart } from '@/components/dashboard/budget-bar-chart';
import { ExpensesTable } from '@/components/expenses/expenses-table';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';

export default function DashboardPage() {
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

  return (
    <div className="grid gap-6">
      <SummaryCards
        totalBudget={totalBudget}
        totalExpenses={totalExpenses}
        remainingBudget={remainingBudget}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Budget vs. Spending</CardTitle>
            <CardDescription>
              A comparison of your budgeted amount versus actual spending per category.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BudgetBarChart data={expensesByCategory} />
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
            <CategoryPieChart data={expensesByCategory.filter((d) => d.spent > 0)} />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpensesTable
            expenses={mockExpenses.slice(0, 5)}
            categories={mockCategories}
            showHeader={false}
          />
        </CardContent>
      </Card>
    </div>
  );
}
