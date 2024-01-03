import { Link } from "@remix-run/react";
import Scroller from "@/routes/_index/scroller";
import FeatureGrid from "@/routes/_index/feature_grid";
import MenuToggle from "@/routes/_index/menu_toggle";
import FAQ from "@/routes/_index/faq";
import logos from "/logos/logos.png";
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
              <Link to="/app" className={styles.menu_links}>
                Blog
              </Link>
              <Link to="/app" className={styles.menu_links}>
                Community
              </Link>
              <Link to="/app" className={styles.app_button}>
                Launch App
              </Link>
            </div>
          </div>
          {isDropdownExpanded && (
            <div className={styles.dropdown_container}>
              <Link to="/app" className={styles.dropdown_links}>
                Link 1
              </Link>
              <Link to="/app" className={styles.dropdown_links}>
                Link 2
              </Link>
              <Link to="/app" className={styles.dropdown_button}>
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
        {/* <h2>FEATURES</h2> */}
        <FeatureGrid />
      </div>

      {/* <div className={styles.faq_container}>
          <h1>Frequently Asked Questions</h1>
          <FAQ />
 
      </div> */}
      {/* <div className={styles.footer_container}>
        Footer
      </div> */}
    </div>
  );
}
