import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { authService, type LoginResponse } from "../services/auth.services";
import type { AxiosError } from "axios";
import type { LoginFormValues, SignupFormValues } from "../validationSchema/authSchema";
import { toast } from "react-toastify";

interface DecodedToken {
  sub: number;
  user: string;
  iat: number;
}

export const useLoginMutation = () => {
    const navigate =useNavigate();

    return useMutation<
      LoginResponse,
      AxiosError<{ message?: string }>,
      LoginFormValues
    >({
      mutationFn: (data: LoginFormValues) => authService.login(data),
      onSuccess: (data) => {
        const payload: DecodedToken = JSON.parse(atob(data.token.split('.')[1]));
        const userId = payload.sub;

        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_user_id", String(userId));
        toast.success("Welcome back! Signed in successfully.");
        navigate("/dashboard", { replace: true });
      },
      onError: (error) => {
        const data = error.response?.data;
        const message =
          (typeof data === "string" ? data : data?.message) ||
          error.message ||
          "Invalid credentials. Please try again.";

        toast.error(message);
      },
    });
}

export const useSignupMutation = () => {
    const navigate = useNavigate();

    return useMutation<{id : number}, AxiosError<{ message ?: string}>, SignupFormValues>({
      mutationFn: (data: SignupFormValues) => authService.signup(data),

      onSuccess: () => {
        toast.success("Account created successfully! Please sign in.");
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        const message =
          error.response?.data?.message ||
          "Registration failed. Please try again.";
        toast.error(message);
      },
    });
}