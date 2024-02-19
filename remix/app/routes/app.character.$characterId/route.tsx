// server
import { getChat, getUser, getCharacter } from "drizzle/model";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { requireAuth } from "@/sessions.server";
import { Bucket } from "sst/node/bucket";
import { formatS3ImageUrl } from "@/utils/s3";

// hooks
import { useEffect } from "react";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useChatStore } from "@/hooks/useChatStore";

// components
import { Header } from "@/routes/app.character.$characterId/header";
import { Button } from "@/components/shadcn/button";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = await requireAuth(request);
  const [user, character] = await Promise.all([
    getUser(userId),
    getCharacter(params.characterId),
    getChat(params.chatId),
  ]);

  if (!user || !character) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json({
    user: user,
    character: character,
    tags: character.tags,
    chatId: params.chatId,
    bucket: Bucket.content.bucketName,
  });
}

export default function Character() {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const setCharacter = useChatStore((state) => state.setCharacter);

  useEffect(() => {
    setCharacter(data.character);
  }, [data.character]);

  const character = useChatStore((state) => state.character);

  return (
    <div className="flex h-full w-full flex-col items-center gap-8 text-white">
      <Header />
      <div className="flex flex-col gap-6 md:flex-row px-6">
        <div className="flex md:w-1/3 w-full items-center justify-center rounded-xl md:px-0">
          <img
            // className="rounded-xl h-[400px] border border-[var(--primary-light)]"
            className="!static aspect-[3/4] md:aspect-[3/4] w-full h-[350px] sm:h-full rounded-xl object-center object-cover select-none"
            src={formatS3ImageUrl(data.character!.image, data.bucket, "explore")}
          />           
        </div>

        <div className="flex w-full md:w-2/3 flex-col gap-8 sm:gap-16 lg:justify-between pl-4">
          <div className="flex flex-col gap-6">
            <h1 className="font-[Geist-Bold] text-3xl md:text-5xl">{character?.name}</h1>
            <div className="flex flex-row gap-6 justify-start w-full">
              <div className="flex border border-[var(--primary-light)] px-2 rounded-lg">
                <p className="text-sm">31M</p>
              </div>
              <div className="flex border border-[var(--primary-light)] px-2 rounded-lg">
                <p className="text-sm">221.5k</p>
              </div>
              <div className="flex border border-[var(--primary-light)] px-2 rounded-lg">
                <p className="text-sm">165</p>
              </div>
              <div className="flex border border-[var(--primary-light)] px-2 rounded-lg">
                <p className="text-sm">3</p>
              </div>
            </div>  <div className="flex flex-row gap-6">
            <div>
              <h3 className="font-[Geist] text-xs">Creator</h3>
              <p className="font-[Geist-Light] text-sm">@name</p>
            </div>
            <div>
              <h3 className="font-[Geist] text-xs">Created at</h3>
              <p className="font-[Geist-Light] text-sm">Jan 2, 2024</p>
            </div>
            <div>
              <h3 className="font-[Geist] text-xs">Updated At</h3>
              <p className="font-[Geist-Light] text-sm">Jan 15, 2024</p>
            </div>
          </div>
            
          </div>

        
          <h2 className="font-[Geist-Light]">{character?.title}</h2>
          <div className="flex w-full flex-row justify-between">
          {data.tags?.map((tag) => (
            <div className="border rounded border-[var(--primary-light)] border-opacity-95 p-1">
            <p className="text-xs">{tag}</p>
                </div>
            ))}
           
          </div> 
    
          <Button
            className="border border-[var(--primary-light)] w-[150px] h-[50px] rounded-xl"
            onClick={() => {
              const formData = new FormData();
              formData.append("characterId", data.character.id);
              formData.append("name", data.character.name);
              formData.append("greeting", data.character.greeting);
              submit(formData, { action: "/api/chat", method: "post" });
            }}
          >
            Start Chatting
          </Button>
        </div>
      </div>
    </div>
  );
}

