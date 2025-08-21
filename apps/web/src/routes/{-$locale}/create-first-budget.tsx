import { useMutation } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { useAppForm } from '~/components/form/use-app-form';
import { useResetAuth } from '~/lib/auth';
import { useTRPC } from '~/lib/trpc';

export const Route = createFileRoute('/{-$locale}/create-first-budget')({
  beforeLoad: ({ context }) => {
    if (!context.auth.loggedIn || context.auth.session.activeOrganizationId) {
      throw redirect({ to: '/{-$locale}' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const resetAuth = useResetAuth();

  const createBudget = useMutation(
    trpc.budget.createBudget.mutationOptions({
      onSuccess: async () => {
        await resetAuth();
      },
    }),
  );

  const form = useAppForm({
    defaultValues: {
      currency: 'EUR',
    },
    onSubmit: async ({ value }) => {
      await createBudget.mutateAsync(value);
    },
  });

  return (
    <div className="mx-auto flex max-w-100 flex-col gap-4 pt-20">
      <h1 className="text-2xl font-bold">Choose your currency:</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name="currency">
          {(field) => <field.FormCurrencySelect />}
        </form.AppField>
        <form.AppForm>
          <form.FormSubmitButton label="Create budget" />
        </form.AppForm>
      </form>
    </div>
  );
}
