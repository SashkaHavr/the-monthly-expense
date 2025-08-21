import { TRPCError } from '@trpc/server';
import z from 'zod';

import { db } from '@the-monthly-sum/db';
import { expense as expenseTable } from '@the-monthly-sum/db/schema';
import { subcategorySlugs } from '@the-monthly-sum/utils/categories';
import { expenseSchema } from '@the-monthly-sum/utils/schemas';

import { activeBudgetProcedure, protectedProcedure, router } from '#init.ts';

export const expenseRouter = router({
  getCategories: protectedProcedure.query(async () => {
    return {
      categories: await db.query.expenseCategory.findMany({
        with: { subcategories: true },
      }),
    };
  }),
  create: activeBudgetProcedure
    .input(
      z.object({
        ...expenseSchema.shape,
        subcategorySlug: z.enum(subcategorySlugs),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const subcategory = await db.query.expenseSubcategory.findFirst({
        where: { slug: input.subcategorySlug },
      });

      if (!subcategory) {
        throw new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: 'Subcategory not found',
        });
      }

      await db.insert(expenseTable).values({
        ...input,
        budgetId: ctx.budgetId,
        subcategoryId: subcategory.id,
      });
    }),
});
