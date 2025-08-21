import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { CategoryItem } from '~/components/app/add/category-item';
import { useTRPC } from '~/lib/trpc';

export const Route = createFileRoute('/{-$locale}/app/add/')({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();

  const categories = useSuspenseQuery(
    trpc.expense.getCategories.queryOptions(),
  );

  return (
    <div className="flex flex-col gap-8 px-8 pt-12">
      <h1 className="text-center text-2xl font-bold">Select Category</h1>
      <div className="flex flex-col gap-6">
        {categories.data.categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
