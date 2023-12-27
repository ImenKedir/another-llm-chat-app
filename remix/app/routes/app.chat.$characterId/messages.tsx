import { EyeOpenIcon, PersonIcon } from "@radix-ui/react-icons";
import { Spinner } from "@/components/spinner";
import { useConversationStore } from "@/hooks/useConversationStore";
import type { Message } from "drizzle/model";
import styles from "@/routes/app.chat.$characterId/app.chat.module.css";

function Message(message: Message) {
  return (
    <div className={styles.chat_message_container}>
      <div className={styles.chat_message_header}>
        {message.author === "user" ? (
          <PersonIcon width={20} height={20} color="white" />
        ) : (
          <EyeOpenIcon width={20} height={20} color="white" />
        )}
      </div>
      {message.content.length > 0 ? message.content : <Spinner />}
    </div>
  );
}

export function Messages() {
  const conversationHistory = useConversationStore(
    (state) => state.conversationHistory,
  );
  return (
    <div className={styles.chat_messages_container}>
      {conversationHistory.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
}
