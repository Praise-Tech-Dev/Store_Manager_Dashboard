import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DashboardUser } from "../../types/user.types";
import { userService } from "../../services/userService";
import { USER_KEYS } from "./userKeys";
import { toast } from "react-toastify";
import { useAuth } from "../auth/useAuth";
import type { UpdateUserPayload } from "@/types/updateUserPayload.types";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateUserPayload) => {
      if (currentUser?.role !== "Admin" || currentUser?.status === "Suspended") {
        throw new Error(
          "Unauthorized: Only active administrators can update users.",
        );
      }
      return userService.updateUser(id, data);
    },
      
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
    onError: (err: Error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(USER_KEYS.all, context.previousUsers);
      }
      toast.error(err.message || "Failed to update user");
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
    // },
    onSuccess: () => {
      toast.success("User updated successfully");
    },
  });
};
