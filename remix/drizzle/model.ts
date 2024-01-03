import { db } from "drizzle/db";
import { asc, desc, eq } from "drizzle-orm";
import { users, characters, chats, messages } from "drizzle/schema";

export type User = typeof users.$inferInsert;

export async function createUser(user: User) {
  await db.insert(users).values({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  });
}

export async function updateUser(user: User) {
  await db
    .update(users)
    .set({
      name: user.name,
      email: user.email,
      image: user.image,
    })
    .where(eq(users.id, user.id));
}

export async function getUser(userId: string | undefined) {
  if (!userId) {
    return null;
  }

  const results = await db.select().from(users).where(eq(users.id, userId));

  if (results.length === 0) {
    return null;
  }

  return results[0];
}

export type Character = typeof characters.$inferInsert;

export async function createCharacter(character: Character) {
  await db.insert(characters).values({
    id: character.id,
    name: character.name,
    short_description: character.short_description,
    long_description: character.long_description,
    example_dialogue: character.example_dialogue,
    
    greeting: character.greeting,
    image: character.image,
    creator: character.creator,
  });

  return character;
}

export async function getCharacter(characterId: string | undefined) {
  if (!characterId) {
    return null;
  }

  const results = await db
    .select()
    .from(characters)
    .where(eq(characters.id, characterId));

  if (results.length === 0) {
    return null;
  }

  return results[0];
}

export async function getCharacters(offset: number = 0, limit: number = 10) {
  return await db.select().from(characters).limit(limit).offset(offset);
}

export type Chat = typeof chats.$inferInsert;

export async function createChat(chat: Chat) {
  await db.insert(chats).values({
    id: chat.id,
    title: chat.title,
    user: chat.user,
    character: chat.character,
    created: chat.created,
  });

  return chat;
}

export async function getChat(chatId?: string) {
  if (!chatId) {
    return null;
  }

  const results = await db.select().from(chats).where(eq(chats.id, chatId));

  if (results.length === 0) {
    return null;
  }

  return results[0];
}

export async function getRecentChats(userId: string, limit: number = 10) {
  return await db
    .select()
    .from(chats)
    .orderBy(desc(chats.created))
    .where(eq(chats.user, userId))
    .limit(limit);
}

export type Message = typeof messages.$inferInsert;

export async function createMessage(message: Message) {
  await db.insert(messages).values({
    id: message.id,
    author: message.author,
    content: message.content,
    created: message.created,
    chat: message.chat,
  });
}

export async function getChatMessages(chatId: string) {
  return await db
    .select()
    .from(messages)
    .orderBy(asc(messages.created))
    .where(eq(messages.chat, chatId));
}
