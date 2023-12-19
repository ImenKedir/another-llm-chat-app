import React from "react";
import styles from "./app.module.css";
import { Link } from "@remix-run/react";
import { SidebarData } from "./sidebarData";

function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
      <ul>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
