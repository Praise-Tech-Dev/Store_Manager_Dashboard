import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { USER_KEYS } from "./userKeys";
import type { DashboardUser } from "@/types/user.types";
import { toast } from "react-toastify";

export const useUnsuspendUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      userService.updateUser(id, {
        status: "Active",
      } as Partial<DashboardUser>),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: USER_KEYS.all });

      const previousUsers = queryClient.getQueryData<DashboardUser[]>(
        USER_KEYS.all,
      );

      queryClient.setQueryData<DashboardUser[]>(USER_KEYS.all, (old = []) =>
        old.map((user) =>
          user.id === id ? { ...user, status: "Active" } : user,
        ),
      );

      return { previousUsers };
    },

    onError: (_err, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_KEYS.all, context.previousUsers);
      }
      toast.error("Failed to reactivate account");
    },

    onSuccess: () => {
      toast.success("Account reactivated successfully.");
    },
  });
};
