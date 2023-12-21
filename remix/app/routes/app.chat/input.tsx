import { useState } from "react";
import { Form } from "@remix-run/react";
import { EnterIcon } from "@radix-ui/react-icons";
import styles from "@/routes/app.chat/app.chat.module.css";

export function Input() {
  const [streamingResponse, setStreamingResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function SendMessage(event: React.FormEvent) {
    // event.preventDefault();
    // setStreamingResponse("");
    // setIsLoading(true);
    // // get the query from the form
    // const prompt = new FormData(event.target as HTMLFormElement).get("prompt");
    // if (!prompt || typeof prompt !== "string") {
    //   console.error("prompt is empty or not a string.");
    //   return;
    // }
    // // send the query to the streaming infrence api
    // const url = `${
    //   data.infrence_api_url
    // }/completion?prompt=${encodeURIComponent(prompt)}`;
    // const sse = new EventSource(url, { withCredentials: true });
    // // handle incoming tokens
    // sse.addEventListener("message", (event) => {
    //   const token = JSON.parse(event.data).text as string;
    //   setStreamingResponse(
    //     (prevStreamingResponse) => prevStreamingResponse + token,
    //   );
    // });
    // sse.addEventListener("error", (event) => {
    //   console.log("error: ", event);
    //   setIsLoading(false);
    //   sse.close();
    // });
  }

  return (
    <div className={styles.chat_input_container}>
      <Form className={styles.chat_input_form} onSubmit={SendMessage}>
        <input type="text" name="prompt" placeholder="Enter a prompt"></input>
        <button disabled={isLoading} type="submit">
          <EnterIcon color="white" width={20} height={20} />
        </button>
      </Form>
      <div>{streamingResponse}</div>
    </div>
  );
}
