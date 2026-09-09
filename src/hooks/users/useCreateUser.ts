import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserDTO, DashboardUser } from "../../types/user";
import { userService } from "../../services/userService";
import { USER_KEYS } from "./userKeys";
import { toast } from "react-toastify";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateUserDTO) => userService.createUser(payload),
    onSuccess: (newUser) => {
      queryClient.setQueryData<DashboardUser[]>(USER_KEYS.all, (old = []) => [
        newUser,
        ...old,
      ]);
      toast.success(`User ${newUser.name.firstname} created successfully`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create user');
    },
  });

};