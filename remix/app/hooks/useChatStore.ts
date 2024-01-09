import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Character, Message, Chat } from "drizzle/model";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface ChatState {
  chat?: Chat;
  messages: Message[];
  character?: Character;
  isStreaming: boolean;
  tags: string[];
}

interface ChatMethods {
  setChat: (chat: Chat) => void;
  setMessages: (state: Message[]) => void;
  setCharacter: (character: Character) => void;
  addToMessages: (message: Message) => void;
  appendTokenToLastMessage: (token: string) => void;
  setStreaming: (nextState: boolean) => void;

  setTags: (tags: string[]) => void;
  addTag: (tag: string) => void;
}

export const useChatStore = create<ChatState & ChatMethods>()(
  devtools(
    persist(
      (set) => ({
        chat: undefined,
        setChat: (chat: Chat) => set({ chat: chat }),

        character: undefined,
        setCharacter: (character: Character) => set({ character: character }),

        isStreaming: false,
        setStreaming: (state) => set({ isStreaming: state }),

        tags: [],
        setTags: (tags: string[]) => set({ tags: tags }),
        addTag: (tag: string) =>
          set((state) => ({
            tags: [...state.tags, tag],
          })),

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
