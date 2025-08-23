import type React from 'react';
import { Link } from '@tanstack/react-router';

import type { NavInfo } from '~/utils/nav-info';
import { cn } from '~/lib/utils';
import { Button } from './ui/button';

export function Sidebar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <nav
      className={cn('flex flex-col items-stretch gap-2', className)}
      {...props}
    />
  );
}

export function SidebarItem({
  label,
  icon: IconElement,
  to,
  expanded = true,
}: NavInfo & { expanded?: boolean }) {
  return (
    <Button
      asChild
      variant="ghost"
      className="flex justify-start gap-1 px-4 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[status=active]:bg-primary data-[status=active]:text-primary-foreground data-[status=active]:hover:bg-primary/90 data-[status=active]:hover:text-primary-foreground"
    >
      <Link to={to}>
        <IconElement className="size-8" />
        {expanded && <p className="font-bold">{label}</p>}
      </Link>
    </Button>
  );
}
