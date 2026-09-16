import { UserProfileMenu } from "@/components/users/UserProfileMenu"
import { Notification, type NotificationsProps } from "./Notification";

export const TopNav = ({hasUnreadNotification =true, isLoading = false } : NotificationsProps) => {

    return (
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center">
          {/* Global Search */}
        </div>
        {/* notifications and user profile  */}
        <div className="flex items-center gap-4">
          {/* NotificationBell */}
          <Notification hasUnreadNotification={hasUnreadNotification} isLoading={isLoading} />
          <UserProfileMenu />
        </div>
      </header>
    );
}