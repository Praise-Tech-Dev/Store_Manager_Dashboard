import { useQuery } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import { USER_KEYS } from "./userKeys";

export const useDashboardUsers = () => {
  return useQuery({
    queryKey: USER_KEYS.all,
    queryFn: userService.fetchDashboardUsers,
    staleTime: 1000 * 60 * 5,
  });
};
