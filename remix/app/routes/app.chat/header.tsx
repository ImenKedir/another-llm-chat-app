import { useContext } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { SidebarVisibleContext } from "@/contexts/SidebarVisibleContext";
import styles from "@/routes/app.chat/chat.module.css";

export function Header() {
  const { sidebarVisible, setSidebarVisible } = useContext(
    SidebarVisibleContext,
  )!;

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
      <h1>Chat</h1>
    </div>
  );
}
