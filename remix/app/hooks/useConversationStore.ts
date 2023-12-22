import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

export interface Message {
  id: string;
  author: "user" | "ai";
  content: string;
}

interface ConversationState {
  chatHistory: Message[];
  isStreaming: boolean;
  streamedResponse: string;
}

interface ConversationMethods {
  setIsStreaming: (nextState: boolean) => void;
  addToChatHistory: (message: Message) => void;
  clearChatHistory: () => void;
  clearStreamedResponse: () => void;
  updateStreamedResponse: (token: string) => void;
}

// the store is a combination of state and methods
type ConversationStore = ConversationState & ConversationMethods;

export const useConversationStore = create<ConversationStore>()(
  devtools(
    persist(
      (set) => ({
        // are we streaming tokens?
        isStreaming: false,
        // toogle the streaming state
        setIsStreaming: (nextState) => set({ isStreaming: nextState }),
        // the last message, seperate from rest of state because it is updated frequently
        streamedResponse: "",
        // clear the streamed response
        clearStreamedResponse: () => set({ streamedResponse: "" }),
        // updates the last message as tokens are streamed in
        updateStreamedResponse: (token) =>
          set((state) => ({
            streamedResponse: state.streamedResponse + token,
          })),
        // the chat history
        chatHistory: [],
        // moves user input and last message to chat history
        addToChatHistory: (message: Message) =>
          set((state) => ({ chatHistory: [...state.chatHistory, message] })),
        // clears the chat history
        clearChatHistory: () => set({ chatHistory: [], streamedResponse: "" }),
      }),
      {
        name: "conversation-store",
      },
    ),
  ),
);
