import { useState } from "react";
import { Outlet } from "@remix-run/react";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import { SidebarVisibleContext } from "@/contexts/SidebarVisibleContext";
import styles from "@/routes/app/app.module.css";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <SidebarVisibleContext.Provider
      value={{ sidebarVisible, setSidebarVisible }}
    >
      <div className={styles.app_container}>
        {sidebarVisible && <LeftSidebar />}
        <Outlet />
      </div>
    </SidebarVisibleContext.Provider>
  );
}
