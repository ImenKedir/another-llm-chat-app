import { useState } from "react";
import { Outlet } from "@remix-run/react";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import styles from "@/routes/app/app.module.css";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.app_container}>
      {sidebarVisible && (
        <LeftSidebar
          setIsVisible={setSidebarVisible}
        />
      )}
      <Outlet />
    </div>
  );
}
