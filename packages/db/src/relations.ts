import { defineRelations } from 'drizzle-orm';

import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  expense: {
    budget: r.one.budget({
      from: r.expense.budgetId,
      to: r.budget.id,
      optional: false,
    }),
    subcategory: r.one.expenseSubcategory({
      from: r.expense.subcategoryId,
      to: r.expenseSubcategory.id,
      optional: false,
    }),
  },
  expenseSubcategory: {
    category: r.one.expenseCategory({
      from: r.expenseSubcategory.categoryId,
      to: r.expenseCategory.id,
      optional: false,
    }),
  },
  expenseCategory: {
    subcategories: r.many.expenseSubcategory(),
  },
  user: {
    profile: r.one.profile({
      from: r.user.id,
      to: r.profile.userId,
      optional: false,
    }),
  },
  organization: {
    budget: r.one.budget({
      from: r.organization.id,
      to: r.budget.organizationId,
      optional: false,
    }),
  },
  profile: {
    budget: r.one.budget({
      from: r.profile.selectedBudget,
      to: r.budget.id,
    }),
  },
  budget: {
    expenses: r.many.expense(),
  },
}));
