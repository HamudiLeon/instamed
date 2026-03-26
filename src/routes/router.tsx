import { createBrowserRouter } from "react-router-dom";
import { CreatorStudioPage } from "@/features/creator/CreatorStudioPage";
import { ChannelPage } from "@/features/channels/ChannelPage";
import { LibraryPage } from "@/features/library/LibraryPage";
import { ProfilePage } from "@/features/profile/ProfilePage";
import { ProgressPage } from "@/features/progress/ProgressPage";
import { MobileShell } from "@/layouts/MobileShell";
import { RouteErrorBoundary } from "@/routes/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileShell />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <ChannelPage /> },
      { path: "library", element: <LibraryPage /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "creator", element: <CreatorStudioPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
