import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import type { DashboardUser } from "../../types/user";
import { USER_KEYS } from "./userKeys";
import { toast } from "react-toastify";



export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: USER_KEYS.all });
      const previousUsers = queryClient.getQueryData<DashboardUser[]>(USER_KEYS.all);

      queryClient.setQueryData<DashboardUser[]>(USER_KEYS.all, (old = []) =>
        old.filter((user) => user.id !== id)
      );

      return { previousUsers };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_KEYS.all, context.previousUsers);
      }
      toast.error('Failed to delete user');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    },
    onSuccess: () => {
      toast.success('User deleted successfully');
    },
  })
}