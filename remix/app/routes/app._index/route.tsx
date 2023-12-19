import styles from "@/routes/app._index/app._index.module.css";
// This is the default outlet for the app route.
export default function AppDefaultOutlet() {
  return (
    <div className={styles.default_container}>
      <div className={styles.card}>
        <div className={styles.name}>
          <h3>Character Name</h3>
        </div>
      </div>
    </div>
  );
}
