import { requireAuth } from "@/sessions.server";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getRecentChats } from "drizzle/model";

import { Outlet, useLoaderData } from "@remix-run/react";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import { useNavStore } from "@/hooks/useNavStore";

import styles from "@/routes/app/app.module.css";
import { useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireAuth(request);
  const recentChats = await getRecentChats(userId);

  return json({
    recentChats: recentChats,
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  const setRecentChats = useNavStore((state) => state.setRecentChats);
  const isLeftSidebarOpen = useNavStore((state) => state.isLeftSidebarOpen);

  useEffect(() => {
    setRecentChats(data.recentChats);
  }, [data.recentChats]);

  return (
    <div className={styles.app_container}>
      {isLeftSidebarOpen && <LeftSidebar />}
      <Outlet />
    </div>
  );
}
