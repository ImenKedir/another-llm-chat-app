import { ExitIcon } from "@radix-ui/react-icons";
import styles from "@/routes/app/app.module.css";

export function LeftSidebar({ setIsVisible }: { setIsVisible: Function }) {
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_header}>
        <h1>Role Play</h1>
        <ExitIcon
          color="white"
          width={20}
          height={20}
          onClick={() => setIsVisible(false)}
        />
      </div>
      <div></div>
    </div>
  );
}
