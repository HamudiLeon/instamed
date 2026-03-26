import { Card, Skeleton } from "@heroui/react";

export const FeedSkeleton = () => (
  <Card className="h-full w-full rounded-none bg-panel/80 p-5">
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 rounded-full bg-white/10" />
        <Skeleton className="h-4 w-52 rounded-full bg-white/10" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-48 w-full rounded-[28px] bg-white/10" />
        <Skeleton className="h-5 w-4/5 rounded-full bg-white/10" />
        <Skeleton className="h-5 w-3/5 rounded-full bg-white/10" />
        <Skeleton className="h-24 w-full rounded-[24px] bg-white/10" />
      </div>
    </div>
  </Card>
);
