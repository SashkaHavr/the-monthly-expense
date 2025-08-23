import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean().default(false).notNull(),
  image: text(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  role: text(),
  banned: boolean(),
  banReason: text(),
  banExpires: timestamp(),
});

export const session = pgTable(
  'session',
  {
    id: uuid().defaultRandom().primaryKey(),
    expiresAt: timestamp().notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: uuid()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    impersonatedBy: text(),
    activeOrganizationId: uuid().references(() => organization.id, {
      onDelete: 'cascade',
    }),
  },
  (table) => [index('idx_session_user_id').on(table.userId)],
);

export const account = pgTable(
  'account',
  {
    id: uuid().defaultRandom().primaryKey(),
    accountId: uuid().notNull(),
    providerId: text().notNull(),
    userId: uuid()
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: timestamp(),
    refreshTokenExpiresAt: timestamp(),
    scope: text(),
    password: text(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
  },
  (table) => [index('idx_account_user_id').on(table.userId)],
);

export const verification = pgTable('verification', {
  id: uuid().defaultRandom().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const organization = pgTable('organization', {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull(),
  slug: text().unique(),
  logo: text(),
  createdAt: timestamp().notNull(),
  metadata: text(),
});

export const member = pgTable('member', {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid()
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  userId: uuid()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  role: text().default('member').notNull(),
  createdAt: timestamp().notNull(),
});

export const invitation = pgTable('invitation', {
  id: uuid().defaultRandom().primaryKey(),
  organizationId: uuid()
    .notNull()
    .references(() => organization.id, { onDelete: 'cascade' }),
  email: text().notNull(),
  role: text(),
  status: text().default('pending').notNull(),
  expiresAt: timestamp().notNull(),
  inviterId: uuid()
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});
