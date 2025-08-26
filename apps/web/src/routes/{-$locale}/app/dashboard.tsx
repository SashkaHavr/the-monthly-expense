import { createFileRoute } from '@tanstack/react-router';

import { ChooseMonthYearButton } from '~/components/app/dashboard/choose-month-year-button';

export const Route = createFileRoute('/{-$locale}/app/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 px-8 pt-12">
      <ChooseMonthYearButton />
    </div>
  );
}
