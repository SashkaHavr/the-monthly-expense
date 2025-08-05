import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/{-$locale}/app/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/app/dashboard"!</div>;
}
