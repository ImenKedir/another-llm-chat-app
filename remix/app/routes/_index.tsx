import { Link } from "@remix-run/react";
import styles from "./_index.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.name}>NaughtyML</div>
      <div className={styles.login_placeholder}>Log in</div>
      <div className={styles.heading}>
        <h1>Welcome to NaughtyML!</h1>
        {/* <p>
          This will be the landing page. Click the link below to go to the app.
        </p> */}
        <div className={styles.link}>
          <Link to="/app">
            <button>
              <span>Get started</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
