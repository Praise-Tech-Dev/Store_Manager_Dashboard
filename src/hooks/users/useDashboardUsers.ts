import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/user.service";
import { USER_KEYS } from "./userKeys";
import type { UseDashboardUsersParams } from "@/types/users/useDashboardUserParams.types";

export const useDashboardUsers = ({enabled = true}: UseDashboardUsersParams = {}) => {
  return useQuery({
    queryKey: USER_KEYS.all,
    queryFn: userService.fetchDashboardUsers,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};
