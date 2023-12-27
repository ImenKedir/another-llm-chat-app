import { v4 as uuidv4 } from "uuid";
import { useConversationStore } from "@/hooks/useConversationStore";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { Form } from "@remix-run/react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import styles from "@/routes/app.chat.$characterId/app.chat.module.css";


export function Input() {
  useAutoResizeTextarea("chat-input");
  // sets the streaming state to let other components know if we are streaming
  const setStreaming = useConversationStore((state) => state.setStreaming);
  // adds a token to the last message in the conversation history
  const appendToLastMessage = useConversationStore(
    (state) => state.appendToLastMessage,
  );
  // adds a message to the conversation history
  const addToConversationHistory = useConversationStore(
    (state) => state.addToConversationHistory,
  );

  function SendMessage(event: React.FormEvent) {
    event.preventDefault(); // normally the event hits the remix server action
    setStreaming(true); // but we want to add our own lil streaming logic

    // get the message from the form submission
    const message = new FormData(event.target as HTMLFormElement).get(
      "message",
    );
    if (!message || typeof message !== "string") {
      console.error("prompt is empty or not a string.");
      return;
    }

    // add the user message to the chat history
    addToConversationHistory({
      id: uuidv4(),
      author: "user",
      content: message,
      created: new Date().toISOString(),
      conversation: uuidv4(),
    });

    // add the ai message to the chat history
    addToConversationHistory({
      id: uuidv4(),
      author: "ai",
      content: "", // we will stream the content in later
      created: new Date().toISOString(),
      conversation: uuidv4(),
    });

    // start the event stream
    const sse = new EventSource(
      `/completion/openrouter?prompt=${encodeURIComponent(message)}`,
      { withCredentials: true },
    );

    // handle incoming tokens
    sse.addEventListener("message", (event) => {
      const token = event.data as string;
      if (token !== "[DONE]") {
        appendToLastMessage(token);
      } else {
        sse.close();
        setStreaming(false);
      }
    });

    // handle errors
    sse.addEventListener("error", (event) => {
      console.log("error: ", event);
      sse.close();
      setStreaming(false);
    });
  }

  return (
    <Form className={styles.chat_input_form} onSubmit={SendMessage}>
      <button type="submit">
        <ArrowUpIcon color="black" width={20} height={20} />
      </button>
      <textarea
        id="chat-input"
        name="message"
        placeholder="*Describe your actions in asterisks*, Or just type something."
      />
    </Form>
  );
}
