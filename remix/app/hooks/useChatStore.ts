import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Character, Message, Chat } from "drizzle/model";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface ChatState {
  isStreaming: boolean;
  chat: Chat | undefined;
  character: Character | undefined;
  messages: Message[];
}

interface ChatMethods {
  setStreaming: (nextState: boolean) => void;
  setChat: (chat: Chat) => void;
  setCharacter: (character: Character) => void;
  setMessages: (state: Message[]) => void;
  addToMessages: (message: Message) => void;
  appendTokenToLastMessage: (token: string) => void;
}

// the store is a combination of state and methods
type ChatStore = ChatState & ChatMethods;

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set) => ({
        chat: undefined,
        setChat: (chat: Chat) => set({ chat: chat }),

        character: undefined,
        setCharacter: (character: Character) => set({ character: character }),

        isStreaming: false,
        setStreaming: (state) => set({ isStreaming: state }),

        messages: [],
        setMessages: (state: Message[]) => set({ messages: state }),
        addToMessages: (message: Message) =>
          set((state) => ({
            messages: [...state.messages, message],
          })),
        appendTokenToLastMessage: (token: string) =>
          set((state) => {
            const newHistory = [...state.messages];

            if (newHistory.length > 0) {
              const lastMessage = newHistory[newHistory.length - 1];

              newHistory[newHistory.length - 1] = {
                ...lastMessage,
                content: lastMessage.content + token,
              };
            }

            return { messages: newHistory };
          }),
      }),
      {
        name: "conversation-store",
      },
    ),
  ),
);
