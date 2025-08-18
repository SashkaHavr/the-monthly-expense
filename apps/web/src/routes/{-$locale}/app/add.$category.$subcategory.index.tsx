import { createFileRoute, redirect } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import z from 'zod';

import { Button } from '~/components/ui/button';

import { useAppForm } from '~/components/form/use-app-form';
import { getCurrentMonth } from '~/utils/month';

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

const formSchema = z.object({
  amount: z.int().positive(),
  month: z.string(),
  description: z.string(),
});

function RouteComponent() {
  const currentMonthTimestamp = getCurrentMonth().getTime().toString();

  const form = useAppForm({
    defaultValues: {
      amount: 0,
      month: currentMonthTimestamp,
      description: '',
    },
    defaultState: {
      isValid: false,
    },
    validators: {
      onChange: formSchema,
      onMount: formSchema,
    },
    onSubmit: ({ value }) => {
      console.dir(value, { depth: null });
    },
  });

  return (
    <div className="flex flex-col px-8">
      <div className="flex h-12 items-center">
        <Button variant="ghost" size="icon" asChild>
          <Route.Link to="/{-$locale}/app/add/$category">
            <ArrowLeftIcon />
          </Route.Link>
        </Button>
      </div>
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-2xl font-bold">Enter Details</h1>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.AppField name="amount">
            {(field) => <field.FormMoneyInput className="self-center" />}
          </form.AppField>
          <form.AppField name="month">
            {(field) => <field.FormMonthSelect />}
          </form.AppField>
          <form.AppField name="description">
            {(field) => <field.FormTextarea placeholder="Description" />}
          </form.AppField>
          <form.AppForm>
            <form.FormSubmitButton label="Add" defaultInvalid />
          </form.AppForm>
        </form>
      </div>
    </div>
  );
}
