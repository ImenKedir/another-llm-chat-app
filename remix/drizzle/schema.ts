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
  conversations: many(conversations),
}));

export const characters = mysqlTable("characters", {
  id: varchar("id", { length: 256 }).primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  creator: varchar("userId", { length: 256 }).notNull(),
});

export const characterRelations = relations(characters, ({ one, many }) => ({
  creator: one(users, {
    fields: [characters.creator],
    references: [users.id],
  }),
  conversations: many(conversations),
}));

export const conversations = mysqlTable("conversations", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  user: varchar("userId", { length: 256 }).notNull(),
  character: varchar("characterId", { length: 256 }).notNull(),
});

export const conversationRelations = relations(
  conversations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [conversations.user],
      references: [users.id],
    }),
    character: one(characters, {
      fields: [conversations.character],
      references: [characters.id],
    }),
    messagess: many(messages),
  }),
);

export const messages = mysqlTable("messages", {
  id: varchar("id", { length: 256 }).primaryKey(),
  author: mysqlEnum("author", ["user", "ai"]).notNull(),
  content: text("content").notNull(),
  created: varchar("created", { length: 256 }).notNull(),
  conversation: varchar("conversationId", { length: 256 }).notNull(),
});

export const messageRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversation],
    references: [conversations.id],
  }),
}));
