import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import { AUTH_KEYS } from "./authKeys";

export const useCurrentUser = (userId: number | null) => {
  return useQuery({
    queryKey: AUTH_KEYS.profile_detail(userId ?? 0),
    queryFn: () => userService.fetchDashboardUserById(userId ?? 0),
    staleTime: Infinity,
    gcTime: 60 * 60 * 1000,
  });
};
