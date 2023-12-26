import { useEffect } from "react";
import { Form } from "@remix-run/react";
import { useConversationStore } from "@/hooks/useConversationStore";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import styles from "@/routes/app.chat/app.chat.module.css";

import type { Message } from "@/hooks/useConversationStore";

export function Input() {
  const {
    isStreaming,
    streamedResponse,
    setIsStreaming,
    updateStreamedResponse,
    clearStreamedResponse,
    addToChatHistory,
  } = useConversationStore();

  useEffect(() => {
    // This will resize the textarea as the user types
    function handleTextareaInputResize() {
      const textarea = document.getElementById("chat-input");
      textarea?.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    }
    handleTextareaInputResize(); // run once on mount
  }, []);

  function SendMessage(event: React.FormEvent) {
    event.preventDefault(); // normally the form hits the remix server action
    setIsStreaming(true);

    // get the query from the form submission
    const prompt = new FormData(event.target as HTMLFormElement).get("prompt");
    if (!prompt || typeof prompt !== "string") {
      console.error("prompt is empty or not a string.");
      return;
    }

    // clear the prev streamed response
    if (streamedResponse.length > 0) {
      console.log("streamedResponse: ", streamedResponse);
      const aiMessage: Message = {
        id: Date.now().toString(),
        author: "ai",
        content: streamedResponse,
      };
      addToChatHistory(aiMessage);
      clearStreamedResponse();
    }
    // add the user prompt to the chat history
    addToChatHistory({
      id: Date.now().toString(),
      author: "user",
      content: prompt,
    });

    // start the event stream
    const sse = new EventSource(
      `/completion/openrouter?prompt=${encodeURIComponent(prompt)}`,
      { withCredentials: true },
    );

    // handle incoming tokens
    sse.addEventListener("message", (event) => {
      const token = event.data as string;
      if (token === "[DONE]") {
        setIsStreaming(false);
        sse.close();
      } else {
        updateStreamedResponse(token);
      }
    });

    sse.addEventListener("error", (event) => {
      console.log("error: ", event);
      setIsStreaming(false);
      sse.close();
    });
  }

  return (
    <Form className={styles.chat_input_form} onSubmit={SendMessage}>
      <button type="submit">
        <ArrowUpIcon color="black" width={20} height={20} />
      </button>
      <textarea id="chat-input" name="prompt" placeholder="Enter a prompt" />
    </Form>
  );
}
