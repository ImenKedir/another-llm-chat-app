import { getSession } from "@/sessions";
import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { destroySession } from "@/sessions";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(
    request.headers.get("Cookie")
  );

 return json({ userId: session.get("userId") }) 
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  if (data.userId) {
    return (
      <div>
        <h1>Signed in as: {data.userId}</h1>
        <Form method="post">
        <button>Logout</button>
      </Form>
      </div>
    )
  }

  return (
    <div>
      <h1>You are not signed in</h1>
      <Link to={"/login"}>click here to login</Link>
    </div>
  )
}

export const action = async ({
  request,
}: ActionFunctionArgs) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};