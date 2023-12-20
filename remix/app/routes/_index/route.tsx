import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getSession, destroySession } from "@/sessions.server";
import SignInButton from "@/routes/_index/signInButton";
import Scroller from "@/routes/_index/scroller";
import FeatureGrid from "@/routes/_index/feature_grid";
import styles from "@/routes/_index/_index.module.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  return json({ userId: session.get("userId") });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>
        <div className={styles.name}>
          <h3>NaughtyML</h3>
        </div>
        <div className={styles.login_placeholder}>
          <SignInButton userId={data.userId} />
        </div>
      </div>
      <div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.top_container}>
        <h1>Where Characters <br /> Do Whatever You Want</h1>
        <h4>Unleash your creativity and be whoever you want to be, free 
          from the chains of a judgemental society.</h4>
        <Link to="/app">
          <button className={styles.start_chatting_button}>
            <h3>Start Chatting</h3>
          </button>
        </Link>
        <Scroller />
      </div>

      <div>
        <div className={styles.feature_container}>
          <h2>Features</h2>
          <FeatureGrid />
        </div>
        <div className={styles.footer}>
          <h3>NaughtyML</h3>
          <h4>© 2021 NaughtyML</h4>
        </div>
      </div>
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
