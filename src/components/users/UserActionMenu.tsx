// import { useState } from "react";
import { Edit2, MoreVertical, Trash2, UserCheck, UserX } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import type { DashboardUser } from "@/types/user.types";
import { useAuth } from "@/hooks/auth/useAuth";

interface UserActionMenuProps {
  user: DashboardUser;
  // isNearBottom: boolean;
  onEdit: (user: DashboardUser) => void;
  onSuspend: (user: DashboardUser) => void;
  onUnsuspend?: (user: DashboardUser) => void;
  onDelete: (user: DashboardUser) => void;
}

export const UserActionMenu = ({
  user,
  onEdit,
  onSuspend,
  onUnsuspend,
  onDelete,
}: UserActionMenuProps) => {

  const { user: currentUser } = useAuth();

  // To ensure user does not suspend themselves and make actions admin function 
  const isSelf = Boolean(currentUser?.id && currentUser.id === user.id);
  const isCurrentUserSuspended = currentUser?.status === "Suspended";
  const isActiveAdmin = currentUser?.role === "Admin" && !isCurrentUserSuspended;

  // target user check 
  const isTargetSuspended = user.status === "Suspended";

  const canEdit = isActiveAdmin;
  const canToggleSuspendStatus = isActiveAdmin && !isSelf 
  const canDelete = isActiveAdmin && !isSelf;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Actions"
          className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </DropdownMenu.Trigger>

      {/* Renders outside the table DOM into <body> to avoid clipping */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          side="bottom"
          sideOffset={4}
          collisionPadding={12}
          className="z-9999 w-44 rounded-xl border border-slate-100 bg-white py-1 shadow-xl focus:outline-none animate-in fade-in-50"
        >
          {canEdit && (
            <DropdownMenu.Item
              onSelect={() => onEdit(user)}
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 outline-none hover:bg-slate-50 focus:bg-slate-50"
            >
              <Edit2 className="h-3.5 w-3.5 text-slate-400" />
              Edit Details
            </DropdownMenu.Item>
          )}

          {canToggleSuspendStatus &&
            (isTargetSuspended ? (
              <DropdownMenu.Item
                onSelect={() => onUnsuspend?.(user)}
                className="flex cursor-pointer items-center gap-2.5 px-4 py-2 text-xs font-medium text-emerald-600 outline-none hover:bg-emerald-50 focus:bg-emerald-50"
              >
                <UserCheck className="h-3.5 w-3.5 text-emerald-500" />
                Reactivate Account
              </DropdownMenu.Item>
            ) : (
              <DropdownMenu.Item
                onSelect={() => onSuspend(user)}
                className="flex cursor-pointer items-center gap-2.5 px-4 py-2 text-xs font-medium text-amber-600 outline-none hover:bg-amber-50 focus:bg-amber-50"
              >
                <UserX className="h-3.5 w-3.5 text-amber-500" />
                Suspend Account
              </DropdownMenu.Item>
            ))}

          <DropdownMenu.Separator className="my-1 border-t border-slate-100" />

          {canDelete && (
            <DropdownMenu.Item
              onSelect={() => onDelete(user)}
              className="flex cursor-pointer items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 outline-none hover:bg-rose-50 focus:bg-rose-50"
            >
              <Trash2 className="h-3.5 w-3.5 text-rose-500" />
              Delete User
            </DropdownMenu.Item>
          )}

          {isSelf && (
            <div className="px-4 py-1 text-[11px] italic text-slate-400">
              Active Account (You)
            </div>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
