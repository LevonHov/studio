export type Category = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  budget: number;
  color: string;
};

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  categoryId: string;
};
