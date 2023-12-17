import React from "react";
import styles from "./sidebar.module.css";

type SidebarProps = {
  children: React.ReactNode;
};
// { children }: SidebarProps

function Sidebar() {
  return (
    <div>
      <h1>content</h1>
    </div>
  );
}

// function Sidebar({ onToggle }: { onToggle: () => void }) {
//   const [isOpen, setIsOpen] = React.useState(false);
//   return (
//     <div className={styles.sidebar_container}>
//       <button
//         className={styles.sidebar_button}
//         onClick={() => setIsOpen((open) => !open)}
//       >
//         {isOpen ? "Close" : "Open"}
//       </button>
//       <aside hidden={!isOpen}>
//         <h1>content</h1>
//       </aside>
//     </div>
//   );
// }

export default Sidebar;
