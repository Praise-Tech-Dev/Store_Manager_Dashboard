import type { DashboardUser } from "@/types/user.types";

const sanitizeCsvField = (field: string | number | undefined | null): string => {
    const stringified = String(field);

    return `"${stringified.replace(/"/g, '""')}"`;
}   
export const exportUsersToCSV = (users: DashboardUser[], filename= "users_export.csv"): void => {

    if (users.length === 0) return;

    const headers = [
      "User ID",
      "First Name",
      "Last Name",
      "Email",
      "Role",
      "Status",
      "Join Date",
    ];

    const rows = users.map((user) => [
        sanitizeCsvField(user.id),
        sanitizeCsvField(user.name?.firstname),
        sanitizeCsvField(user.name?.lastname),
        sanitizeCsvField(user.email),
        sanitizeCsvField(user.role),
        sanitizeCsvField(user.status),
        sanitizeCsvField(user.joinedDate ?? "N/A"),
    ]);

    const csvRows = [headers.join(","), ...rows.map((row) => row.join(","))];
    const blob = new Blob([csvRows.join("\r\n")], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}