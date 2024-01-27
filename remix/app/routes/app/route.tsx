import { requireAuth } from "@/sessions.server";
import { Bucket } from "sst/node/bucket";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getRecentChats } from "drizzle/model";

import { Outlet } from "@remix-run/react";
import { useNavStore } from "@/hooks/useNavStore";

import { BottomBar } from "@/routes/app/bottom-bar";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import { ToggleLeftSidebar } from "@/components/toggle-sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireAuth(request);
  const recentChats = await getRecentChats(userId);

  return json({
    recentChats: recentChats,
    bucket: Bucket.content.bucketName,
  });
}
export type LoaderData = typeof loader;

export default function App() {
  const isLeftSidebarOpen = useNavStore((state) => state.isLeftSidebarOpen);

  return (
    <div className="flex h-full w-full">
      {/* Desktop View */}
      <div className="hidden sm:w-full md:flex">
        {isLeftSidebarOpen && <LeftSidebar />}
        <ToggleLeftSidebar />
        <Outlet />
      </div>
      {/* Mobile View */}
      <div className="flex w-full flex-col md:hidden ">
        <Outlet />
        <BottomBar />
      </div>
    </div>
  );
}
