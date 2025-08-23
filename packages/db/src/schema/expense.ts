import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import type {
  CategorySlug,
  SubcategorySlug,
} from '@the-monthly-expense/utils/categories';

import { budget } from './budget';

export const expenseCategory = pgTable('expense_category', {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().notNull().defaultNow(),
  slug: text().notNull().unique().$type<CategorySlug>(),
});

export const expenseSubcategory = pgTable(
  'expense_subcategory',
  {
    id: uuid().defaultRandom().primaryKey(),
    createdAt: timestamp().notNull().defaultNow(),
    slug: text().notNull().unique().$type<SubcategorySlug>(),
    categoryId: uuid()
      .notNull()
      .references(() => expenseCategory.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('idx_expense_subcategory_category_id').on(table.categoryId),
  ],
);

export const expense = pgTable(
  'expense',
  {
    id: uuid().defaultRandom().primaryKey(),
    createdAt: timestamp().notNull().defaultNow(),
    amount: integer().notNull(),
    description: varchar({ length: 200 }).notNull(),
    month: integer().notNull(),
    year: integer().notNull(),
    subcategoryId: uuid()
      .notNull()
      .references(() => expenseSubcategory.id, { onDelete: 'cascade' }),
    budgetId: uuid()
      .notNull()
      .references(() => budget.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('idx_expense_year_month').on(table.year, table.month),
    index('idx_expense_subcategory_id').on(table.subcategoryId),
    index('idx_expense_budget_id').on(table.budgetId),
  ],
);
