import styles from "./_index.module.css";
const MenuButton: React.FC = () => {
  const myFunction = (x: HTMLDivElement) => {
    x.classList.toggle(styles.change);
  };

  return (
    <>
      <div className={styles.menu_container} onClick={(e) => myFunction(e.currentTarget as HTMLDivElement)}>
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>
    </>
  );
};

export default MenuButton;

