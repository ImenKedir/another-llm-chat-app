import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        maxAge: 60,
        secrets: [
          "pa55word"
        ]
      },
    }
  );

export { getSession, commitSession, destroySession };
