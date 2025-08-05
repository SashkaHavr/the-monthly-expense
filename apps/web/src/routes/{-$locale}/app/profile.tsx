import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/{-$locale}/app/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/app/profile"!</div>;
}
