import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/{-$locale}/app/add')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Hello "/-$locale/app/add"!</p>
    </div>
  );
}
