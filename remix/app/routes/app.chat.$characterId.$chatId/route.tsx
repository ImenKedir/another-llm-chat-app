// server
import {
  getChat,
  getUser,
  getCharacter,
  createMessage,
  getChatMessages,
} from "drizzle/model";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { requireAuth } from "@/sessions.server";
import { Bucket } from "sst/node/bucket";

// hooks
import { useEffect } from "react";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useChatStore } from "@/hooks/useChatStore";

// components
import { Header } from "@/routes/app.chat.$characterId.$chatId/header";
import { Messages } from "@/routes/app.chat.$characterId.$chatId/messages";
import { Input } from "@/routes/app.chat.$characterId.$chatId/input";

// misc
import { generatePrompt } from "@/utils/prompt";
import { v4 as uuid } from "uuid";

import styles from "./app.chat.module.css";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = await requireAuth(request);

  const [user, chat, character] = await Promise.all([
    getUser(userId),
    getChat(params.chatId),
    getCharacter(params.characterId),
  ]);

  if (!user || !chat || !character) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const messages = await getChatMessages(chat.id);

  return json({
    user: user,
    chat: chat,
    character: character,
    messages: messages,
    bucket: Bucket.content.bucketName,
  });
}

export default function Chat() {
  const data = useLoaderData<typeof loader>();

  const setChat = useChatStore((state) => state.setChat);
  const setMessages = useChatStore((state) => state.setMessages);
  const setCharacter = useChatStore((state) => state.setCharacter);

  useEffect(() => {
    setChat(data.chat);
    setMessages(data.messages);
    setCharacter(data.character);
  }, [data.character, data.messages, data.chat]);

  const submit = useSubmit();

  const chat = useChatStore((state) => state.chat);
  const character = useChatStore((state) => state.character);
  const setStreaming = useChatStore((state) => state.setStreaming);
  const addToMessages = useChatStore((state) => state.addToMessages);
  const appendTokenToLastMessage = useChatStore(
    (state) => state.appendTokenToLastMessage,
  );

  function sendMessage(event: React.FormEvent) {
    try {
      event.preventDefault(); // normally the event hits the remix server action
      setStreaming(true); // but we want to add our own lil streaming logic

      // get the message from the form submission
      const userInput = new FormData(event.target as HTMLFormElement).get(
        "userInput",
      );

      if (!userInput || typeof userInput !== "string") {
        console.error("prompt is empty or not a string.");
        return;
      }

      // add the user message to the chat history
      addToMessages({
        id: uuid(),
        author: "user",
        content: userInput,
        created: new Date().toISOString(),
        chat: chat!.id,
      });

      // add the ai message to the chat history
      addToMessages({
        id: uuid(),
        author: "ai",
        content: "", // we will stream the content in later
        created: new Date().toISOString(),
        chat: chat!.id,
      });

      const prompt = generatePrompt(
        data.user,
        data.character,
        userInput,
        data.messages,
      );

      console.log(prompt);

      // start the event stream
      const sse = new EventSource(
        `/completion?prompt=${encodeURIComponent(
          prompt,
        )}&special=${encodeURIComponent(data.user.name || "Anonymous")}`,
        { withCredentials: true },
      );

      // handle incoming tokens
      let ai = "";
      sse.addEventListener("message", (event) => {
        const token = event.data as string;
        if (token !== "[DONE]") {
          ai += token;
          appendTokenToLastMessage(token);
        } else {
          // close the event stream
          sse.close();
          // make a post request to save tokens to db
          const formData = new FormData();
          formData.append("chatId", chat!.id);
          formData.append("characterId", character!.id);
          formData.append("aiContent", ai);
          formData.append("userContent", userInput);
          submit(formData, { method: "post" });
        }
      });

      // handle errors
      sse.addEventListener("error", (event) => {
        console.log("error: ", event);
        sse.close();
        setStreaming(false);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className={styles.chat_container}>
      <Header />
      <Messages user={data.user} bucket={data.bucket} />
      <Input sendMessage={sendMessage} />
    </div>
  );
}

export async function action({ request, params }: LoaderFunctionArgs) {
  const [, formData, chat] = await Promise.all([
    requireAuth(request),
    request.formData(),
    getChat(params.chatId),
  ]);

  if (!chat) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const creationTime = new Date();
  await Promise.all([
    createMessage({
      id: crypto.randomUUID(),
      author: "user",
      content: String(formData.get("userContent")),
      created: creationTime.toISOString(),
      chat: chat.id,
    }),
    createMessage({
      id: crypto.randomUUID(),
      author: "ai",
      content: String(formData.get("aiContent")),
      created: new Date(creationTime.getTime() + 100).toISOString(),
      chat: chat.id,
    }),
  ]);

  return {};
}
