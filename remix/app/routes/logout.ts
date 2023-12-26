import { destroySession, getSession } from "@/sessions.server";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
