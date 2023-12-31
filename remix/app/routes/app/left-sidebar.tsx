import {
  PlusIcon,
  GearIcon,
  GlobeIcon,
  AvatarIcon,
  ChatBubbleIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { useNavStore } from "@/hooks/useNavStore";
import { Link } from "@remix-run/react";

import { formatISOToDayAndHour } from "@/utils/date";

import styles from "@/routes/app/app.module.css";

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
  const toggleLeftSidebar = useNavStore((state) => state.toggleLeftSidebar);

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_header}>
        <Link className={styles.sidebar_header_title} to="/app">
          HyperChat
        </Link>
        <DoubleArrowLeftIcon
          color="white"
          width={20}
          height={20}
          onClick={() => toggleLeftSidebar()}
        />
      </div>
      <div className={styles.sidebar_center_container}>
        <div className={styles.sidebar_nav_container}>
          {NavItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={styles.sidebar_nav_item}
            >
              {item.icon}
            </Link>
          ))}
        </div>
        <div className={styles.sidebar_chats_container}>
          {recentChats.map((chat) => {
            return (
              <Link
                key={chat.id}
                className={styles.recent_chat}
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
