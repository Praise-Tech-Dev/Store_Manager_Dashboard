import type { DashboardUser } from "@/types/user.types";
import { useAuth } from "../auth/useAuth";


export const useUserPermissions = (targetUser?: DashboardUser | null) => {
    const { user: currentUser } = useAuth();

    const isSelf = Boolean(
        currentUser?.id && targetUser?.id && currentUser.id === targetUser.id
    );
    const isAdmin = currentUser?.role === "Admin";

    return {
        isSelf,
        isAdmin,
        canEdit: isAdmin,
        canSuspend: isAdmin && !isSelf,
        canDelete: isAdmin && !isSelf,
        canChangeRoleStatus: isAdmin && !isSelf,
    }
}