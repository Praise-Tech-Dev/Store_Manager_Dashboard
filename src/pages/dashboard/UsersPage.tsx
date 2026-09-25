import Button from "@/components/shared/Button";
import { SearchInput } from "@/components/shared/SearchInput";
import { UserKPIs } from "@/components/users/UserKPIs";
import { UserTable } from "@/components/users/UserTable";
import { useDashboardUsers, useUnsuspendUser } from "@/hooks/users";
import { useUserTableFilters } from "@/hooks/users/useUserTableFilters";
import type { UserRole } from "@/types/user.types";
import { exportUsersToCSV } from "@/utils/exportCsv";
import { Download, UserPlus } from "lucide-react";
import type { DashboardUser } from "@/types/user.types";
import { useState } from "react";
import { EditUserModal } from "@/components/users/modals/EditUserModal";
import { DeleteUserModal } from "@/components/users/modals/DeleteUserModal";
import { SuspendUserModal } from "@/components/users/modals/SuspendUserModal";
import { useAuth } from "@/hooks/auth/useAuth";
import { toast } from "react-toastify";


type ActiveModal =
  | { type: "edit"; user: DashboardUser }
  | { type: "suspend"; user: DashboardUser }
  | { type: "delete"; user: DashboardUser }
  | null;

export const UsersPage = () => {
  const { data: allUsers = [], isLoading, error } = useDashboardUsers();
  const { user: currentUser} = useAuth();
  const { mutate: updateUser} = useUnsuspendUser();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const {
    searchTerm,
    setSearchTerm,
    selectedRole,
    setRole,
    currentPage,
    setPage,
    totalPages,
    totalItems,
    pageSize,
    paginatedUsers,
    clearFilters,
  } = useUserTableFilters(allUsers);

  const totalUsers = allUsers.length;
  
  const handleOpenSuspend = (targetUser: DashboardUser) => {
    if (currentUser?.id === targetUser.id){
      toast.error("Security Restriction: You cannot suspend your own account.");
      return;
    }

    if (currentUser?.role !== "Admin") {
      toast.error("Unauthorized Only administrators can suspend accounts.");
      return;
    }
    setActiveModal({ type: "suspend", user: targetUser });
  };

  const handleOpenDelete = (targetUser: DashboardUser) => {
    if (currentUser?.id === targetUser.id) {
      toast.error("Security Restriction: You cannot delete your own account.");
    }
    if (currentUser?.role !== "Admin") {
      toast.error("Unauthorized Only administrators can delete accounts.");
      return;
    }
    setActiveModal({ type: "delete", user: targetUser });
  }

  const handleUnsuspend = (targetUser: DashboardUser) => {
    updateUser(targetUser.id);
  }
  // Check if any filter is currently active
  const isFiltered = Boolean(searchTerm.trim() || selectedRole !== "All");
  // if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="space-y-6 p-8">
      {/* Top Header Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[32px] font-bold tracking-[-0.64px] leading-10 text-slate-900">
            Users
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Manage team accounts, assign roles, and audit security permissions.
          </p>
        </div>

        <div className="flex gap-3 shrink-0 items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            iconLeft={<Download className="h-4 w-4" />}
            onClick={() => exportUsersToCSV(allUsers)}
            disabled={isLoading || totalUsers === 0}
          >
            Export CSV
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            iconLeft={<UserPlus className="h-4 w-4" />}
            onClick={() => console.log("Open Add User Modal")}
          >
            Add User
          </Button>
        </div>
      </div>
      {/*  Header & KPI Metrics */}
      <UserKPIs users={allUsers} isLoading={isLoading} />

      {/* Controls Toolbar: Search & Role Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-80">
          <SearchInput
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Filter by role:
          </span>
          <select
            value={selectedRole}
            onChange={(e) => setRole(e.target.value as UserRole | "All")}
            className="rounded-xl border border-transparent bg-[#F3F4F6]/80 px-3 py-2 text-xs font-medium text-slate-700 outline-none transition hover:border-slate-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
      </div>
      <UserTable
        users={paginatedUsers}
        loading={isLoading}
        pagination={{
          currentPage,
          totalPages: totalPages,
          totalItems: totalItems,
          pageSize,
          onPageChange: setPage,
        }}
        onEdit={(user) => setActiveModal({ type: "edit", user })}
        onSuspend={handleOpenSuspend}
        onUnsuspend={handleUnsuspend}
        onDelete={handleOpenDelete}
        onClearFilters={isFiltered ? clearFilters : undefined}
      />

      {/* Modals */}
      {activeModal?.type === "edit" && (
        <EditUserModal
          user={activeModal.user}
          isOpen={true}
          onClose={() => setActiveModal(null)}
          onRequestDelete={(user) => setActiveModal({ type: "delete", user })}
          existingEmails={allUsers
            .filter((u) => u.id !== activeModal?.user.id)
            .map((u) => u.email)}
        />
      )}

      {activeModal?.type === "delete" && (
        <DeleteUserModal
          user={activeModal.user}
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal?.type === "suspend" && (
        <SuspendUserModal
          user={activeModal.user}
          isOpen={true}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};