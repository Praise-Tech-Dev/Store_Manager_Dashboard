// import { email } from "zod";
import { apiClient } from "../api/axiosInstance";
import type { LoginFormValues, SignupFormValues } from "../validationSchema/authSchema";


export interface LoginResponse {
    token: string;
}

export const authService = {
    login: async (credentials: LoginFormValues): Promise<LoginResponse> => {
        const username = credentials.email.includes('@') ? credentials.email.split('@')[0]
        : credentials.email;


        const response = await apiClient.post<LoginResponse>('/auth/login', {
            username,
            password: credentials.password
        });

        return response.data;
    },

    signup: async (values: SignupFormValues) => {
        const [firstname = "", ...rest] = values.fullName.trim().split(" ");
        const lastname = rest.join(" ") || "User";

        const response = await apiClient.post<{ id: number}>("/users", {
            email: values.email,
            username: values.email.split("@")[0],
            password: values.password,
            name: {
                firstname,
                lastname,
            }
        });
        return response.data;
    }
}