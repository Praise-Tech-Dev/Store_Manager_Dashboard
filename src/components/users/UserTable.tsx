import { useMemo } from "react";
import type { DashboardUser } from "@/types/user.types";
import type { Column } from "@/types/table/Column.types";
import type { PaginationConfig } from "@/types/table/PaginationConfig.types";
import { Badge, type BadgeVariant } from "../shared/Badge";
import { Table } from "../shared/table/Table";
import { UserActionMenu } from "./UserActionMenu";

interface UserTableProps {
  users: DashboardUser[];
  loading: boolean;
  pagination?: PaginationConfig;
  onEdit: (user: DashboardUser) => void;
  onSuspend: (user: DashboardUser) => void;
  onDelete: (user: DashboardUser) => void;
}

export const UserTable = ({
  users,
  loading,
  pagination,
  onEdit,
  onSuspend,
  onDelete,
}: UserTableProps) => {
  const columns: Column<DashboardUser>[] = useMemo(
    () => [
      {
        key: "user",
        title: "User",
        render: (user) => {
          const firstInitial = user.name.firstname?.charAt(0) ?? "";
          const lastInitial = user.name.lastname?.charAt(0) ?? "";
          const initials = `${firstInitial}${lastInitial}`.toUpperCase();

          return (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
                {initials}
              </div>
              <div>
                <p className="font-semibold capitalize text-slate-900">
                  {user.name.firstname} {user.name.lastname}
                </p>
                <p className="text-xs text-slate-400">ID: {user.id}</p>
              </div>
            </div>
          );
        },
      },
      {
        key: "email",
        title: "Email",
        render: (user) => <span className="text-slate-500">{user.email}</span>,
      },
      {
        key: "role",
        title: "Role",
        render: (user) => {
          const roleVariant = user.role.toLowerCase() as BadgeVariant;
          return (
            <Badge variant={roleVariant === "admin" ? "admin" : "customer"}>
              {user.role}
            </Badge>
          );
        },
      },
      {
        key: "joinedDate",
        title: "Join Date",
        render: (user) => (
          <span className="text-slate-500">
            {user.joinedDate ?? "2024-01-15"}
          </span>
        ),
      },
      {
        key: "status",
        title: "Status",
        render: (user) => {
          const statusVariant = user.status.toLowerCase() as BadgeVariant;
          return (
            <Badge variant={statusVariant} withDot>
              {user.status}
            </Badge>
          );
        },
      },
      {
        key: "actions",
        title: "Actions",
        className: "text-right",
        render: (user) => {
          const currentIndex = users.findIndex((u) => u.id === user.id);
          const isNearBottom = currentIndex >= users.length - 2;

          return (
            <UserActionMenu
              user={user}
              isNearBottom={isNearBottom}
              onEdit={onEdit}
              onSuspend={onSuspend}
              onDelete={onDelete}
            />
          );
        },
      },
    ],
    [users, onEdit, onSuspend, onDelete],
  );

  return (
    <Table
      columns={columns}
      data={users}
      loading={loading}
      pagination={pagination}
      emptyMessage="No users match your criteria"
    />
  );
};
