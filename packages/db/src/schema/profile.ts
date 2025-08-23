import { index, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { user } from './auth';
import { budget } from './budget';

export const profile = pgTable(
  'profile',
  {
    id: uuid().defaultRandom().primaryKey(),
    createdAt: timestamp().notNull().defaultNow(),
    userId: uuid()
      .notNull()
      .references(() => user.id),
    selectedBudget: uuid().references(() => budget.id, { onDelete: 'cascade' }),
  },
  (table) => [index('idx_profile_user_id').on(table.userId)],
);
