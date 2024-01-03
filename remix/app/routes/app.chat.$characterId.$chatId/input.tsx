import { useChatStore } from "@/hooks/useChatStore";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";

import { Form } from "@remix-run/react";
import { Textarea } from "@/components/shadcn/textarea";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface InputProps {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Input({ sendMessage }: InputProps) {
  useAutoResizeTextarea("chat-input");

  const isStreaming = useChatStore((state) => state.isStreaming);

  return (
    <Form
      className="sticky bottom-0 flex w-full max-w-[720px] flex-col items-center justify-center gap-4 px-4 pb-4"
      onSubmit={sendMessage}
    >
      <button
        className="flex h-[30px] w-[30px] items-center justify-center self-end rounded-full bg-white"
        style={{ opacity: isStreaming ? "50%" : "100%" }}
        disabled={isStreaming}
        type="submit"
      >
        <ArrowUpIcon color="black" width={20} height={20} />
      </button>
      <Textarea
        id="chat-input"
        name="userInput"
        placeholder="*Describe your actions in asterisks*, Or just type something."
      />
    </Form>
  );
}
