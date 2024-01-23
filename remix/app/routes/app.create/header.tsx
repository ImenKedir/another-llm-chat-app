import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import { useChatStore } from "@/hooks/useChatStore";

export function Header() {
  const chat = useChatStore((state) => state.chat);

  return (
    <div>
        <header className="sm:hidden sticky top-0 z-10 flex h-[50px] items-center justify-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)]">
        <h1 className="font-[Geist] text-2xl text-white">Create</h1>
      </header>
      <header className="hidden sticky top-0 z-10 sm:flex h-[50px] items-center justify-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)]">
        <ToggleLeftSidebar />
        <h1 className="font-[Geist] text-2xl text-white">Create</h1>
      </header>
     
    </div>
  );
}
