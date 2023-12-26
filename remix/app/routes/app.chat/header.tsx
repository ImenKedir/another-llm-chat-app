import { useContext } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import styles from "@/routes/app.chat/app.chat.module.css";
import { useConversationStore } from "@/hooks/useConversationStore";

export function Header() {
  const { sidebarVisible, setSidebarVisible } = useContext(
    LeftSidebarVisibleContext,
  )!;

  const setConversationHistory = useConversationStore(
    (state) => state.setConversationHistory,
  );

  return (
    <div className={styles.chat_header}>
      {!sidebarVisible && (
        <HamburgerMenuIcon
          color="white"
          width={20}
          height={20}
          onClick={() => setSidebarVisible(true)}
        />
      )}
      <h1>Fantasy</h1>
      <ReloadIcon
        color="white"
        width={20}
        height={20}
        onClick={() => setConversationHistory([])}
      />
    </div>
  );
}
