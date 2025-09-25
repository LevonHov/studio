import { mockCategories } from '@/lib/data';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { CategoryManager } from '@/components/categories/category-manager';

export default function CategoriesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Categories & Budgets</CardTitle>
        <CardDescription>
          Create custom spending categories and set monthly budgets for each.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CategoryManager initialCategories={mockCategories} />
      </CardContent>
    </Card>
  );
}
