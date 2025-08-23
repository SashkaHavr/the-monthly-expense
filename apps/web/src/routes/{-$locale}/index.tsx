import { revalidateLogic } from '@tanstack/react-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';

import { useAppForm } from '~/components/form/use-app-form';
import { authClient } from '~/lib/auth';

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: ({ context }) => {
    if (context.auth.loggedIn) {
      if (context.auth.session.activeOrganizationId) {
        throw redirect({ to: '/{-$locale}/app' });
      } else {
        throw redirect({ to: '/{-$locale}/create-first-budget' });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: { email: 'user@example.com' },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: z.object({ email: z.email() }),
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.magicLink({ email: value.email });
    },
  });

  return (
    <div className="mx-auto flex max-w-100 flex-col gap-4 pt-20">
      <h1 className="text-2xl font-bold">Welcome to The Monthly Expense!</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.AppField name="email">
          {(field) => <field.FormEmailInput />}
        </form.AppField>
        <form.AppForm>
          <form.FormSubmitButton label="Login" />
        </form.AppForm>
      </form>
    </div>
  );
}
