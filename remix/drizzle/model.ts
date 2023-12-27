import { db } from "drizzle/db";
import { eq } from "drizzle-orm";
import { users, characters, conversations, messages } from "drizzle/schema";

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

  const results = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

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
    description: character.description,
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


export type Conversation = typeof conversations.$inferInsert;
export type Message = typeof messages.$inferInsert;