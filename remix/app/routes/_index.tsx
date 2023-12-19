import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getSession, destroySession } from "@/sessions.server";
import SignInButton from "@/routes/signInButton";
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
        <h1>Welcome to NaughtyML</h1>
        <div>
          <Link to="/app">
            <button className={styles.get_started_button}>
              <h3>Get started</h3>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// export default function Index() {
//   const data = useLoaderData<typeof loader>();

//   <div className={styles.container}>
//     <div className={styles.name}>NaughtyML</div>
//     <div className={styles.login_placeholder}>
//       {/* {data.userId ? (
//         <SignIn userId={data.userId} />
//       ) : (
//         <div>
//           <h1>You are not signed in</h1>
//           <Link to={"/login"}>click here to login</Link>
//         </div>
//       )} */}
//     </div>
//     <div className={styles.heading}>
//       <h1>Welcome to NaughtyML!</h1>
//       {/* <p>
//           This will be the landing page. Click the link below to go to the app.
//         </p> */}
//       <div className={styles.link}>
//         <Link to="/app">
//           <button>
//             <span>Get started</span>
//           </button>
//         </Link>
//       </div>
//     </div>
//   </div>;
// }

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
