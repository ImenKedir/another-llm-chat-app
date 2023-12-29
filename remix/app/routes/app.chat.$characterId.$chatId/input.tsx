import { useChatStore } from "@/hooks/useChatStore";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { Form } from "@remix-run/react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

import styles from "./app.chat.module.css";

interface InputProps {
  SendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Input({ SendMessage }: InputProps) {
  useAutoResizeTextarea("chat-input");
  
  const isStreaming = useChatStore((state) => state.isStreaming);

  return (
    <Form className={styles.chat_input_form} onSubmit={SendMessage}>
      <button style={{opacity: isStreaming ? "50%" : "100%"}} disabled={isStreaming} type="submit">
        <ArrowUpIcon color="black" width={20} height={20} />
      </button>
      <textarea
        id="chat-input"
        name="userInput"
        placeholder="*Describe your actions in asterisks*, Or just type something."
      />
    </Form>
  );
}
