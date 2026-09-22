import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { SuspendUserPayload } from "../../types/suspendUserPayload.types"
import { userService } from "@/services/userService";
import { USER_KEYS } from "./userKeys";
import type { DashboardUser } from "@/types/user.types";
import { toast } from "react-toastify";

export const useSuspendUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, reason, notifyUser }: SuspendUserPayload) =>
        userService.updateUser(id, { status: "Suspended" }),

      onMutate: async ({ id }) => {
        await queryClient.cancelQueries({ queryKey: USER_KEYS.all });

        const previousUsers = queryClient.getQueryData<DashboardUser[]>(
          USER_KEYS.all,
        );

        queryClient.setQueryData<DashboardUser[]>(USER_KEYS.all, (old = []) =>
          old.map((user) =>
            user.id === id ? { ...user, status: "Suspended" } : user,
          ),
        );

        return { previousUsers };
      },
      onError: (_err, _variables, context) => {
        if (context?.previousUsers) {
          queryClient.setQueryData(USER_KEYS.all, context.previousUsers);
        }
        toast.error("Failed to suspend account");
      },

      // onSettled: () => {
      //   queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
      // },

      onSuccess: () => {
        toast.success("Account suspended successfully.")
      },
    });
}