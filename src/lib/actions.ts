'use server';

import { generateBudgetPlan } from '@/ai/flows/generate-budget-plan';
import { z } from 'zod';
import { marked } from 'marked';

const schema = z.object({
  financialSituation: z.string().min(50, {
    message: 'Please provide more details about your financial situation.',
  }),
});

export type FormState = {
  message: string;
  budgetPlan?: string;
  isError: boolean;
};

export async function getBudgetSuggestion(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    financialSituation: formData.get('financialSituation'),
  });

  if (!validatedFields.success) {
    return {
      message:
        validatedFields.error.flatten().fieldErrors.financialSituation?.[0] ||
        'Invalid input.',
      isError: true,
    };
  }

  try {
    const result = await generateBudgetPlan({
      financialSituation: validatedFields.data.financialSituation,
    });

    const htmlPlan = marked.parse(result.budgetPlan);

    return {
      message: 'Here is your personalized budget plan:',
      budgetPlan: htmlPlan as string,
      isError: false,
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        'An error occurred while generating your budget plan. Please try again.',
      isError: true,
    };
  }
}
