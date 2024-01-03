import { Spinner } from "@/components/spinner";
import { useChatStore } from "@/hooks/useChatStore";
import { formatS3ImageUrl } from "@/utils/s3";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

import type { User, Message } from "drizzle/model";

import styles from "./app.chat.module.css";

interface MessageProps {
  user: User;
  message: Message;
}

function Message({ user, message }: MessageProps) {
  const character = useChatStore((state) => state.character);

  return (
    <div className="flex w-full gap-2 rounded border border-[var(--tertiary-dark)] bg-[var(--secondary-dark)] p-2 font-[Geist] text-[var(--secondary-light)]">
      <div>
        {message.author === "user" ? (
          <Avatar>
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name || ""}</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarImage src={formatS3ImageUrl(character!.image, "sm")} />
            <AvatarFallback>{character!.name[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
      {message.content.length > 0 ? message.content : <Spinner />}
    </div>
  );
}

interface MessagesProps {
  user: User;
}

export function Messages({ user }: MessagesProps) {
  const messages = useChatStore((state) => state.messages);
  return (
    <div className={styles.chat_messages_container}>
      {messages!.map((message) => (
        <Message user={user} key={message.id} message={message} />
      ))}
    </div>
  );
}
