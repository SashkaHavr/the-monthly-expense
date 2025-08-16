import { revalidateLogic } from '@tanstack/react-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';

import { useAppForm } from '~/components/form/use-app-form';
import { authClient } from '~/lib/auth';

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: ({ context }) => {
    if (context.auth.loggedIn) {
      throw redirect({ to: '/{-$locale}/app' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const loginForm = useAppForm({
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
      <h1 className="text-2xl font-bold">Welcome to The Monthly Sum!</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void loginForm.handleSubmit();
        }}
      >
        <loginForm.AppField name="email">
          {(field) => <field.FormEmailInput />}
        </loginForm.AppField>
        <loginForm.AppForm>
          <loginForm.FormSubmitButton label="Login" />
        </loginForm.AppForm>
      </form>
    </div>
  );
}
