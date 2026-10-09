import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();

  // check if current route is forgot password
  const isResetPassword = location.pathname.includes("forgot-password");
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-surface-light flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background blurs for only Forgot Password screen */}
      {isResetPassword && (
        <>
          {/* Top-Left/Top-Right Soft Indigo Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 h-[409.5px] w-lg rounded-full bg-primary/5 blur-[100px]"
          />

          {/* Bottom-Right Soft Neutral Slate Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-24 -right-24 h-[307.19px] w-[384px] rounded-full bg-[#7E3000]/5 blur-[80px]"
          />
        </>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl"
      />

      {/* Centered Auth Viewport */}
      <main className="relative z-10 w-full max-w-md">
        <Outlet />
        {isResetPassword && (
          <p className="pt-6 text-center text-[11px] font-semibold leading-4 tracking-[0.55px] align-middle text-text-gray/60">
            Secure Area &bull; FakeAPI Store
          </p>
        )}
      </main>
    </div>
  );
}
