import { Avatar, Button, Card, Chip } from "@heroui/react";
import { Bookmark, Heart, Share2 } from "lucide-react";
import type { CreatorProfile, Reel, SocialPostCard } from "@/types/domain";

export const SocialStudyPostCard = ({
  reel,
  card,
  creator,
  saved,
  onToggleSaved,
}: {
  reel: Reel;
  card: SocialPostCard;
  creator?: CreatorProfile;
  saved: boolean;
  onToggleSaved: () => void;
}) => (
  <Card className="space-y-4 rounded-[30px] border border-white/10 bg-white/5 p-5 shadow-soft">
    <div className="flex items-center gap-3">
      <Avatar className="h-12 w-12" src={creator?.avatarUrl} />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{creator?.displayName ?? "Creator"}</p>
        <p className="text-xs text-slate-400">{creator?.handle}</p>
      </div>
      <Chip className="border border-white/10 bg-white/10 text-white" variant="flat">
        Pearl
      </Chip>
    </div>
    <div className="overflow-hidden rounded-[24px] border border-white/10">
      <img alt={reel.title} className="h-[40vh] w-full object-cover" src={card.mediaUrl} />
    </div>
    <div className="flex gap-2 text-white">
      <Button isIconOnly className="bg-white/8 text-white" radius="full" variant="flat">
        <Heart className="h-4 w-4" />
      </Button>
      <Button
        isIconOnly
        className={saved ? "bg-cyan-400/20 text-cyan-100" : "bg-white/8 text-white"}
        radius="full"
        variant="flat"
        onPress={onToggleSaved}
      >
        <Bookmark className="h-4 w-4" />
      </Button>
      <Button isIconOnly className="bg-white/8 text-white" radius="full" variant="flat">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
    <p className="text-sm leading-6 text-slate-100">{card.caption}</p>
    <Card className="rounded-[24px] border border-cyan-300/20 bg-cyan-400/10 p-4 shadow-none">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Educational Takeaway</p>
      <p className="mt-2 text-sm text-cyan-50">{card.educationalTakeaway}</p>
    </Card>
    <div className="flex items-center justify-between text-xs text-slate-400">
      <span>{card.metrics.likes.toLocaleString()} likes</span>
      <span>{card.metrics.bookmarks.toLocaleString()} saves</span>
      <span>{card.metrics.shares.toLocaleString()} shares</span>
    </div>
  </Card>
);
