import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { Button } from './ui/button';

export function BottomNav({ children }: { children?: React.ReactNode }) {
  return (
    <nav className="gap-2 bg-sidebar">
      <div className="flex justify-around">{children}</div>
    </nav>
  );
}

export function BottomNavItem({
  label,
  icon: IconElement,
  to,
}: {
  label: string;
  icon: ({ className }: { className?: string }) => React.ReactNode;
  to: LinkProps['to'];
}) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="flex h-16 grow flex-col gap-1 p-4 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground data-[status=active]:hover:bg-primary/90 data-[status=active]:hover:text-primary-foreground"
    >
      <Link to={to}>
        <IconElement className="size-8" />
        <p className="font-bold">{label}</p>
      </Link>
    </Button>
  );
}
