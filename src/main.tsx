import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SidebarProvider } from "./context/sidebar/SidebarProvider.tsx";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { isUpstreamApiHealthy } from "./mock/healthCheck.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});


// async function bootstrapApp(): Promise<void> {
//   const isHealthy = await isUpstreamApiHealthy();

//   if (!isHealthy) {
//     console.warn(
//       "[Network] FakeStoreAPI is unreachable or blocked. Activating fallback mock layer.",
//     );
//     const { worker } = await import("@/mock/browser");
//     await worker.start();
//   } else {
//     console.info(
//       "[Network] FakeStoreAPI is online. Direct network mode active.",
//     );
//   }
// }

async function prepareApp(): Promise<void> {
  const { worker } = await import("@/mock/browser");
  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
  });
}

prepareApp().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
});

