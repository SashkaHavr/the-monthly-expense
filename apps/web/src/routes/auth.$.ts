import { createServerFileRoute } from '@tanstack/react-start/server';

import { auth } from '@the-monthly-sum/auth';

export const ServerRoute = createServerFileRoute('/auth/$').methods({
  GET: async ({ request }) => {
    return auth.handler(request);
  },
  POST: async ({ request }) => {
    return auth.handler(request);
  },
});
