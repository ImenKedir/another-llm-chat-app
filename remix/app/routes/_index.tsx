import type { MetaFunction, ActionFunctionArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { getCount, incrementCount } from "@/models/counter.server"
import { useLoaderData, useFetcher } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const count = await getCount()
  return json({ count })
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const isIncrementing = fetcher.state !== "idle";

  if (isIncrementing) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1>Incrementing...</h1>
      </div>
    );
  }
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>This site has been visited {data.count} times.</h1>
      <fetcher.Form method="post">
        <button type="submit">
          Increment
        </button>
      </fetcher.Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  await incrementCount()
  return json({ ok: true })
}
