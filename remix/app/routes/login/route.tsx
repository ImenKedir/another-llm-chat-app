import { Link, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { getSession, commitSession } from "@/sessions";
import styles from "./login.module.css";
import "../../../styles/globals.css";
import woman from "/woman.png";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  // user is already logged in
  if (session.has("userId")) {
    return redirect("/");
  }

  const token = new URL(request.url).searchParams.get("token");
  // user just logged in and has been redirected back here with a token
  if (token) {
    session.set("userId", token);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  // user is not logged in, pass the auth api url to the client
  return json({ authApiURL: process.env.AUTH_API_URL });
}

export default function Login() {
  const data = useLoaderData<typeof loader>();

  if (!data.authApiURL) return null;

  return (
    <div className={styles.container}>
      <div className={styles.nav_container}>
        <div className={styles.name}>
          <h2>NaughtyML</h2>
        </div>
        <div className={styles.login_placeholder}></div>
      </div>
      <div className={styles.main}>
        <div className={styles.left_content}>
          <div className={styles.left_text}>
            <h1>Hello, John!</h1>
            <h3>Log in to start creating magic.</h3>
          </div>
          <div className={styles.center_button}>
            <button className={styles.login_button}>
              <Link to={data.authApiURL + "/google/authorize"}>
                <p>Sign in with Google</p>
              </Link>
            </button>
          </div>
          <div>
            <form className={styles.form_container}>
              <input
                className={styles.input}
                type="text"
                id="fname"
                name="fname"
                value="email"
              />
              <input
                className={styles.input}
                type="text"
                id="lname"
                name="lname"
                value="password"
              />
            </form>
          </div>
        </div>
        <div className={styles.right_content}>
          <div className={styles.right_text}>
            <img src="/woman.png" className={styles.responsive_image} />
          </div>
        </div>
      </div>
    </div>
  );
}
