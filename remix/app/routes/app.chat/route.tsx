import { json } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { Header } from "@/routes/app.chat/header";
import { ChatMessages } from "@/routes/app.chat/messages";
import { Input } from "@/routes/app.chat/input";

import styles from "@/routes/app.chat/app.chat.module.css";

export default function Chat() {
  return (
    <div className={styles.chat_container}>
      <Header />
      <ChatMessages />
      <Input />
    </div>
  );
}
