import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { useState, type ReactNode } from "react";
import { useCurrentUser } from "@/hooks/auth/currentUser";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("auth_token"),
  );

  const [userId, setUserId] = useState<number | null>(() => {
    const saved = localStorage.getItem("auth_user_id");

    return saved ? Number(saved) : null;
  });

  const { data: user, isLoading: isUserLoading } = useCurrentUser(userId);

  const setSession = (newToken: string, newUserId: number) => {
    localStorage.setItem("auth_token", newToken);
    localStorage.setItem("auth_user_id", String(newUserId));
    setToken(newToken);
    setUserId(newUserId);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user_id");
    setToken(null);
    setUserId(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        user,
        isLoading: Boolean(userId) && isUserLoading,
        logout,
        setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
