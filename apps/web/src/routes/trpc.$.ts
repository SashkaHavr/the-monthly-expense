import { createServerFileRoute } from '@tanstack/react-start/server';

import { trpcHandler } from '@the-monthly-sum/trpc';

export const ServerRoute = createServerFileRoute('/trpc/$').methods({
  GET: async ({ request }) => {
    return trpcHandler({ request });
  },
  POST: async ({ request }) => {
    return trpcHandler({ request });
  },
});
