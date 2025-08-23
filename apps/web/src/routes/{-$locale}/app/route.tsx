import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import {
  MessageCircleIcon,
  PieChartIcon,
  PlusIcon,
  UserIcon,
} from 'lucide-react';

import { ScrollArea } from '~/components/ui/scroll-area';
import { Separator } from '~/components/ui/separator';

import type { NavInfo } from '~/utils/nav-info';
import { BottomNav, BottomNavItem } from '~/components/bottom-nav';
import { Sidebar, SidebarItem } from '~/components/sidebar';
import { SplashScreeen } from '~/components/splash-screen';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { getCategoriesServerFn } from '~/lib/trpc-server';

export const Route = createFileRoute('/{-$locale}/app')({
  ssr: 'data-only',
  pendingComponent: SplashScreeen,
  pendingMinMs: 100,
  beforeLoad: async ({ context: { queryClient, trpc, auth } }) => {
    if (!auth.loggedIn || !auth.session.activeOrganizationId) {
      throw redirect({ to: '/{-$locale}' });
    }
    const categories = await queryClient.ensureQueryData({
      queryKey: trpc.expense.getCategories.queryKey(),
      queryFn: () => getCategoriesServerFn(),
    });
    return { categories: categories.categories };
  },
  component: RouteComponent,
});

const navigationInformation: NavInfo[] = [
  {
    label: 'Dashboard',
    icon: PieChartIcon,
    to: '/{-$locale}/app/dashboard',
  },
  {
    label: 'Add',
    icon: PlusIcon,
    to: '/{-$locale}/app/add',
  },
  {
    label: 'Chat',
    icon: MessageCircleIcon,
    to: '/{-$locale}/app/chat',
  },
  {
    label: 'Profile',
    icon: UserIcon,
    to: '/{-$locale}/app/profile',
  },
];

function RouteComponent() {
  const sm = useBreakpoint('sm');
  const lg = useBreakpoint('lg');

  return sm ? (
    <div>
      <div className="flex h-screen">
        <Sidebar className="px-4 pt-10">
          {navigationInformation.map((item) => (
            <SidebarItem key={item.label} {...item} expanded={lg} />
          ))}
        </Sidebar>
        <Separator orientation="vertical" />
        <ScrollArea className="max-h-screen grow">
          <div className="flex justify-center">
            <div className="w-[768px]">
              <Outlet />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  ) : (
    <div className="flex h-screen max-h-screen flex-col">
      <ScrollArea className="max-h-[calc(100vh-64px)] grow">
        <Outlet />
      </ScrollArea>
      <BottomNav>
        {navigationInformation.map((item) => (
          <BottomNavItem key={item.label} {...item} />
        ))}
      </BottomNav>
    </div>
  );
}
