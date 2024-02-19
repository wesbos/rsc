import { Config } from 'drizzle-kit';

export default {
  "out": "drizzle",
  "schema": "db/schema.ts",
  "driver": "better-sqlite",
  dbCredentials: {
    url: './marketplace.db'
  }
} satisfies Config;
