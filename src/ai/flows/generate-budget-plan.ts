'use server';

/**
 * @fileOverview Generates a personalized budget plan based on user input.
 *
 * - generateBudgetPlan - A function that generates a budget plan.
 * - GenerateBudgetPlanInput - The input type for the generateBudgetPlan function.
 * - GenerateBudgetPlanOutput - The return type for the generateBudgetPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  return generateBudgetPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBudgetPlanPrompt',
  input: {schema: GenerateBudgetPlanInputSchema},
  output: {schema: GenerateBudgetPlanOutputSchema},
  prompt: `You are a personal finance advisor. Generate a personalized budget plan for the user based on their financial situation, goals, and constraints.

Financial Situation: {{{financialSituation}}}

Budget Plan:`,
});

const generateBudgetPlanFlow = ai.defineFlow(
  {
    name: 'generateBudgetPlanFlow',
    inputSchema: GenerateBudgetPlanInputSchema,
    outputSchema: GenerateBudgetPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
