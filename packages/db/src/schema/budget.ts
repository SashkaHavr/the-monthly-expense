import { index, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { organization } from './auth';

export const budget = pgTable(
  'budget',
  {
    id: uuid().defaultRandom().primaryKey(),
    createdAt: timestamp().notNull().defaultNow(),
    organizationId: uuid()
      .notNull()
      .references(() => organization.id, { onDelete: 'cascade' }),
    currency: text().notNull(),
  },
  (table) => [index('idx_budget_organization_id').on(table.organizationId)],
);
