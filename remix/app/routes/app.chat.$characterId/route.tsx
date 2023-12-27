import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getCharacter } from "drizzle/model";

import { useLoaderData } from "@remix-run/react";
import { useConversationStore } from "@/hooks/useConversationStore";
import { Header } from "@/routes/app.chat.$characterId/header";
import { Messages } from "@/routes/app.chat.$characterId/messages";
import { Input } from "@/routes/app.chat.$characterId/input";

import styles from "@/routes/app.chat.$characterId/app.chat.module.css";
import { useEffect } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const character = await getCharacter(params.characterId);

  if (!character) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json({ character });
}

export default function Chat() {
  const data = useLoaderData<typeof loader>();
  const setCharacter = useConversationStore((state) => state.setCharacter);

  useEffect(() => {
    setCharacter(data.character);
  }, [data.character, setCharacter]);

  return (
    <div className={styles.chat_container}>
      <Header />
      <Messages />
      <Input />
    </div>
  );
}
