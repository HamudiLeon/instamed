import { Button } from "@heroui/react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export const RouteErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Unexpected application error";
  const description =
    error instanceof Error ? error.message : "Something went wrong while rendering this route.";

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 text-white">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-soft">
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">InstaMed</p>
        <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
        <Button className="mt-5 bg-white text-black" radius="full" onPress={() => navigate("/")}>
          Return to Feed
        </Button>
      </div>
    </main>
  );
};
