import { mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }),
  image: varchar("image", { length: 256 }),
});

export const userRelations = relations(users, ({ many }) => ({
  characters: many(characters),
  chats: many(chats),
}));

export const characters = mysqlTable("characters", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description").notNull(),
  greeting: text("greeting").notNull(),
  creator: varchar("userId", { length: 256 }).notNull(),
});

export const characterRelations = relations(characters, ({ one, many }) => ({
  creator: one(users, {
    fields: [characters.creator],
    references: [users.id],
  }),
  chats: many(chats),
}));

export const chats = mysqlTable("chats", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  user: varchar("userId", { length: 256 }).notNull(),
  character: varchar("characterId", { length: 256 }).notNull(),
  created: varchar("created", { length: 256 }).notNull(),
});

export const chatRelations = relations(chats, ({ one, many }) => ({
  user: one(users, {
    fields: [chats.user],
    references: [users.id],
  }),
  character: one(characters, {
    fields: [chats.character],
    references: [characters.id],
  }),
  messages: many(messages),
}));

export const messages = mysqlTable("messages", {
  id: varchar("id", { length: 256 }).primaryKey(),
  author: mysqlEnum("author", ["user", "ai"]).notNull(),
  content: text("content").notNull(),
  created: varchar("created", { length: 256 }).notNull(),
  chat: varchar("chatId", { length: 256 }).notNull(),
});

export const messageRelations = relations(messages, ({ one }) => ({
  chat: one(chats, {
    fields: [messages.chat],
    references: [chats.id],
  }),
}));
