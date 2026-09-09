import { useDashboardUsers } from "@/hooks/users";

// test for fetching users
export const DashboardPage = () => {
  const { data: users, isLoading, error } = useDashboardUsers();

  console.log("Enriched Users:", users);

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-96">
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
};
