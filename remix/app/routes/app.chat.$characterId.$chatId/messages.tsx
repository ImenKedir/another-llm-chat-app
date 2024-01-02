import { Spinner } from "@/components/spinner";
import { PersonIcon } from "@radix-ui/react-icons";
import { useChatStore } from "@/hooks/useChatStore";
import { formatS3ImageUrl } from "@/utils/s3";

import type { Message } from "drizzle/model";

import styles from "./app.chat.module.css";

function Message(message: Message) {
  const character = useChatStore((state) => state.character);

  return (
    <div className={styles.chat_message_container}>
      <div className={styles.chat_message_header}>
        {message.author === "user" ? (
          <PersonIcon width={20} height={20} color="white" />
        ) : (
          <img
            src={formatS3ImageUrl(character!.image)}
            width={50}
            height={50}
          />
        )}
      </div>
      {message.content.length > 0 ? message.content : <Spinner />}
    </div>
  );
}

export function Messages() {
  const messages = useChatStore((state) => state.messages);
  return (
    <div className={styles.chat_messages_container}>
      {messages!.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
}
