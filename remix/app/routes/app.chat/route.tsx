import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Header } from "@/routes/app.chat/header";
import { Messages } from "@/routes/app.chat/messages";
import { Input } from "@/routes/app.chat/input";

import styles from "@/routes/app.chat/app.chat.module.css";

export function loader() {
  return json({ infrence_api_url: process.env.INFRENCE_API_URL });
}

export default function Chat() {
  const data = useLoaderData<typeof loader>();

  const [streamingResponse, setStreamingResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className={styles.chat_container}>
      <Header />
      <Messages />
      <Input />
    </div>
  );
}
