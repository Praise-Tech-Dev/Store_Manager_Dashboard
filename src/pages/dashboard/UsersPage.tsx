import { UserTable } from "@/components/users/UserTable";
import { useDashboardUsers } from "@/hooks/users";
// import type { DashboardUser } from "@/types/user.types";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// type ActiveModal =
//   | { type: "edit"; user: DashboardUser }
//   | { type: "suspend"; user: DashboardUser }
//   | { type: "delete"; user: DashboardUser }
//   | null;

const PAGE_SIZE = 5;

export const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data: allUsers = [], isLoading, error } = useDashboardUsers();
  // const [_activeModal, setActiveModal] = useState<ActiveModal>(null);

  // Computed values needed for pagination
  const totalItems = allUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    return allUsers.slice(startIndex, startIndex + PAGE_SIZE);
  }, [allUsers, page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", newPage.toString());
      return next;
    });
  };
  // console.log("Enriched Users:", users);

  // if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-[32px] font-bold tracking-[-0.64px] leading-10">
        Users
      </h1>
      {/*  Header & KPI Metrics */}

      {/* Controls Toolbar (Search, Role Filter, Export CSV) */}
      <div className="">{/* search  */}</div>

      <UserTable
        users={paginatedUsers}
        loading={isLoading}
        pagination={{
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalItems,
          pageSize: PAGE_SIZE,
          onPageChange: handlePageChange,
        }}
        // onEdit={(user) => setActiveModal({ type: "edit", user })}
        // onSuspend={(user) => setActiveModal({ type: "suspend", user })}
        // onDelete={(user) => setActiveModal({ type: "delete", user })}
        onEdit={(user) => console.log("Edit", user)}
        onSuspend={(user) => console.log("Suspend", user)}
        onDelete={(user) => console.log("Delete", user)}
      />

      {/* Modals controlled by activeModal */}
    </div>
  );
};;
