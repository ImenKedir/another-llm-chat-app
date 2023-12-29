import { Link } from "@remix-run/react";
import Scroller from "@/routes/_index/scroller";
import FeatureGrid from "@/routes/_index/feature_grid";
import MenuToggle from "@/routes/_index/menu_toggle";
import styles from "@/routes/_index/_index.module.css";
import { useState } from "react";

export default function Index() {
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  const toggleNav = () => {
    setIsDropdownExpanded(!isDropdownExpanded);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sticky}>
        <div
          className={
            isDropdownExpanded
              ? `${styles.nav_container_dropdown}`
              : styles.nav_container
          }
        >
          <div className={styles.nav_text}>
            <div className={styles.name}>
              <h3>NaughtyML</h3>
            </div>
            {/* Displays on < 720px  */}
            <div className={styles.toggle_container}>
              <MenuToggle onToggle={toggleNav} />
            </div>
            {/* Displays on > 720px  */}
            <div className={styles.menu_container}>
              <Link to="/faq" className={styles.menu_links}>
                Blog
              </Link>
              <Link to="/app" className={styles.menu_links}>
                Community
              </Link>
              <Link to="/app/chat" className={styles.app_button}>
                Launch App
              </Link>
            </div>
          </div>
          {isDropdownExpanded && (
            <div className={styles.dropdown_container}>
              <Link to="/path1" className={styles.dropdown_links}>
                Link 1
              </Link>
              <Link to="/path2" className={styles.dropdown_links}>
                Link 2
              </Link>
              <Link to="/app/chat" className={styles.dropdown_button}>
                Launch App
              </Link>
            </div>
          )}
          <hr className={styles.hr} />
        </div>
      </div>

      <div className={styles.main_container}>
        <div className={styles.header_container}>
          <h1>
            Where Characters <br /> Do{" "}
            <span className={styles.highlight}>Whatever</span> You Want
          </h1>
          <h3>
            Spicy conversation with your favorite characters, completely
            uncensored.
          </h3>
          <Link className={styles.link} to="/app/chat">
            <div className={styles.start_chatting_button}>
              <h4>Get Started</h4>
            </div>
          </Link>
        </div>
        <Scroller />
      </div>

      <div className={styles.feature_container}>
        <h3>FEATURES</h3>
        <FeatureGrid />
      </div>

      <div className={styles.footer}>
        <Link to="/app/chat">
          <button className={styles.start_chatting_button}>
            <h4>Get Started</h4>
          </button>
        </Link>
        <div className={styles.footer_text}>
          <h2>Join the Community</h2>
          <p>
            Join like-minded fans and AI enthusiastis in the lorem ipsum sum
            lorem ipsum sum Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Amet fugit doloremque quo beatae repellat cum quaerat quam.
            Placeat perspiciatis repellendus saepe quibusdam id. Fugiat, rem sed
            id architecto velit accusantium!
          </p>
        </div>

        <div className={styles.footer_links}>
          <Link to="/faq" className={styles.footer_link}>
            Join Discord
          </Link>
          <Link to="/app" className={styles.footer_link}>
            Follow on Twitter
          </Link>
          <Link to="/app/chat" className={styles.footer_link}>
            Follow on Instagram
          </Link>
        </div>
      </div>
    </div>
  );
}
