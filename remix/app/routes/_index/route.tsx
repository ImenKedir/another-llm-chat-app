import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getSession, destroySession } from "@/sessions.server";
import Scroller from "@/routes/_index/scroller";
import FeatureGrid from "@/routes/_index/feature_grid";
import MenuToggle from "@/routes/_index/menu_toggle";
import styles from "@/routes/_index/_index.module.css";
import { useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return json({ userId: session.get("userId") });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <div className={styles.container}>
      
         <div
          className={
            isNavExpanded ? `${styles.nav_dropdown}` : styles.nav_container
          }
        >
          <div className={styles.nav_text}>
            <div className={styles.name}>
              <h3>NaughtyML</h3>
            </div>
            {/* Displays on < 720px  */}
            <div className={styles.login_placeholder}>
              <MenuToggle onToggle={toggleNav} />
            </div>
            {/* Displays on > 720px  */}
            <div className={styles.menu_container}>
              <Link to="/faq" className={styles.menu_extended_links}>
                Blog
              </Link>
              <Link to="/app" className={styles.menu_extended_links}>
                Community
              </Link>
              <Link to="/about" className={styles.menu_app_button}>
                Launch App
              </Link>
            </div>
           </div>
          {/* 'expanded' = menu is dropped down       */}
          {isNavExpanded && (
            <div className={styles.dropdown_container}>
              <Link to="/path1" className={styles.menu_links}>
                Link 1
              </Link>
              <Link to="/path2" className={styles.menu_links}>
                Link 2
              </Link>
              <Link to="/path3" className={styles.menu_links}>
                Link 3
              </Link>
            </div>
          )}
       
          <hr className={styles.hr} />
       </div>

      <div className={styles.main_container}>
        <div className={styles.top_container}>
          <h1>
            Where Characters <br /> Do{" "}
            <span className={styles.highlight}>Whatever</span> You Want
          </h1>
          <h3>
            Spicy conversation with your favorite characters, completely
            uncensored.
          </h3>
          <Link to="/app">
            <button className={styles.start_chatting_button}>
              <h4>Start Chatting</h4>
            </button>
          </Link>
        </div>
        <Scroller />
      </div>

      {/* <div className={styles.feature_container}>
        <h2>Features</h2>
        <FeatureGrid />
      </div> */}
      <div className={styles.features}>Hello</div>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
