import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useNavStore } from "@/hooks/useNavStore";

export function ToggleLeftSidebar() {
  const isLeftSidebarOpen = useNavStore((state) => state.isLeftSidebarOpen);
  const toggleLeftSidebar = useNavStore((state) => state.toggleLeftSidebar);

  return (
    <div
      className="absolute left-0 flex h-10 w-10 cursor-pointer items-center justify-center"
      onClick={() => toggleLeftSidebar()}
    >
      {isLeftSidebarOpen ? (
        <DoubleArrowLeftIcon color="white" width={20} height={20} />
      ) : (
        <DoubleArrowRightIcon color="white" width={20} height={20} />
      )}
    </div>
  );
}
