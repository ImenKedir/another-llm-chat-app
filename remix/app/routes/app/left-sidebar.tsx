import { useContext } from "react";
import {
  ExitIcon,
  GlobeIcon,
  MagnifyingGlassIcon,
  ArchiveIcon,
  AvatarIcon,
} from "@radix-ui/react-icons";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import styles from "@/routes/app/app.module.css";

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
          <MagnifyingGlassIcon color="white" width={20} height={20} />
          <p>Search</p>
        </div>
        <div className={styles.sidebar_nav_item}>
          <GlobeIcon color="white" width={20} height={20} />
          <p>Explore</p>
        </div>
        <div className={styles.sidebar_nav_item}>
          <ArchiveIcon color="white" width={20} height={20} />
          <p>My Stuff</p>
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
