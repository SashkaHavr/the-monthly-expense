import { revalidateLogic, useForm } from '@tanstack/react-form';
import { createFileRoute, redirect } from '@tanstack/react-router';
import z from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

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
  const loginForm = useForm({
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
        <loginForm.Field
          name="email"
          children={(field) => (
            <Input
              placeholder="user@example.com"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <loginForm.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? '...' : 'Login'}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
