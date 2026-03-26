import { Button, Card, CardBody, Chip, Input, Kbd } from "@heroui/react";
import { motion } from "motion/react";
import { BookOpenText, Search, Sparkles, Stethoscope, Zap } from "lucide-react";
import { useChannelsStore } from "@/stores/channelsStore";
import { cn } from "@/lib/utils";
import { studyDeckSessionMeta } from "@/mocks/studyDeckReels";

const actions = [
  {
    key: "mixed" as const,
    title: "Mixed Session",
    subtitle: "Vocabulary + quiz reel flow",
    meta: `${studyDeckSessionMeta.vocab.count + studyDeckSessionMeta.quiz.count} cards`,
    icon: Zap,
    accent: "text-amber-200",
    glow: "bg-amber-300/12",
  },
  {
    key: "quiz" as const,
    title: "Quiz Drill",
    subtitle: "Imported Learncard MCQs",
    meta: `${studyDeckSessionMeta.quiz.count} cards`,
    icon: Stethoscope,
    accent: "text-cyan-200",
    glow: "bg-cyan-300/12",
  },
  {
    key: "vocab" as const,
    title: "Vocabulary",
    subtitle: "Medical Latin trainer",
    meta: `${studyDeckSessionMeta.vocab.count} cards`,
    icon: BookOpenText,
    accent: "text-emerald-200",
    glow: "bg-emerald-300/12",
  },
];

export const ActionHub = () => {
  const setActiveChannel = useChannelsStore((state) => state.setActiveChannel);
  const setImmersiveSession = useChannelsStore((state) => state.setImmersiveSession);
  const sessionMode = useChannelsStore((state) => state.sessionMode);
  const setSessionMode = useChannelsStore((state) => state.setSessionMode);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">InstaMed</p>
          <h1 className="mt-1 text-[28px] font-semibold leading-none tracking-[-0.04em] text-white">Study Reels</h1>
        </div>
        <Chip className="border border-cyan-200/10 bg-cyan-300/10 text-cyan-100" variant="flat">
          Premium beta
        </Chip>
      </div>

      <Input
        aria-label="Quick actions"
        classNames={{
          base: "max-w-full",
          inputWrapper:
            "h-12 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl",
          input: "text-sm text-slate-200 placeholder:text-slate-500",
        }}
        endContent={<Kbd className="border-white/10 bg-white/6 text-slate-300">⌘K</Kbd>}
        placeholder="Search decks, creators, tags"
        startContent={<Search className="h-4 w-4 text-slate-400" />}
        type="search"
      />

      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const selected = sessionMode === action.key;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.28 }}
              whileHover={{ y: -4, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
            >
              <Card
                isPressable
                className={cn(
                  "rounded-[22px] border shadow-soft backdrop-blur-2xl",
                  selected
                    ? "border-cyan-300/25 bg-[linear-gradient(180deg,rgba(109,228,255,0.14),rgba(255,255,255,0.04))]"
                    : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))]",
                )}
                onPress={() => setSessionMode(action.key)}
              >
                <CardBody className="gap-3 p-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-2xl ${action.glow}`}>
                    <Icon className={`h-4 w-4 ${action.accent}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight text-white">{action.title}</p>
                    <p className="mt-1 text-[11px] leading-4 text-slate-400">{action.subtitle}</p>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">{action.meta}</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Button
        className="h-11 w-full rounded-[20px] border border-cyan-200/15 bg-[linear-gradient(90deg,rgba(109,228,255,0.18),rgba(255,255,255,0.08))] font-semibold text-white shadow-[0_16px_40px_rgba(9,28,43,0.42)]"
        endContent={<Sparkles className="h-4 w-4" />}
        variant="flat"
        onPress={() => {
          setActiveChannel("rapid-review");
          setImmersiveSession(true);
        }}
      >
        Start {sessionMode === "vocab" ? "Vocabulary" : sessionMode === "quiz" ? "Quiz" : "Mixed"} Session
      </Button>
    </div>
  );
};
