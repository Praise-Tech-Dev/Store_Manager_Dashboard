import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import SignUpPage from '../pages/sign-up/SignUpPage'
import ForgotPassword from '../pages/forgot-password/ForgotPassword'
import AuthLayout from '../layout/AuthLayout'
import AppLayout from '../layout/AppLayout'
import DashboardPage from '../pages/dashboard/DashboardPage'

export const AppRoutes = () => {
    return (
      <BrowserRouter>
        <Routes>
          {/* auth pages  */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* protected routes  */}
          <Route element={<AppLayout />}>
            {/* dashboard */}
            <Route path="/" element={<DashboardPage />} />
            {/* user management  */}
            {/* product catalogue  */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
}