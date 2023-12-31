import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useNavStore } from "@/hooks/useNavStore";

import styles from "@/components/toogle-sidebar/toogle-sidebar.module.css";

export function ToggleLeftSidebar() {
  const isLeftSidebarOpen = useNavStore((state) => state.isLeftSidebarOpen);
  const toggleLeftSidebar = useNavStore((state) => state.toggleLeftSidebar);

  return (
    <div
      className={styles.toggle_left_sidebar_icon}
      onClick={() => toggleLeftSidebar()}
    >
      {isLeftSidebarOpen ? (
        <DoubleArrowLeftIcon color="white" width={20} height={20} />
      ) : (
        <DoubleArrowRightIcon color="white" width={20} height={20} />
      )}
    </div>
  );
}
