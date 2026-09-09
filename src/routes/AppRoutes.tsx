import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import SignUpPage from '../pages/sign-up/SignUpPage'
import ForgotPassword from '../pages/forgot-password/ForgotPassword'
import AuthLayout from '../layout/AuthLayout'
import AppLayout from '../layout/AppLayout'
import { ProtectedRoute } from './ProtectedRoutes'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'

export const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("auth_token") ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* auth pages  */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/signup"
              element={<Navigate to="/sign-up" replace />}
            />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* protected routes  */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* dashboard */}
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* user management  */}
              {/* product catalogue  */}
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    );
}