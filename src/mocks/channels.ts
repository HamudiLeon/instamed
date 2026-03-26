import type { Channel, CreatorProfile } from "@/types/domain";

export const channels: Channel[] = [
  { id: "for-you", slug: "for-you", title: "For You", accent: "#6de4ff", description: "Adaptive mix of due cards and trending study reels.", icon: "Sparkles" },
  { id: "following", slug: "following", title: "Following", accent: "#a78bfa", description: "Educators and creators you follow.", icon: "Users" },
  { id: "step1", slug: "step1", title: "Step 1", accent: "#f59e0b", description: "Foundational sciences and pattern recognition.", icon: "Brain" },
  { id: "step2", slug: "step2", title: "Step 2 CK", accent: "#34d399", description: "Management, next-best-step, and wards logic.", icon: "Stethoscope" },
  { id: "anatomy", slug: "anatomy", title: "Anatomy", accent: "#38bdf8", description: "Label drills, structures, and image recall.", icon: "ScanSearch" },
  { id: "pathophysiology", slug: "pathophysiology", title: "Pathophysiology", accent: "#f87171", description: "Mechanism-first disease reasoning.", icon: "Activity" },
  { id: "pharmacology", slug: "pharmacology", title: "Pharmacology", accent: "#c084fc", description: "Drugs, mechanisms, and toxicities.", icon: "Pill" },
  { id: "rapid-review", slug: "rapid-review", title: "Rapid Review", accent: "#facc15", description: "Fast loops for cramming and spaced review.", icon: "Zap" },
  { id: "vocabulary", slug: "vocabulary", title: "Vocabulary", accent: "#4ade80", description: "Terminology memory trainer.", icon: "Languages" },
  { id: "clinical-cases", slug: "clinical-cases", title: "Clinical Cases", accent: "#fb7185", description: "High-yield vignettes and management drills.", icon: "HeartPulse" },
  { id: "clinical-pearls", slug: "clinical-pearls", title: "Clinical Pearls", accent: "#60a5fa", description: "Concise creator-led heuristics.", icon: "BadgeHelp" }
];

export const creators: CreatorProfile[] = [
  {
    id: "creator-1",
    handle: "@wardrounds",
    displayName: "Dr. Maya Qureshi",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=256&q=80",
    role: "Internal Medicine Educator",
    specialty: "Cardiorenal Medicine",
    followerCount: 48200
  },
  {
    id: "creator-2",
    handle: "@labcoatlabels",
    displayName: "Samir Patel, MS2",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    role: "Anatomy + Step Tutor",
    specialty: "Anatomy",
    followerCount: 21800
  },
  {
    id: "creator-3",
    handle: "@quicktermsmd",
    displayName: "Nina Lopez",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80",
    role: "Medical Language Coach",
    specialty: "Vocabulary Trainer",
    followerCount: 15420
  }
];
