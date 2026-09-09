
import { Outlet } from "react-router-dom";
import Sidebar from "../components/shared/sidebar/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="ml-16 flex min-w-0 flex-1 flex-col overflow-hidden md:ml-60">
        {/* <TopNav user_data={UserProfileMockData} hasUnreadNotification={true} /> */}
        {/* Only this area scrolls */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-surface-light">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
