import { createFileRoute } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';

import { CategoryItem } from '~/components/app/add/category-item';

export const Route = createFileRoute('/{-$locale}/app/add/$category/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { category } = Route.useRouteContext();
  const navigate = Route.useNavigate();

  return (
    <div className="flex flex-col px-8">
      <div className="flex h-12 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: '/{-$locale}/app/add' })}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Select Subcategory</h1>
        <div className="flex flex-col gap-6">
          {category.subcategories.map((subcategory) => (
            <CategoryItem
              key={subcategory.id}
              category={subcategory}
              onSelect={(subcategory) =>
                navigate({
                  to: '/{-$locale}/app/add/$category/$subcategory',
                  params: { subcategory: subcategory.id },
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
