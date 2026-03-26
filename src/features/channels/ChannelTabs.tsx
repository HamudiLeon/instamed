import { Tabs, Tab } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchChannels } from "@/mocks/api";
import { useChannelsStore } from "@/stores/channelsStore";

export const ChannelTabs = () => {
  const activeChannelId = useChannelsStore((state) => state.activeChannelId);
  const setActiveChannel = useChannelsStore((state) => state.setActiveChannel);
  const { data = [] } = useQuery({
    queryKey: ["channels"],
    queryFn: fetchChannels,
  });

  return (
    <Tabs
      aria-label="Study channels"
      classNames={{
        base: "w-full",
        tabList: "scrollbar-none flex w-full gap-2 overflow-x-auto bg-transparent p-0",
        cursor: "bg-[linear-gradient(90deg,rgba(109,228,255,0.22),rgba(255,255,255,0.1))] shadow-none",
        tab: "h-9 rounded-[16px] border border-white/6 bg-white/5 px-4 data-[hover-unselected=true]:opacity-100",
        tabContent: "text-xs font-semibold tracking-wide text-slate-300 group-data-[selected=true]:text-white",
      }}
      selectedKey={activeChannelId}
      variant="solid"
      onSelectionChange={(key) => setActiveChannel(String(key))}
    >
      {data.map((channel) => (
        <Tab key={channel.id} title={channel.title} />
      ))}
    </Tabs>
  );
};
