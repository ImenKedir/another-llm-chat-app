import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createChat, createMessage, getCharacters } from "drizzle/model";
import { requireAuth } from "@/sessions.server";
import { Bucket } from "sst/node/bucket";

import { useLoaderData } from "@remix-run/react";
import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import { CharacterCard } from "@/routes/app.explore/character-card";
import { Input } from "@/components/shadcn/input";
import { FilterBox } from "@/components/shadcn/filter";
import { Filters } from "./filters";
import { ToggleBlock } from "./toggleBlock";
import { Toggle } from "@radix-ui/react-toggle";
export async function loader() {
  const characters = await getCharacters();
  return json({ characters: characters, bucket: Bucket.content.bucketName });
}

export default function Explore() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-full w-full items-center overflow-y-scroll bg-[#0d0d0f] ">
      <header className="sticky top-0 z-10 flex h-[50px] items-center justify-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)]">
        <ToggleLeftSidebar />
        <h1 className="font-[Geist] text-2xl text-white">Explore</h1>
      </header>
      <div className="flex flex-col gap-6 px-4 pt-6 lg:px-10">
        <div className="flex flex-row justify-between w-full">
          <h1 className=" m-0 p-0 font-[Geist] text-xl text-white">
            Search Characters
          </h1>
        
        </div>
    
        <Input
          type="email"
          id="email"
          placeholder="Type here to search for character"
          className="bg-[var(--tertiary-dark)] border border-[var(--quadrary-dark)] text-white"
        />
        <div className="flex flex-row justify-between">
          <Filters />
        </div>
        <div className="grid w-full grid-cols-2 items-center justify-center gap-4 md:gap-8 text-white md:grid-cols-3 xl:grid-cols-4">
          {data.characters.map((character) => (
            <div className="transform transition duration-300 hover:scale-105">
                <CharacterCard key={character.id} {...character} />

            </div>
          ))}
        </div>
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
