import { Bell } from "lucide-react";

export interface NotificationsProps {
  hasUnreadNotification?: boolean;
  isLoading?: boolean;
}

export const Notification = ({
  hasUnreadNotification = true,
  isLoading = false,
}: NotificationsProps) => {
  if (isLoading) {
    return (
      <div
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center"
      >
        <span className="h-4 w-4 animate-pulse rounded-full bg-slate-200" />
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label="View notifications"
      className="group relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-slate-50 focus:outline-none"
    >
      <Bell className="h-4 w-4 text-text-gray transition-colors group-hover:text-slate-700" />

      {hasUnreadNotification && (
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-danger ring-2 ring-white"
        />
      )}
    </button>
  );
};
