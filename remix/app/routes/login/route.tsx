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
      API: Config.API_URL,
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
    <div className="flex h-full w-full items-start justify-center overflow-hidden bg-[var(--background-color)] px-10 pt-[150px] text-white">
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-12 rounded-md border border-[var(--primary-light)] bg-[var(--tertiary-dark)] px-6 py-12 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="font-[Geist-Bold] text-4xl">Welcome Back </h1>
          <p className="text-md">Sign in to continue with NaughtyML</p>
        </div>

        <button className=" rounded-lg bg-white px-[12px] py-[2px] text-black no-underline">
          <Link
            to={data.API + "/auth/google/authorize"}
            className="flex flex-row items-center gap-2 p-2 no-underline"
          >
            <img
              src="/logos/google.png"
              alt="Google Logo"
              className="h-[15px] w-[15px]"
            />
            <p>Continue with Google</p>
          </Link>
        </button>
      </div>
    </div>
  );
}
