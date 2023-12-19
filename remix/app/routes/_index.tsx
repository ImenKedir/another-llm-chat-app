import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getSession, destroySession } from "@/sessions.server";
import SignInButton from "@/routes/signInButton";
import Scroller from "@/routes/scroller";
import styles from "@/routes/_index.module.css";

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

      <div className={styles.center}>
        <h1>Where Characters Do Whatever You Want</h1>
        <Link to="/app">
          <button className={styles.start_chatting_button}>
            <h3>Start Chatting</h3>
          </button>
        </Link>
        <Scroller />
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
