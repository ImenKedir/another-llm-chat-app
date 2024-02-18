import { Link, NavLink, useLoaderData } from "@remix-run/react";
import { useNavStore } from "@/hooks/useNavStore";
import { formatISOToDayAndHour } from "@/utils/date";
import { formatS3ImageUrl } from "@/utils/s3";
import { cn } from "@/utils/cn";

import type { LoaderData } from "./route";

import {
  PlusIcon,
  GearIcon,
  GlobeIcon,
  ChatBubbleIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";

function IconWrapper(Icon: typeof GearIcon) {
  return function (active: boolean) {
    return <Icon color={active ? "black" : "white"} width={25} height={25} />;
  };
}

const NavItems = [
  {
    icon: IconWrapper(GlobeIcon),
    link: "/app/explore",
  },
  {
    icon: IconWrapper(ChatBubbleIcon),
    link: "/app/chats",
  },
  {
    icon: IconWrapper(PlusIcon),
    link: "/app/create",
  },
];

export function LeftSidebar() {
  const data = useLoaderData<LoaderData>();
  const toggleLeftSidebar = useNavStore((state) => state.toggleLeftSidebar);

  return (
    <div className="relative z-[1] flex h-full min-w-[250px] flex-col bg-[var(--primary-dark)]">
      <header className="flex h-[60px] w-full items-center bg-[var(--primary-dark)] pl-4 ">
        <Link className="font-[Geist] text-xl text-white" to="/">
          NaughtyML <span className="text-sm font-[Geist-Light] text-violet-500	">{"[Beta]"}</span>
        </Link>
        <DoubleArrowLeftIcon
          className="absolute right-0 mr-4 cursor-pointer md:hidden"
          color="white"
          width={20}
          height={20}
          onClick={() => toggleLeftSidebar()}
        />
      </header>
      <div className="flex h-full w-full pt-2">
        <div className="flex h-full w-[80px] flex-col items-center gap-4">
          {NavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className={({ isActive }) =>
                cn(
                  "flex h-[40px] w-[40px] items-center justify-center rounded-full",
                  isActive && "bg-white",
                )
              }
            >
              {({ isActive }) => item.icon(isActive)}
            </NavLink>
          ))}
        </div>
        <div className="flex h-full w-full flex-col gap-2 overflow-y-hidden text-white">
          {data.recentChats.map((chat) => {
            return (
              <div key={chat.id} className="w-full px-2 pb-2">
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "flex w-full cursor-pointer flex-col items-start gap-2 rounded px-2 pb-2 font-[Geist]",
                      isActive && "bg-white text-black",
                    )
                  }
                  to={`/app/chat/${chat.character}/${chat.id}`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={formatS3ImageUrl(
                          chat.characterImage || "",
                          data.bucket,
                          "sm",
                        )}
                      />
                      <AvatarFallback>
                        {chat.characterName || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1>{chat.title}</h1>
                      <p className="text-sm text-[var(--quadrary-dark)]">
                        {formatISOToDayAndHour(chat.created)}
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
