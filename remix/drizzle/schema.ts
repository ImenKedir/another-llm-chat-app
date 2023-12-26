import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  image: varchar("image", { length: 255 }),
});

export const userRelations = relations(users, ({ many }) => ({
  personas: many(character),
}));

export const character = mysqlTable("persona", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  description: varchar("description", { length: 255 }),
  creator: varchar("userId", { length: 255 }),
});

export const characterRelations = relations(character, ({ one }) => ({
  creator: one(users, {
    fields: [character.creator],
    references: [users.id],
  }),
}));
