import type { DashboardUser } from "@/types/user.types";
import { createContext} from "react";

export interface AuthContextType {
    token: string | null;
    userId: number | null;
    user: DashboardUser | undefined;
    isLoading: boolean;
    logout: () => void ;
    setSession: (token: string, userId: number) => void;
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

