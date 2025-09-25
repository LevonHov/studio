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

export default function ExpensesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>
            View and manage all your logged expenses.
          </CardDescription>
        </div>
        <ExpenseForm categories={mockCategories} />
      </CardHeader>
      <CardContent>
        <ExpensesTable expenses={mockExpenses} categories={mockCategories} />
      </CardContent>
    </Card>
  );
}
