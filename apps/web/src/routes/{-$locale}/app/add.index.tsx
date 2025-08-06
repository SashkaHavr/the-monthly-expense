import { createFileRoute } from '@tanstack/react-router';

import { CategoryItem } from '~/components/app/add/category-item';
import { categories } from '~/utils/categories';

export const Route = createFileRoute('/{-$locale}/app/add/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-8 px-8 pt-12">
      <h1 className="text-center text-2xl font-bold">Select Category</h1>
      <div className="flex flex-col gap-6">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
