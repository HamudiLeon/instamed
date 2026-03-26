import { BookMarked, CircleUserRound, Flame, House, PenSquare } from "lucide-react";

export const bottomNavItems = [
  { to: "/", label: "Feed", icon: House },
  { to: "/library", label: "Library", icon: BookMarked },
  { to: "/progress", label: "Progress", icon: Flame },
  { to: "/creator", label: "Create", icon: PenSquare },
  { to: "/profile", label: "Profile", icon: CircleUserRound },
];
