import { UserProfileMenu } from "@/components/users/UserProfileMenu"
import { Notification } from "./Notification";
import type { NotificationsProps } from "@/types/shared/topNav/notification.types";
import { useSidebar } from "@/hooks/sidebar/useSidebar";
import { Menu } from "lucide-react";

export const TopNav = ({hasUnreadNotification =true, isLoading = false } : NotificationsProps) => {
    const { toggleSidebar } = useSidebar();

    return (
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3">
          {/* hamburger icon */}
          <button
            onClick={toggleSidebar}
            className="md:hidden rounded-lg p-2 text-slate-900 hover:bg-slate-100"
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>
          {/* Global Search */}
        </div>
        {/* notifications and user profile  */}
        <div className="flex items-center gap-4">
          {/* NotificationBell */}
          <Notification
            hasUnreadNotification={hasUnreadNotification}
            isLoading={isLoading}
          />
          <UserProfileMenu />
        </div>
      </header>
    );
}