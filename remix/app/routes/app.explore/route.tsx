import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createChat, createMessage, getCharacters } from "drizzle/model";
import { requireAuth } from "@/sessions.server";
import { Bucket } from "sst/node/bucket";

import { useLoaderData } from "@remix-run/react";

import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import { CharacterCard } from "@/routes/app.explore/character-card";

export async function loader() {
  const characters = await getCharacters();
  return json({ characters: characters, bucket: Bucket.content.bucketName });
}

export default function Explore() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-full w-full overflow-y-scroll">
      <header className="sticky top-0 flex h-[50px] items-center justify-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)]">
        <ToggleLeftSidebar />
        <h1 className="font-[Geist] text-2xl text-white">Explore</h1>
      </header>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.characters.map((character) => (
          <CharacterCard
            key={character.id}
            {...character}
            bucket={data.bucket}
          />
        ))}
      </div>
    </div>
  );
}

export async function action({ request }: LoaderFunctionArgs) {
  const userId = await requireAuth(request);

  const formData = await request.formData();

  const characterId = String(formData.get("characterId"));
  const name = String(formData.get("name"));
  const greeting = String(formData.get("greeting"));

  const chatId = crypto.randomUUID();
  const messageId = crypto.randomUUID();

  await Promise.all([
    createChat({
      id: chatId,
      title: name,
      user: userId,
      character: characterId,
      created: new Date().toISOString(),
    }),
    createMessage({
      id: messageId,
      author: "ai",
      content: greeting,
      chat: chatId,
      created: new Date().toISOString(),
    }),
  ]);

  return redirect(`/app/chat/${characterId}/${chatId}`);
}
