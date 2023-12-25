import type { Config as DrizzleConfig } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.PLANETSCALE_DATABASE_URI!,
  }
} satisfies DrizzleConfig;