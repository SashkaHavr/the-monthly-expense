import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/{-$locale}/app/chat')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/app/chat"!</div>;
}
