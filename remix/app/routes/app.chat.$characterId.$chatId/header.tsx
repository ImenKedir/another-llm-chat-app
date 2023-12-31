import { ToggleLeftSidebar } from "@/components/toogle-sidebar";
import { useChatStore } from "@/hooks/useChatStore";

import styles from "./app.chat.module.css";
import { useNavStore } from "@/hooks/useNavStore";

export function Header() {
  const chat = useChatStore((state) => state.chat);
  const isLeftSidebarOpen = useNavStore((state) => state.isLeftSidebarOpen);

  return (
    <div className={styles.chat_header}>
      {!isLeftSidebarOpen && <ToggleLeftSidebar />}
      <h1>{chat && chat.title}</h1>
    </div>
  );
}
