import { betterAuth, BetterAuthError } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { admin, magicLink, organization } from 'better-auth/plugins';

import { db } from '@the-monthly-expense/db';
import { profile as profileTable } from '@the-monthly-expense/db/schema';
import { envAuth } from '@the-monthly-expense/env/auth';

import { permissions } from '#permissions.ts';

export const auth = betterAuth({
  basePath: '/auth',
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db.insert(profileTable).values({
            userId: user.id,
            selectedBudget: null,
          });
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          const profile = await db.query.profile.findFirst({
            where: {
              userId: session.userId,
            },
            with: {
              budget: true,
            },
          });

          if (!profile?.budget) {
            return;
          }

          return {
            data: {
              ...session,
              activeOrganizationId: profile.budget.organizationId,
            },
          };
        },
      },
    },
  },
  rateLimit: {
    customRules: {
      '/sign-in/magic-link': {
        window: 60,
        max: 1,
      },
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: ({ url, email }, request) => {
        if (!request) {
          throw new BetterAuthError('sendMagicLink: Request is not defined');
        }

        if (envAuth.AUTH_DEV_MAGIC_LINK && /^\S+@example\.com$/.test(email)) {
          console.log(`${email} - ${url}`);
          return;
        }
      },
    }),
    admin({
      ...permissions,
    }),
    organization(),
  ],
  advanced: {
    database: {
      generateId: false,
    },
  },
});
