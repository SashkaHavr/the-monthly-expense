import { createFileRoute, redirect } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '~/components/ui/button';

export const Route = createFileRoute(
  '/{-$locale}/app/add/$category/$subcategory/',
)({
  beforeLoad: ({ params, context }) => {
    const subcategory = context.category.subcategories.find(
      (c) => c.id == params.subcategory,
    );
    if (!subcategory) {
      throw redirect({
        to: '/{-$locale}/app/add/$category',
        params: { category: params.category },
      });
    }
    return { subcategory };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  return (
    <div className="flex flex-col px-8">
      <div className="flex h-12 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: '..' })}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Enter Details</h1>
        <div className="flex flex-col gap-6"></div>
      </div>
    </div>
  );
}
