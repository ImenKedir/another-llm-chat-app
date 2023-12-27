import { useContext } from "react";
import {
  ExitIcon,
  GlobeIcon,
  PlusIcon,
  ArchiveIcon,
  AvatarIcon,
} from "@radix-ui/react-icons";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import styles from "@/routes/app/app.module.css";
import { Link } from "@remix-run/react";

export function LeftSidebar() {
  const { setSidebarVisible } = useContext(LeftSidebarVisibleContext)!;

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_header}>
        <h1>NaughtyML</h1>
        <ExitIcon
          color="white"
          width={20}
          height={20}
          onClick={() => setSidebarVisible(false)}
        />
      </div>
      <div className={styles.sidebar_nav_container}>
        <div className={styles.sidebar_nav_item}>
          <GlobeIcon color="white" width={20} height={20} />
          <Link to="/app">Explore</Link>
        </div>
        <div className={styles.sidebar_nav_item}>
          <PlusIcon color="white" width={20} height={20} />
          <Link to="/app/create">Create</Link>
        </div>
      </div>
      <div className={styles.sidebar_footer}>
        <div className={styles.sidebar_nav_item}>
          <AvatarIcon color="white" width={20} height={20} />
          <p>Profile</p>
        </div>
      </div>
    </div>
  );
}
