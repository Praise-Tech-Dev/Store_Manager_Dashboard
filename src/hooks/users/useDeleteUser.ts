import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../services/userService";
import type { DashboardUser } from "../../types/user.types";
import { USER_KEYS } from "./userKeys";
import { toast } from "react-toastify";
import { useAuth } from "../auth/useAuth";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  return useMutation({
    mutationFn: async(id: number) => {
      // Guard against self deletion 
      if (currentUser?.id === id){
        throw new Error("Action Prohibited:  You cannot delete your own account.");
      }

      // Guard against unauthorized users 
      if (currentUser?.role !== "Admin" || currentUser?.status ==="Suspended"){
        throw new Error("Unauthorized: Only active administrators can delete accounts.");
      }

    return userService.deleteUser(id);
    },

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: USER_KEYS.all });
      const previousUsers = queryClient.getQueryData<DashboardUser[]>(
        USER_KEYS.all,
      );

      queryClient.setQueryData<DashboardUser[]>(USER_KEYS.all, (old = []) =>
        old.filter((user) => user.id !== id),
      );

      return { previousUsers };
    },
    onError: (err: Error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_KEYS.all, context.previousUsers);
      }
      toast.error(err.message || "Failed to delete user");
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    // },
    onSuccess: () => {
      toast.success("User deleted successfully");
    },
  });
};
