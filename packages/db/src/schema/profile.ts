import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { user } from './auth';
import { budget } from './budget';

export const profile = pgTable('profile', {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().notNull().defaultNow(),
  userId: text()
    .notNull()
    .references(() => user.id),
  selectedBudget: uuid().references(() => budget.id),
});
