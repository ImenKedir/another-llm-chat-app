import {
  PlusIcon,
  GearIcon,
  GlobeIcon,
  AvatarIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import { useNavStore } from "@/hooks/useNavStore";
import { formatISOToDayAndHour } from "@/utils/date";

const NavItems = [
  {
    icon: <GlobeIcon color="white" width={20} height={20} />,
    link: "/app",
  },
  {
    icon: <ChatBubbleIcon color="white" width={20} height={20} />,
    link: "/app/chats",
  },
  {
    icon: <PlusIcon color="white" width={20} height={20} />,
    link: "/app/create",
  },
  {
    icon: <GearIcon color="white" width={20} height={20} />,
    link: "/app/settings",
  },
  {
    icon: <AvatarIcon color="white" width={20} height={20} />,
    link: "/app/profile",
  },
];

export function LeftSidebar() {
  const recentChats = useNavStore((state) => state.recentChats);

  return (
    <div className="fixed flex h-full w-full flex-col backdrop-blur-md md:relative md:w-[320px]">
      <header className="invisible flex h-[50px] w-full items-center border-b-2 border-[var(--secondary-dark)] bg-[var(--primary-dark)] pl-4 md:visible">
        <Link className="font-[Geist] text-2xl text-white" to="/app">
          HyperChat
        </Link>
      </header>
      <div className="flex h-full w-full pt-2">
        <div className="flex h-full w-[80px] flex-col items-center gap-2">
          {NavItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full"
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll text-white">
          {recentChats.map((chat) => {
            return (
              <Link
                key={chat.id}
                className="flex h-[40px] w-full cursor-pointer items-center px-2 font-[Geist]"
                to={`/app/chat/${chat.character}/${chat.id}`}
              >
                {`${chat.title}, ${formatISOToDayAndHour(chat.created)}`}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
