import { db } from "drizzle/db";
import { eq } from "drizzle-orm";
import { users } from "drizzle/schema";

type User = typeof users.$inferInsert

export async function createUser(user: User) {
  await db.insert(users).values({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  });
}

export async function updateUser(user: User) {
  await db.update(users).set({
    name: user.name,
    email: user.email,
    image: user.image,
  }).where(eq(users.id, user.id));
}

export async function getUser(userId: string) {
  const results = await db.select().from(users).where(eq(users.id, userId));

  if (results.length === 0) {
    return null;
  }

  return results[0];
}
