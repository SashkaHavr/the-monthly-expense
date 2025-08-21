import {
  char,
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
} from '@the-monthly-sum/utils/categories';

import { budget } from './budget';

export const expenseCategory = pgTable('expense_category', {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().notNull().defaultNow(),
  slug: text().notNull().unique().$type<CategorySlug>(),
});

export const expenseSubcategory = pgTable('expense_subcategory', {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().notNull().defaultNow(),
  slug: text().notNull().unique().$type<SubcategorySlug>(),
  categoryId: uuid()
    .notNull()
    .references(() => expenseCategory.id),
});

export const expense = pgTable('expense', {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().notNull().defaultNow(),
  amount: integer().notNull(),
  description: varchar({ length: 200 }).notNull(),
  // YYYY-MM
  month: char({ length: 7 }).notNull(),
  subcategoryId: uuid()
    .notNull()
    .references(() => expenseSubcategory.id),
  budgetId: uuid()
    .notNull()
    .references(() => budget.id),
});
