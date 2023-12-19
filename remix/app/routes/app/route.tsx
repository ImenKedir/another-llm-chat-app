import { useState } from "react";
import { Outlet } from "@remix-run/react";
import Sidebar from "@/routes/app/sidebar";
import styles from "@/routes/app/app.module.css";

export default function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleSidebar} className={styles.toggle_button}>
        T
      </button>
      <div
        className={
          isSidebarVisible
            ? styles.sidebar_container
            : styles.sidebar_container_hidden
        }
      >
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
}
