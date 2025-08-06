import { createFileRoute } from '@tanstack/react-router';
import { LogOutIcon, MonitorIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { useFormatter } from 'use-intl';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import { ThemeToggle } from '~/components/theme-toggle';
import { useSignout } from '~/lib/auth';
import { useLoggedInAuth } from '~/lib/route-context-hooks';

export const Route = createFileRoute('/{-$locale}/app/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useLoggedInAuth();
  const format = useFormatter();

  const signout = useSignout();

  return (
    <div className="flex flex-col gap-6 px-8 pt-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon size="20" className="text-muted-foreground" />
            <h3>Profile</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {user.email}</p>
          <p>Joined: {format.dateTime(user.createdAt)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon size="20" className="text-muted-foreground" />
            <h3>Settings</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <MonitorIcon size="16" className="text-muted-foreground" />
              <h3>Theme</h3>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Data & Actions</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-stretch gap-8">
            <Button
              variant="outline"
              className="w-full justify-start"
              size="lg"
              onClick={() => signout.mutate()}
            >
              <LogOutIcon size="16" className="text-muted-foreground" />
              <p>Logout</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
