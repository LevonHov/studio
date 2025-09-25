'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ChartData = {
  name: string;
  budget: number;
  spent: number;
};

const chartConfig = {
  budget: {
    label: 'Budget',
    color: 'hsl(var(--muted))',
  },
  spent: {
    label: 'Spent',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function BudgetBarChart({ data }: { data: ChartData[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="budget" fill="var(--color-budget)" radius={4} />
        <Bar dataKey="spent" fill="var(--color-spent)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
