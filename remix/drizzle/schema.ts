import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("user", {
  id: varchar("userId", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  image: varchar("image", { length: 255 }),
});
