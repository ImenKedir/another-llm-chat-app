import React, { useState } from "react";
import styles from "./app.module.css";
import { Outlet } from "@remix-run/react";
import Sidebar from "../../components/sidebar/sidebar";

export default function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleSidebar} className={styles.toggle_button}>
        Toggle Sidebar
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
