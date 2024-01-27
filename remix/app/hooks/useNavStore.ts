import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type {} from "@redux-devtools/extension"; // required for devtools typing

interface NavState {
  isLeftSidebarOpen: boolean;
}

interface NavMethods {
  toggleLeftSidebar: () => void;
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
      }),
      {
        name: "nav-store",
      },
    ),
  ),
);
