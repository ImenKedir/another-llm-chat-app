import styles from "./app.module.css";
import { Outlet } from "@remix-run/react";

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>Nav</div>
      <Outlet />
    </div>
  );
}
