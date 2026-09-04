import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
      </main>
    </div>
  );
}
