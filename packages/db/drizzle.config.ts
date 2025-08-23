import { defineConfig } from 'drizzle-kit';

import { envDB } from '@the-monthly-expense/env/db';

export default defineConfig({
  out: './drizzle',
  schema: './src/schema',
  dialect: 'postgresql',
  dbCredentials: { url: envDB.DATABASE_URL },
  casing: 'snake_case',
});
