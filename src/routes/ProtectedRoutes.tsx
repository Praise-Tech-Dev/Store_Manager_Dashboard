import { useAuth } from "@/hooks/auth/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
    const { token, isLoading} = useAuth()
    // const token = localStorage.getItem('auth_token');
    const location = useLocation();

    if (isLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      );
    } 

    if (!token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return <Outlet />
}