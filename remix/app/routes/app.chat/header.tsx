import { useContext } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import styles from "@/routes/app.chat/app.chat.module.css";

export function Header() {
  const { sidebarVisible, setSidebarVisible } = useContext(
    LeftSidebarVisibleContext,
  )!;

  return (
    <div className={styles.chat_header}>
      {!sidebarVisible && (
        <HamburgerMenuIcon
          style={{ padding: "0.5rem", position: "fixed" }}
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
