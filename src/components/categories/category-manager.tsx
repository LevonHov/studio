'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

export function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const [categories, setCategories] = useState(initialCategories);

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Card key={category.id}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <category.icon
                className="h-6 w-6"
                style={{ color: category.color }}
              />
              <span className="font-medium flex-1">{category.name}</span>
            </div>
            <div className="flex items-center gap-2 w-1/3">
              <span className="text-muted-foreground">$</span>
              <Input
                type="number"
                defaultValue={category.budget}
                className="max-w-[120px]"
                aria-label={`Budget for ${category.name}`}
              />
            </div>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Delete {category.name}</span>
            </Button>
          </CardContent>
        </Card>
      ))}
      <Card className="border-dashed">
        <CardContent className="p-4 flex items-center gap-4">
          <Input placeholder="New Category Name" className="flex-1" />
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
