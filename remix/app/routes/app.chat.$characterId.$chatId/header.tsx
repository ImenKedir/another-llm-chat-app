import { ToggleLeftSidebar } from "@/components/toggle-sidebar";
import { useChatStore } from "@/hooks/useChatStore";

export function Header() {
  const chat = useChatStore((state) => state.chat);

  return (
    <div className="relative top-0 flex h-[50px] w-full items-center justify-center bg-black">
      <ToggleLeftSidebar />
      <h1 className="font-[Geist] text-2xl text-white">{chat && chat.title}</h1>
    </div>
  );
}
