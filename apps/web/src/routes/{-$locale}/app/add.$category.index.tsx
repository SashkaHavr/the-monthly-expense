import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { SubCategoryItem } from '~/components/app/add/subcategory-item';

export const Route = createFileRoute('/{-$locale}/app/add/$category/')({
  component: RouteComponent,
});

function RouteComponent() {
  const category = Route.useRouteContext({ select: (s) => s.category });

  return (
    <div className="flex flex-col px-8">
      <div className="flex h-12 items-center">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/{-$locale}/app/add">
            <ArrowLeftIcon />
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Select Subcategory</h1>
        <div className="flex flex-col gap-6">
          {category.subcategories.map((subcategory) => (
            <SubCategoryItem
              key={subcategory.id}
              subcategory={subcategory}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
