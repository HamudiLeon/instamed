import { NavLink } from "react-router-dom";
import { bottomNavItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export const AppBottomNav = () => (
  <nav
    aria-label="Primary navigation"
    className="absolute inset-x-3 bottom-3 z-30 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,10,15,0.94),rgba(7,10,15,0.72))] px-2 pb-[calc(0.5rem+var(--safe-bottom))] pt-2 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
  >
    <ul className="grid grid-cols-5 gap-1">
      {bottomNavItems.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium text-slate-400 transition-colors",
                isActive && "bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))] text-white",
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
