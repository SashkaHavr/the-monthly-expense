import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import { categories } from '~/utils/categories';

export const Route = createFileRoute('/{-$locale}/app/add/$category')({
  beforeLoad: ({ params }) => {
    const category = categories.find((c) => c.id == params.category);
    if (!category) {
      console.log('Category not found:', params.category);
      throw redirect({
        to: '/{-$locale}/app/add',
      });
    }
    return { category };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
