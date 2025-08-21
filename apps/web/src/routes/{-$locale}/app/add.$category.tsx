import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import z from 'zod';

import { categorySlugs } from '@the-monthly-sum/utils/categories';

export const Route = createFileRoute('/{-$locale}/app/add/$category')({
  params: {
    parse: (rawParams) =>
      z
        .object({
          category: z.enum(categorySlugs),
        })
        .parse(rawParams),
  },
  beforeLoad: ({ params, context: { categories } }) => {
    const category = categories.find((c) => c.slug == params.category);
    if (!category) {
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
