import { getSession } from "@/sessions.server";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";

import { useState } from "react";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LeftSidebar } from "@/routes/app/left-sidebar";
import { LeftSidebarVisibleContext } from "@/contexts/LeftSidebarVisibleContext";
import styles from "@/routes/app/app.module.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = getSession(request.headers.get("Cookie")).then((session) =>
    session.get("userId"),
  );

  if (!userId) {
    return redirect("/login");
  }

  return json({
    userId: userId,
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  const [sidebarVisible, setSidebarVisible] = useState(false);

  console.log(data);

  return (
    <div className={styles.app_container}>
      <LeftSidebarVisibleContext.Provider
        value={{ sidebarVisible, setSidebarVisible }}
      >
        {sidebarVisible && <LeftSidebar />}
        <Outlet />
      </LeftSidebarVisibleContext.Provider>
    </div>
  );
}
