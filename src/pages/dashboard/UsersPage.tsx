import { SearchInput } from "@/components/shared/SearchInput";
import { UserKPIs } from "@/components/users/UserKPIs";
import { UserTable } from "@/components/users/UserTable";
import { useDashboardUsers } from "@/hooks/users";
import { useUserTableFilters } from "@/hooks/users/useUserTableFilters";
import type { UserRole } from "@/types/user.types";
// import type { DashboardUser } from "@/types/user.types";


// type ActiveModal =
//   | { type: "edit"; user: DashboardUser }
//   | { type: "suspend"; user: DashboardUser }
//   | { type: "delete"; user: DashboardUser }
//   | null;

export const UsersPage = () => {
  const { data: allUsers = [], isLoading, error } = useDashboardUsers();
  // const [_activeModal, setActiveModal] = useState<ActiveModal>(null);

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

  // const totalUsers = allUsers.length;
  

  // Check if any filter is currently active
  const isFiltered = Boolean(searchTerm.trim() || selectedRole !== "All");
  // if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-[32px] font-bold tracking-[-0.64px] leading-10">
        Users
      </h1>
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
        // onEdit={(user) => setActiveModal({ type: "edit", user })}
        // onSuspend={(user) => setActiveModal({ type: "suspend", user })}
        // onDelete={(user) => setActiveModal({ type: "delete", user })}
        onEdit={(user) => console.log("Edit", user)}
        onSuspend={(user) => console.log("Suspend", user)}
        onDelete={(user) => console.log("Delete", user)}
        onClearFilters={isFiltered ? clearFilters : undefined}
      />

      {/* Modals controlled by activeModal */}
    </div>
  );
};;
