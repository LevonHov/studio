'use server';

/**
 * @fileOverview Generates a personalized budget plan based on user input.
 *
 * - generateBudgetPlan - A function that generates a budget plan.
 * - GenerateBudgetPlanInput - The input type for the generateBudgetPlan function.
 * - GenerateBudgetPlanOutput - The return type for the generateBudgetPlan function.
 */

import { createAIClient, getFirstAvailableProvider } from '@/lib/ai-client';
import { z } from 'genkit';

const GenerateBudgetPlanInputSchema = z.object({
  financialSituation: z
    .string()
    .describe(
      'Description of the user\'s current financial situation, goals, and constraints.'
    ),
});
export type GenerateBudgetPlanInput = z.infer<typeof GenerateBudgetPlanInputSchema>;

const GenerateBudgetPlanOutputSchema = z.object({
  budgetPlan: z
    .string()
    .describe(
      'A detailed budget plan including income, expenses by category, and savings goals.'
    ),
});
export type GenerateBudgetPlanOutput = z.infer<typeof GenerateBudgetPlanOutputSchema>;

export async function generateBudgetPlan(
  input: GenerateBudgetPlanInput
): Promise<GenerateBudgetPlanOutput> {
  // Get the first available AI provider
  const provider = getFirstAvailableProvider();
  
  if (!provider) {
    throw new Error('No AI provider configured. Please add your API key in Settings.');
  }

  // Create AI client with user's API key
  const ai = createAIClient(provider);
  
  const prompt = ai.definePrompt({
    name: 'generateBudgetPlanPrompt',
    input: { schema: GenerateBudgetPlanInputSchema },
    output: { schema: GenerateBudgetPlanOutputSchema },
    prompt: `You are a personal finance advisor. Generate a personalized budget plan for the user based on their financial situation, goals, and constraints.

Financial Situation: {{{financialSituation}}}

Please provide a comprehensive budget plan that includes:
1. Analysis of their current financial situation
2. Recommended budget categories with specific amounts
3. Savings goals and strategies
4. Tips for managing expenses
5. Action steps they can take immediately

Format your response in clear sections with headers and bullet points for easy reading.

Budget Plan:`,
  });

  const generateBudgetPlanFlow = ai.defineFlow(
    {
      name: 'generateBudgetPlanFlow',
      inputSchema: GenerateBudgetPlanInputSchema,
      outputSchema: GenerateBudgetPlanOutputSchema,
    },
    async (flowInput) => {
      const { output } = await prompt(flowInput);
      return output!;
    }
  );

  return generateBudgetPlanFlow(input);
}
