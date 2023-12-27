import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Character, Message } from "drizzle/model";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface ConversationState {
  isStreaming: boolean;
  character: Character | undefined;
  conversationHistory: Message[];
}

interface ConversationMethods {
  setStreaming: (nextState: boolean) => void;
  setCharacter: (character: Character) => void;
  addToConversationHistory: (message: Message) => void;
  setConversationHistory: (state: Message[]) => void;
  appendToLastMessage: (token: string) => void;
}

// the store is a combination of state and methods
type ConversationStore = ConversationState & ConversationMethods;

export const useConversationStore = create<ConversationStore>()(
  devtools(
    persist(
      (set) => ({
        // are we streaming tokens?
        isStreaming: false,
        // the character we are talking to
        character: undefined,
        // the conversation history
        conversationHistory: [],
        // toogle the streaming state
        setStreaming: (state) => set({ isStreaming: state }),
        // set the character we are talking to
        setCharacter: (character: Character) => set({ character }),
        // moves user input and last message to chat history
        addToConversationHistory: (message: Message) =>
          set((state) => ({
            conversationHistory: [...state.conversationHistory, message],
          })),
        // clears the chat history
        setConversationHistory: (state: Message[]) =>
          set({ conversationHistory: state }),
        // append a token to the last message (helpful for streaming)
        appendToLastMessage: (token: string) =>
          set((state) => {
            // Make a copy of the current conversation history
            const newHistory = [...state.conversationHistory];

            // Check if there is at least one message in the history
            if (newHistory.length > 0) {
              // Get the last message
              const lastMessage = newHistory[newHistory.length - 1];

              // Update its content
              newHistory[newHistory.length - 1] = {
                ...lastMessage,
                content: lastMessage.content + token,
              };
            }

            // Update the state with the modified history
            return { conversationHistory: newHistory };
          }),
      }),
      {
        name: "conversation-store",
      },
    ),
  ),
);
