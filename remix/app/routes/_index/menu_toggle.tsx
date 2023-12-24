import styles from "./_index.module.css";

interface MenuToggleProps {
  onToggle: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ onToggle }) => {
  const myFunction = (x: HTMLDivElement) => {
    x.classList.toggle(styles.change);
    onToggle();
  };

  return (
    <>
      <div onClick={(e) => myFunction(e.currentTarget as HTMLDivElement)}>
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>
    </>
  );
};

export default MenuToggle;
