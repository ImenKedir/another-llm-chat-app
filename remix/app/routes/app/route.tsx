import { requireAuth } from "@/sessions.server";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getRecentChats } from "drizzle/model";

import { useEffect } from "react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import { BottomBar } from "@/routes/app/bottom-bar";
import { useNavStore } from "@/hooks/useNavStore";

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
    <div className="flex h-full w-full">
      <div className="hidden sm:flex sm:w-full">
        {isLeftSidebarOpen && <LeftSidebar />}
        <Outlet />

      </div>
      <div className="flex flex-col w-full sm:hidden ">
        <Outlet />
        <BottomBar />
      </div>
      
      
    </div>
  );
}



