import { useConversationStore } from "@/hooks/useConversationStore";
import { EyeOpenIcon, PersonIcon } from "@radix-ui/react-icons";
import styles from "@/routes/app.chat/app.chat.module.css";

import type { Message } from "@/hooks/useConversationStore";

function ChatMessage(message: Message) {
  return (
    <div className={styles.chat_message_container}>
      <div className={styles.chat_message_header}>
        {message.author === "ai" ? (
          <EyeOpenIcon width={20} height={20} color="white" />
        ) : (
          <PersonIcon width={20} height={20} color="white" />
        )}
      </div>
      {message.content}
    </div>
  );
}

export function ChatMessages() {
  const { streamedResponse, chatHistory } = useConversationStore();
  return (
    <div className={styles.chat_messages_container}>
      {chatHistory.map((message) => (
        <ChatMessage key={message.id} {...message} />
      ))}
      {streamedResponse.length > 0 && (
        <ChatMessage
          id={Date.now().toString()}
          author="ai"
          content={streamedResponse}
        />
      )}
    </div>
  );
}
