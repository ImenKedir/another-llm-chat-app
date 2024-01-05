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
  bucket: string;
}

function Message({ user, message, bucket }: MessageProps) {
  const character = useChatStore((state) => state.character);

  return (
    <div className="flex w-full gap-2 rounded-lg border border-[var(--tertiary-dark)] bg-[var(--secondary-dark)] p-2 font-[Geist] text-[var(--secondary-light)]">
      <div>
        {message.author === "user" ? (
          <Avatar>
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>{user.name || ""}</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarImage
              src={formatS3ImageUrl(character!.image, bucket, "sm")}
            />
            <AvatarFallback>{character!.name[0]}</AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="px-2">
        {message.content.length > 0 ? message.content : <Spinner />}
      </div>
    </div>
  );
}

interface MessagesProps {
  user: User;
  bucket: string;
}

export function Messages({ user, bucket }: MessagesProps) {
  const messages = useChatStore((state) => state.messages);
  return (
    <div className={styles.chat_messages_container}>
      {messages!.map((message) => (
        <Message
          user={user}
          key={message.id}
          message={message}
          bucket={bucket}
        />
      ))}
    </div>
  );
}
