import styles from "./app._index.module.css";

export default function AppDefaultOutlet() {
  return (
    <div className={styles.default_container}>
      <h3>This is the default outlet for the app route.</h3>
    </div>
  );
}
