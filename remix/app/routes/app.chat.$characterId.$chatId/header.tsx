import { useContext } from "react";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import { useChatStore } from "@/hooks/useChatStore";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons";

import styles from "./app.chat.module.css";

export function Header() {
  const { sidebarVisible, setSidebarVisible } = useContext(
    LeftSidebarVisibleContext,
  )!;

  const character = useChatStore((state) => state.character);
  const setMessages = useChatStore((state) => state.setMessages);

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
        onClick={() => setMessages([])}
      />
    </div>
  );
}
