import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { organization } from './auth';

export const budget = pgTable('budget', {
  id: uuid().defaultRandom().primaryKey(),
  createdAt: timestamp().notNull().defaultNow(),
  organizationId: text()
    .notNull()
    .references(() => organization.id),
  currency: text().notNull(),
});
