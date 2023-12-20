import { createContext } from "react";

interface SidebarVisibleType {
  sidebarVisible: boolean;
  setSidebarVisible: (value: boolean) => void;
}

export const SidebarVisibleContext = createContext<
  SidebarVisibleType | undefined
>(undefined);
