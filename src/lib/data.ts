import { Category, Expense } from '@/lib/types';
import {
  ShoppingCart,
  Bus,
  Clapperboard,
  Home,
  HeartPulse,
  GraduationCap,
} from 'lucide-react';

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Groceries', icon: ShoppingCart, budget: 500, color: 'hsl(var(--chart-1))' },
  { id: 'cat-2', name: 'Transport', icon: Bus, budget: 150, color: 'hsl(var(--chart-2))' },
  { id: 'cat-3', name: 'Entertainment', icon: Clapperboard, budget: 100, color: 'hsl(var(--chart-3))' },
  { id: 'cat-4', name: 'Housing', icon: Home, budget: 1200, color: 'hsl(var(--chart-4))' },
  { id: 'cat-5', name: 'Healthcare', icon: HeartPulse, budget: 80, color: 'hsl(var(--chart-5))' },
  { id: 'cat-6', name: 'Education', icon: GraduationCap, budget: 200, color: 'hsl(var(--chart-1))' },
];

function getRandomDate(daysAgo: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date;
}

export const mockExpenses: Expense[] = [
  { id: 'exp-1', description: 'Weekly Groceries', amount: 75.5, date: getRandomDate(30), categoryId: 'cat-1' },
  { id: 'exp-2', description: 'Monthly Bus Pass', amount: 60.0, date: new Date(), categoryId: 'cat-2' },
  { id: 'exp-3', description: 'Movie Night', amount: 25.0, date: getRandomDate(30), categoryId: 'cat-3' },
  { id: 'exp-4', description: 'Rent Payment', amount: 1200.0, date: new Date(), categoryId: 'cat-4' },
  { id: 'exp-5', description: 'Pharmacy', amount: 30.25, date: getRandomDate(30), categoryId: 'cat-5' },
  { id: 'exp-6', description: 'Online Course', amount: 49.99, date: getRandomDate(30), categoryId: 'cat-6' },
  { id: 'exp-7', description: 'Dinner Out', amount: 55.0, date: getRandomDate(30), categoryId: 'cat-3' },
  { id: 'exp-8', description: 'Gas Bill', amount: 45.0, date: getRandomDate(30), categoryId: 'cat-4' },
  { id: 'exp-9', description: 'Grocery Top-up', amount: 32.1, date: getRandomDate(30), categoryId: 'cat-1' },
  { id: 'exp-10', description: 'Train Ticket', amount: 12.5, date: getRandomDate(30), categoryId: 'cat-2' },
];
