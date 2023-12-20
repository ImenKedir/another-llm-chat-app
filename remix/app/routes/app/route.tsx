import { useState } from "react";
import { Outlet } from "@remix-run/react";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import styles from "@/routes/app/app.module.css";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <LeftSidebarVisibleContext.Provider
      value={{ sidebarVisible, setSidebarVisible }}
    >
      <div className={styles.app_container}>
        {sidebarVisible && <LeftSidebar />}
        <Outlet />
      </div>
    </LeftSidebarVisibleContext.Provider>
  );
}
