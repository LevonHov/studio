import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PiggyBank, CircleDollarSign, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

type SummaryCardsProps = {
  totalBudget: number;
  totalExpenses: number;
  remainingBudget: number;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function SummaryCards({
  totalBudget,
  totalExpenses,
  remainingBudget,
}: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Budget',
      amount: formatCurrency(totalBudget),
      icon: PiggyBank,
      color: 'text-primary',
    },
    {
      title: 'Total Spending',
      amount: formatCurrency(totalExpenses),
      icon: CircleDollarSign,
      color: 'text-destructive',
    },
    {
      title: 'Remaining',
      amount: formatCurrency(remainingBudget),
      icon: Landmark,
      color:
        remainingBudget >= 0 ? 'text-secondary-foreground' : 'text-destructive',
      background:
        remainingBudget >= 0 ? 'bg-secondary/30' : 'bg-destructive/20',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.title} className={cn('shadow-sm', card.background)}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon
              className={cn('h-4 w-4 text-muted-foreground', card.color)}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.amount}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
