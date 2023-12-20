import { useState } from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import styles from "@/routes/app.chat/chat.module.css";

export function loader() {
  return json({ infrence_api_url: process.env.INFRENCE_API_URL });
}

export default function Chat() {
  const data = useLoaderData<typeof loader>();

  const [streamingResponse, setStreamingResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function SendMessage(event: React.FormEvent) {
    event.preventDefault();
    setStreamingResponse("");
    setIsLoading(true);

    // get the query from the form
    const prompt = new FormData(event.target as HTMLFormElement).get("prompt");
    if (!prompt || typeof prompt !== "string") {
      console.error("prompt is empty or not a string.");
      return;
    }

    // send the query to the streaming infrence api
    const url = `${
      data.infrence_api_url
    }/completion?prompt=${encodeURIComponent(prompt)}`;
    const sse = new EventSource(url, { withCredentials: true });

    // handle incoming tokens
    sse.addEventListener("message", (event) => {
      const token = JSON.parse(event.data).text as string;
      setStreamingResponse(
        (prevStreamingResponse) => prevStreamingResponse + token,
      );
    });

    sse.addEventListener("error", (event) => {
      console.log("error: ", event);
      setIsLoading(false);
      sse.close();
    });
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={SendMessage}>
        <input type="text" name="prompt" placeholder="Enter your query" />
        <button disabled={isLoading} type="submit">
          Ask
        </button>
      </Form>
      <div style={{ backgroundColor: "white" }}>{streamingResponse}</div>
    </div>
  );
}
