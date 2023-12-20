import { createContext } from "react";

interface LeftSidebarVisibleType {
  sidebarVisible: boolean;
  setSidebarVisible: (value: boolean) => void;
}

export const LeftSidebarVisibleContext = createContext<
  LeftSidebarVisibleType | undefined
>(undefined);
