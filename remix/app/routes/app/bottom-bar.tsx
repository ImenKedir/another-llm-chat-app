import {
  PlusIcon,
  GearIcon,
  GlobeIcon,
  ChatBubbleIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Link, NavLink } from "@remix-run/react";
import { cn } from "@/utils/cn";

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

export function BottomBar() {
  return (
    <div>
      <div className="flex h-full w-full flex-row items-center justify-between border border-white px-6 py-6">
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
    </div>
  );
}
