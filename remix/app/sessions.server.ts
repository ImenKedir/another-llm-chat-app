import { createCookieSessionStorage, redirect } from "@remix-run/node";

type SessionData = {
  userId: string;
  userName: string;
};

type SessionFlashData = {
  error: string;
};

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: "__session",
      maxAge: 60 * 60 * 24,
      secrets: ["pa55word"],
    },
  });

export async function requireAuth(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));

  const userId = session.get("userId");

  if (!userId) {
    throw redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  return userId;
}
