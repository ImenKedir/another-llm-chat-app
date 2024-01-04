import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createChat, createMessage, getCharacters } from "drizzle/model";
import { requireAuth } from "@/sessions.server";
import { Bucket } from "sst/node/bucket";

import { useLoaderData } from "@remix-run/react";

import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { CharacterCard } from "@/routes/app.explore/character-card";

const cardInfo = [
  {
    name: "Akiko",
    content: "Ratched from Ratched and Clank rift apart video game for PS5",
    footer: "Card Footer",
  },
  {
    name: "Glitch",
    content: "Edgy, uneasy, and a little bit of a jerk",
    footer: "Card Footer",
  },
  {
    name: "Mr. Rogers",
    content: "Super kind, but a little bit of a pushover",
    footer: "Card Footer",
  },
  {
    name: "Batman",
    content: "Dark, brooding, and a little bit of a jerk",
    footer: "Card Footer",
  },
];

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
      {
        <div className="grid w-full grid-cols-1 gap-4 px-2 text-white md:grid-cols-2 lg:grid-cols-3">
          {cardInfo.map((card) => (
            <Card
              className="flex h-auto w-auto flex-row justify-center"
              key={card.name}
            >
              <CardHeader className="flex flex-col items-center justify-start px-2 py-2">
                <img src="/images/image20.jpeg" alt="" />
              </CardHeader>
              <CardContent className="flex flex-col items-start pl-0 pr-2 pt-2 text-left">
                <CardTitle>{card.name}</CardTitle>
                <div><p>hi</p></div>
                <p className="text-xs">{card.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      }
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
