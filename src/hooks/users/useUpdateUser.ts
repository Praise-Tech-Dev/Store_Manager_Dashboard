import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DashboardUser, UpdateUserDTO } from "../../types/user";
import { userService } from "../../services/userService";
import { USER_KEYS } from "./userKeys";
import { toast } from "react-toastify";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDTO }) =>
      userService.updateUser(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: USER_KEYS.all });
      const previousUsers = queryClient.getQueryData<DashboardUser[]>(
        USER_KEYS.all,
      );

      queryClient.setQueryData<DashboardUser[]>(USER_KEYS.all, (old = []) =>
        old.map((user) => (user.id === id ? { ...user, ...data } : user)),
      );

      return { previousUsers };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_KEYS.all, context.previousUsers);
      }
      toast.error("Failed to update user");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
    onSuccess: () => {
      toast.success("User updated successfully");
    },
  });
};
