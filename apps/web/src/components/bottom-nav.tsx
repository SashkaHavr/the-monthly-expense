import type React from 'react';
import { Link } from '@tanstack/react-router';

import type { NavInfo } from '~/utils/nav-info';
import { cn } from '~/lib/utils';
import { Button } from './ui/button';

export function BottomNav({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      className={cn('flex justify-around gap-2 bg-sidebar', className)}
      {...props}
    />
  );
}

export function BottomNavItem({ label, icon: IconElement, to }: NavInfo) {
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
