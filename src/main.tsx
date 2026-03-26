import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { App } from "@/App";
import { AppErrorBoundary } from "@/app/AppErrorBoundary";
import { queryClient } from "@/lib/queryClient";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <HeroUIProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </HeroUIProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
);
