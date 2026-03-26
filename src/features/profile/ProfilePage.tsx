import { Avatar, Button, Card } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCreators } from "@/mocks/api";
import { useChannelsStore } from "@/stores/channelsStore";

export const ProfilePage = () => {
  const { data = [] } = useQuery({ queryKey: ["creators"], queryFn: fetchCreators });
  const followedCreatorIds = useChannelsStore((state) => state.followedCreatorIds);
  const toggleFollowCreator = useChannelsStore((state) => state.toggleFollowCreator);

  return (
    <main className="min-h-screen space-y-4 px-4 pb-32 pt-[calc(var(--safe-top)+1rem)]">
      <div>
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400">Profile</p>
        <h1 className="text-2xl font-semibold">Creator Ecosystem</h1>
      </div>
      {data.map((creator) => {
        const followed = followedCreatorIds.includes(creator.id);
        return (
          <Card key={creator.id} className="rounded-[26px] border border-white/10 bg-white/5 p-4 shadow-none">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14" src={creator.avatarUrl} />
              <div className="flex-1">
                <p className="font-semibold text-white">{creator.displayName}</p>
                <p className="text-sm text-slate-400">{creator.role}</p>
                <p className="text-xs text-slate-500">{creator.followerCount.toLocaleString()} followers</p>
              </div>
              <Button
                className={followed ? "bg-white text-black" : "bg-white/8 text-white"}
                radius="full"
                variant="flat"
                onPress={() => toggleFollowCreator(creator.id)}
              >
                {followed ? "Following" : "Follow"}
              </Button>
            </div>
          </Card>
        );
      })}
    </main>
  );
};
