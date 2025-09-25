import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { BudgetAdvisorForm } from '@/components/ai/budget-advisor-form';

export default function AiAdvisorPage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI-Powered Budget Recommendations</CardTitle>
        <CardDescription>
          Describe your financial situation, income, recurring expenses, and
          goals. Our AI will generate a personalized budget plan to help you
          succeed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BudgetAdvisorForm />
      </CardContent>
    </Card>
  );
}
