import { Link } from '@tanstack/react-router';

import type { TRPCOutput } from '@the-monthly-sum/trpc';
import { Card } from '~/components/ui/card';

import { cn } from '~/lib/utils';
import { categoryInfo } from '~/utils/categories';

export function CategoryItem({
  category,
}: {
  category: TRPCOutput['expense']['getCategories']['categories'][number];
}) {
  const info = categoryInfo[category.slug];

  return (
    <Link
      to="/{-$locale}/app/add/$category"
      params={{ category: category.slug }}
    >
      <Card className="cursor-pointer border-2 p-4 transition-all duration-200 hover:border-primary/20 hover:shadow-md">
        <div className="flex items-center space-x-4">
          <div className={cn('rounded-lg p-3', info.color)}>
            {<info.icon size={24} className="text-white" />}
          </div>
          <div>
            <h3 className="text-center font-medium">{info.name}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
