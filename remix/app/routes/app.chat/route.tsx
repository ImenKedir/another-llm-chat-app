import { json } from "@remix-run/node";
import styles from "@/routes/app.chat/chat.module.css";
import { useLoaderData } from "@remix-run/react";

export function loader() {
  return json({ api_url: process.env.INFRENCE_API_URL });
}

export default function Chat() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <div style={{ display: "hidden" }} className={styles.container}>
      Chat
    </div>
  );
}
