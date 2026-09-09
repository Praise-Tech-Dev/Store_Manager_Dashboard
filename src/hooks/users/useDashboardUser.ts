import { useQuery } from "@tanstack/react-query";
import { USER_KEYS } from "./userKeys";
import { userService } from "../../services/userService";

export const useDashboardUser = (id: number) => {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => userService.fetchDashboardUserById(id),
    enabled: Boolean(id),
  });
};
