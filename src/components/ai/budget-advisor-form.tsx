'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { getBudgetSuggestion, FormState } from '@/lib/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader, Terminal } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const initialState: FormState = {
  message: '',
  isError: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Bot className="mr-2 h-4 w-4" />
          Generate Plan
        </>
      )}
    </Button>
  );
}

export function BudgetAdvisorForm() {
  const [state, formAction] = useActionState(getBudgetSuggestion, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <Textarea
        name="financialSituation"
        placeholder="e.g., I'm a software developer earning $80,000/year. My rent is $1500/month, and I have a $400 car payment. I want to save for a down payment on a house..."
        rows={6}
        required
      />
      <SubmitButton />

      {state.message && !state.budgetPlan && (
        <Alert
          variant={state.isError ? 'destructive' : 'default'}
          className="mt-4"
        >
          <Terminal className="h-4 w-4" />
          <AlertTitle>{state.isError ? 'Error' : 'Info'}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.budgetPlan && (
        <Card className="mt-4 bg-primary/5">
          <CardContent className="p-6">
            <div
              id="ai-budget-plan"
              dangerouslySetInnerHTML={{ __html: state.budgetPlan }}
            />
          </CardContent>
        </Card>
      )}
    </form>
  );
}
