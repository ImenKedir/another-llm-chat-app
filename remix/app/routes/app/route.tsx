import { requireAuth } from "@/sessions.server";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getRecentChats } from "drizzle/model";

import { useEffect } from "react";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import { useNavStore } from "@/hooks/useNavStore";
import { AnimatePresence, motion } from "framer-motion";

import styles from "@/routes/app/app.module.css";

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
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.main 
          className={styles.app_animation_container}
          key={useLocation().pathname}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
