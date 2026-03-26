import { Outlet } from "react-router-dom";
import { AppBottomNav } from "@/components/ui/AppBottomNav";

export const MobileShell = () => (
  <div className="min-h-screen bg-ink px-0 py-0 text-white md:flex md:items-center md:justify-center md:p-6">
    <div className="phone-frame min-h-screen w-full md:min-h-[920px] md:max-w-[430px]">
      <Outlet />
      <AppBottomNav />
    </div>
  </div>
);
