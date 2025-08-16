// import { useState } from 'react';
import { revalidateLogic } from '@tanstack/react-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useFormatter } from 'use-intl';
import z from 'zod';

import { Button } from '~/components/ui/button';
import { SelectItem } from '~/components/ui/select';

import { useAppForm } from '~/components/form/use-app-form';

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
  const format = useFormatter();

  const twelvePastMonths = Array.from({ length: 12 }, (_, i) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    now.setDate(1);
    now.setMonth(now.getMonth() - i);
    return {
      timestamp: now.getTime().toString(),
      formattedStr: format.dateTime(now, 'monthYear'),
    };
  });

  const dataForm = useAppForm({
    defaultValues: {
      amount: 0,
      month: twelvePastMonths[0]?.timestamp ?? '',
      description: '',
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: z.object({
        amount: z.number().gt(0),
        month: z.string(),
        description: z.string(),
      }),
      onSubmit: ({ value }) => {
        console.dir(value, { depth: null });
      },
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
            void dataForm.handleSubmit();
          }}
        >
          <dataForm.AppField name="amount">
            {(field) => <field.FormMoneyInput className="self-center" />}
          </dataForm.AppField>
          <dataForm.AppField name="month">
            {(field) => (
              <field.FormSelect
                valueDisplay={(value) =>
                  twelvePastMonths.find((m) => m.timestamp === value)
                    ?.formattedStr
                }
              >
                {twelvePastMonths.map((month) => (
                  <SelectItem key={month.timestamp} value={month.timestamp}>
                    {month.formattedStr}
                  </SelectItem>
                ))}
              </field.FormSelect>
            )}
          </dataForm.AppField>
          <dataForm.AppField name="description">
            {(field) => <field.FormTextarea placeholder="Description" />}
          </dataForm.AppField>
          <dataForm.AppForm>
            <dataForm.FormSubmitButton label="Add" />
          </dataForm.AppForm>
        </form>
      </div>
    </div>
  );
}
