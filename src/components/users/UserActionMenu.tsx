import { useState } from "react";
import { Edit2, MoreVertical, Trash2, UserX } from "lucide-react";
import type { DashboardUser } from "@/types/user.types";

interface UserActionMenuProps {
  user: DashboardUser;
  isNearBottom: boolean;
  onEdit: (user: DashboardUser) => void;
  onSuspend: (user: DashboardUser) => void;
  onDelete: (user: DashboardUser) => void;
}

export const UserActionMenu = ({
  user,
  isNearBottom,
  onEdit,
  onSuspend,
  onDelete,
}: UserActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />

          <div
            className={`absolute right-0 z-50 w-44 rounded-xl border border-slate-100 bg-white py-1 shadow-xl ${
              isNearBottom
                ? "bottom-full mb-1 origin-bottom-right"
                : "mt-1 origin-top-right"
            }`}
          >
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onEdit(user);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <Edit2 className="h-3.5 w-3.5 text-slate-400" />
              Edit Details
            </button>

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onSuspend(user);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-amber-600 hover:bg-amber-50"
            >
              <UserX className="h-3.5 w-3.5 text-amber-500" />
              Suspend Account
            </button>

            <div className="my-1 border-t border-slate-100" />

            <button
              type="button"
              onClick={() => {
                closeMenu();
                onDelete(user);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
            >
              <Trash2 className="h-3.5 w-3.5 text-rose-500" />
              Delete User
            </button>
          </div>
        </>
      )}
    </div>
  );
};
