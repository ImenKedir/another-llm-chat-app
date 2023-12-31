import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Chat } from "drizzle/model";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface NavState {
  isLeftSidebarOpen: boolean;
  recentChats: Chat[];
}

interface NavMethods {
  toggleLeftSidebar: () => void;
  setRecentChats: (chats: Chat[]) => void;
}

// the store is a combination of state and methods
type NavStore = NavState & NavMethods;

export const useNavStore = create<NavStore>()(
  devtools(
    persist(
      (set) => ({
        isLeftSidebarOpen: false,
        toggleLeftSidebar: () =>
          set((state) => ({
            isLeftSidebarOpen: !state.isLeftSidebarOpen,
          })),

        recentChats: [],
        setRecentChats: (chats: Chat[]) =>
          set((state) => ({
            recentChats: chats,
          })),
      }),
      {
        name: "nav-store",
      },
    ),
  ),
);
