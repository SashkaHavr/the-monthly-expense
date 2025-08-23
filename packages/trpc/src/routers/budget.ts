import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import z from 'zod';

import { auth } from '@the-monthly-expense/auth';
import { db } from '@the-monthly-expense/db';
import {
  budget as budgetTable,
  profile as profileTable,
} from '@the-monthly-expense/db/schema';

import { protectedProcedure, router } from '#init.ts';

export const budgetRouter = router({
  createBudget: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty().optional(),
        currency: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const organizations = await auth.api.listOrganizations({
        headers: ctx.request.headers,
      });
      const name = ctx.userId + '-org-' + organizations.length;
      const organization = await auth.api.createOrganization({
        body: {
          name: name,
          slug: name,
        },
        headers: ctx.request.headers,
      });

      if (!organization) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create organization',
        });
      }

      const budget = (
        await db
          .insert(budgetTable)
          .values({
            organizationId: organization.id,
            currency: input.currency,
          })
          .returning()
      )[0];

      if (!budget) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create budget',
        });
      }

      await db
        .update(profileTable)
        .set({
          selectedBudget: budget.id,
        })
        .where(eq(profileTable.userId, ctx.userId));
    }),
});
