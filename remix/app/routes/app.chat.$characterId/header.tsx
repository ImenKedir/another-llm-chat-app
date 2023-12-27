import { useContext } from "react";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import { useConversationStore } from "@/hooks/useConversationStore";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";
import styles from "@/routes/app.chat.$characterId/app.chat.module.css";

export function Header() {
  const { sidebarVisible, setSidebarVisible } = useContext(
    LeftSidebarVisibleContext,
  )!;

  const character = useConversationStore((state) => state.character);

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
      <h1>{character && character.name}</h1>
      <ReloadIcon
        color="white"
        width={20}
        height={20}
        onClick={() => setConversationHistory([])}
      />
    </div>
  );
}
