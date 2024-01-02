import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { createChat, createMessage, getCharacters } from "drizzle/model";

import { useLoaderData, useSubmit } from "@remix-run/react";
import { formatS3ImageUrl } from "@/utils/s3";

import { requireAuth } from "@/sessions.server";
import type { Character } from "drizzle/model";

import styles from "@/routes/app._index/app._index.module.css";

export async function loader() {
  const characters = await getCharacters();
  return json({ characters: characters });
}

function CharacterCard({ id, name, description, greeting, image }: Character) {
  const submit = useSubmit();

  function handleClick() {
    const formData = new FormData();
    formData.append("characterId", id);
    formData.append("name", name);
    formData.append("greeting", greeting);
    submit(formData, { method: "post" });
  }

  return (
    <div onClick={handleClick} className={styles.character_container}>
      <img src={formatS3ImageUrl(image)}/>
      <div>
        {name}
      </div>
    </div>
  );
}

export default function Explore() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={styles.container}>
      {data.characters.map((character) => (
        <CharacterCard key={character.id} {...character} />
      ))}
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
