import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import {
  MessageCircleIcon,
  PieChartIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-react';

import { ScrollArea } from '~/components/ui/scroll-area';

import { BottomNav, BottomNavItem } from '~/components/bottom-nav';

export const Route = createFileRoute('/{-$locale}/app')({
  beforeLoad: ({ context }) => {
    if (!context.auth.loggedIn) {
      throw redirect({ to: '/{-$locale}' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen max-h-screen flex-col">
      <ScrollArea className="max-h-[calc(100vh-64px)] grow">
        <Outlet />
      </ScrollArea>
      <BottomNav>
        <BottomNavItem label="Add" icon={PlusIcon} to="/{-$locale}/app/add" />
        <BottomNavItem
          label="Dashboard"
          icon={PieChartIcon}
          to="/{-$locale}/app/dashboard"
        />
        <BottomNavItem
          label="Chat"
          icon={MessageCircleIcon}
          to="/{-$locale}/app/chat"
        />
        <BottomNavItem
          label="Profile"
          icon={UserIcon}
          to="/{-$locale}/app/profile"
        />
      </BottomNav>
    </div>
  );
}
