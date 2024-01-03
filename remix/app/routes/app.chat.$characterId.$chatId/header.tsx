import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import { useChatStore } from "@/hooks/useChatStore";

import styles from "./app.chat.module.css";

export function Header() {
  const chat = useChatStore((state) => state.chat);

  return (
    <div className={styles.chat_header}>
      <ToggleLeftSidebar />
      <h1>{chat && chat.title}</h1>
    </div>
  );
}
