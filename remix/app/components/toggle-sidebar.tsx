import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { useNavStore } from "@/hooks/useNavStore";

export function ToggleLeftSidebar() {
  const isLeftSidebarOpen = useNavStore((state) => state.isLeftSidebarOpen);
  const toggleLeftSidebar = useNavStore((state) => state.toggleLeftSidebar);

  return (
    <div
      className={`${
        isLeftSidebarOpen ? "left-[250px]" : "left-[10px]"
      } fixed top-1/2 z-40 flex h-20 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-[var(--primary-dark)]`}
      onClick={() => toggleLeftSidebar()}
    >
      {isLeftSidebarOpen ? (
        <ChevronLeftIcon color="white" width={20} height={20} />
      ) : (
        <ChevronRightIcon color="white" width={20} height={20} />
      )}
    </div>
  );
}
