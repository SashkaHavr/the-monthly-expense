import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import z from 'zod';

import { subcategorySlugs } from '@the-monthly-expense/utils/categories';
import { expenseSchema } from '@the-monthly-expense/utils/schemas';
import { Button } from '~/components/ui/button';

import { useAppForm } from '~/components/form/use-app-form';
import { useTRPC } from '~/lib/trpc';
import { getCurrentMonth, getMonthISOString } from '~/utils/month';

export const Route = createFileRoute(
  '/{-$locale}/app/add/$category/$subcategory/',
)({
  params: {
    parse: (rawParams) =>
      z
        .object({
          subcategory: z.enum(subcategorySlugs),
        })
        .parse(rawParams),
  },
  beforeLoad: ({ params, context }) => {
    const subcategory = context.category.subcategories.find(
      (c) => c.slug == params.subcategory,
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
  const trpc = useTRPC();
  const navigate = useNavigate();
  const subcategory = Route.useRouteContext({
    select: (s) => s.subcategory,
  });

  const createExpense = useMutation(
    trpc.expense.create.mutationOptions({
      onMutate: async () => {
        await navigate({ to: '/{-$locale}/app' });
      },
      onSuccess: async () => {
        // TODO: Invalidate queries
      },
    }),
  );

  const form = useAppForm({
    defaultValues: {
      amount: 0,
      month: getMonthISOString(getCurrentMonth()),
      description: '',
    },
    defaultState: {
      isValid: false,
    },
    validators: {
      onChange: expenseSchema,
      onMount: expenseSchema,
    },
    onSubmit: async ({ value }) => {
      const date = new Date(value.month);
      await createExpense.mutateAsync({
        ...value,
        month: date.getMonth(),
        year: date.getFullYear(),
        subcategorySlug: subcategory.slug,
      });
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
