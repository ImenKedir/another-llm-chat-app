import { Config } from "sst/node/config";
import { getSession, commitSession } from "@/sessions.server";
import { LoaderFunctionArgs, redirect, json } from "@remix-run/node";
import { getUser } from "drizzle/model";

import { Link, useLoaderData } from "@remix-run/react";
import { parseJwt } from "@/utils/jwt";
import styles from "@/routes/login/login.module.css";

export async function loader({ request }: LoaderFunctionArgs) {
  // get the session for this request
  const session = await getSession(request.headers.get("Cookie"));

  // this means the user is already logged in
  if (session.has("userId")) {
    return redirect("/app");
  }

  // check for a token (this means the user is coming back from the oauth flow)
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return json({
      error: session.get("error"),
      authAPI: Config.AUTH_API_URL,
    });
  }

  // now we know there is a token, let's validate it
  try {
    // if anything throws an error we know this nigga capping
    const user = await getUser(parseJwt(token).properties.userId);
    if (!user) {
      throw new Error("Invalid Token");
    }

    session.set("userId", user.id);
    return redirect("/app", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    console.log("ERROR", error);
    // redirect back to login page with error message
    session.flash("error", "Error while validating auth token");
    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export default function Login() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.left_content}>
          <div className={styles.nav_container}>
            <div className={styles.name}>
              <h3>NaughtyML</h3>
            </div>
          </div>
          <div className={styles.left_text}>
            <h2>Hello, John!</h2>
            <h3>Log in to start creating magic.</h3>
            <div className={styles.center_button}>
              <button className={styles.login_button}>
                <Link
                  to={data.authAPI + "/google/authorize"}
                  className={styles.link}
                >
                  <p>Sign in with Google</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.right_content}>
          <div className={styles.right_text}>
            {/* <img src="/woman.png" className={styles.responsive_image} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
