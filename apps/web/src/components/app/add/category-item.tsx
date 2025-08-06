import { Link } from '@tanstack/react-router';

import { Card } from '~/components/ui/card';

import type { Category } from '~/utils/categories';
import { cn } from '~/lib/utils';

export function CategoryItem({ category }: { category: Category }) {
  return (
    <Link to="/{-$locale}/app/add/$category" params={{ category: category.id }}>
      <Card className="cursor-pointer border-2 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md">
        <div className="flex items-center space-x-4">
          <div className={cn('rounded-lg p-3', category.color)}>
            <category.icon size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-center font-medium">{category.name}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
