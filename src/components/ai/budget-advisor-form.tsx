'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { getBudgetSuggestion, FormState } from '@/lib/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bot, Loader, Terminal, Settings, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { hasConfiguredApiKey } from '@/lib/ai-client';
import Link from 'next/link';

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
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(hasConfiguredApiKey());
  }, []);

  if (!hasApiKey) {
    return (
      <Alert className="border-amber-200 bg-amber-50">
        <Settings className="h-4 w-4" />
        <AlertTitle>API Key Required</AlertTitle>
        <AlertDescription className="mt-2 space-y-3">
          <p>
            To use the AI Budget Advisor, you need to configure your AI service API key.
            This allows the app to generate personalized budget recommendations for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="default" size="sm">
              <Link href="/settings" className="inline-flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configure API Key
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Get Google AI API Key
              </a>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

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
