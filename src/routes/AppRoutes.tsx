import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import AppLayout from "../layout/AppLayout";
import { ProtectedRoute } from "./ProtectedRoutes";
import { UsersPage } from "@/pages/users/UsersPage";
import LoginPage from "@/pages/auth/login/LoginPage";
import SignUpPage from "@/pages/auth/sign-up/SignUpPage";
import ForgotPassword from "@/pages/auth/forgot-password/ForgotPassword";
import { StatisticsPage } from "@/pages/statistics/StatisticsPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("auth_token") ? (
              <Navigate to="/statistics" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* auth pages  */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Navigate to="/sign-up" replace />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* protected routes  */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            {/* dashboard */}
            <Route path="/statistics" element={<StatisticsPage />} />
            {/* user management  */}
            <Route path="/users" element={<UsersPage />} />
            {/* product catalogue  */}
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
