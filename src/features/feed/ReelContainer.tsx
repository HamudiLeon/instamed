import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, useReducedMotion } from "motion/react";
import { FeedProgressOverlay } from "@/features/feed/FeedProgressOverlay";
import { FeedSkeleton } from "@/features/feed/FeedSkeleton";
import { ReelStack } from "@/features/feed/ReelStack";
import { preloadImage } from "@/lib/image";
import { fetchFeed } from "@/mocks/api";
import { useFeedStore } from "@/stores/feedStore";
import type { Reel } from "@/types/domain";

const INITIAL_LIMIT = 7;
const PREFETCH_LIMIT = 5;
const WINDOW_RADIUS = 2;
const INTERACTIVE_SELECTOR =
  'button, a, input, textarea, select, option, label, [role="button"], [data-no-swipe="true"]';

export const ReelContainer = ({ channelId }: { channelId: string }) => {
  const queryClient = useQueryClient();
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const wheelLockRef = useRef(false);
  const touchTrackingRef = useRef(false);
  const touchStartRef = useRef({ y: 0, time: 0, lastY: 0, lastTime: 0 });
  const [dragOffset, setDragOffset] = useState(0);

  const ensureFeed = useFeedStore((state) => state.ensureFeed);
  const feed = useFeedStore((state) => state.feeds[channelId]);
  const setFeedIds = useFeedStore((state) => state.setFeedIds);
  const appendFeedIds = useFeedStore((state) => state.appendFeedIds);
  const setCurrentIndex = useFeedStore((state) => state.setCurrentIndex);
  const setPrefetchedUntil = useFeedStore((state) => state.setPrefetchedUntil);

  useEffect(() => {
    ensureFeed(channelId);
  }, [channelId, ensureFeed]);

  const { data, isLoading } = useQuery({
    queryKey: ["feed", channelId, 0, INITIAL_LIMIT],
    queryFn: () => fetchFeed({ channelId, offset: 0, limit: INITIAL_LIMIT }),
  });

  useEffect(() => {
    if (!data?.length) return;
    setFeedIds(channelId, data.map((item) => item.id), data.length >= INITIAL_LIMIT);
    data.forEach((item) => preloadImage(item.coverImageUrl ?? (item.card.type === "anatomy_image" ? item.card.imageUrl : undefined)));
  }, [channelId, data, setFeedIds]);

  const currentIndex = feed?.currentIndex ?? 0;
  const ids = feed?.ids ?? [];
  const reels = useMemo(() => {
    const map = new Map<string, Reel>();
    const cached = queryClient.getQueriesData<Reel[]>({ queryKey: ["feed", channelId] });

    cached.forEach(([, items]) => {
      items?.forEach((item) => {
        map.set(item.id, item);
      });
    });

    return ids.map((id) => map.get(id)).filter(Boolean) as Reel[];
  }, [channelId, ids, queryClient]);
  const windowed = useMemo(
    () => reels.slice(Math.max(0, currentIndex - WINDOW_RADIUS), currentIndex + WINDOW_RADIUS + 1),
    [currentIndex, reels],
  );
  const activeWindowIndex = Math.min(WINDOW_RADIUS, currentIndex);

  useEffect(() => {
    if (!feed || currentIndex + PREFETCH_LIMIT <= feed.prefetchedUntil) return;

    const nextOffset = ids.length;
    void queryClient
      .fetchQuery({
        queryKey: ["feed", channelId, nextOffset, PREFETCH_LIMIT],
        queryFn: () => fetchFeed({ channelId, offset: nextOffset, limit: PREFETCH_LIMIT }),
      })
      .then((items) => {
        if (!items.length) return;
        appendFeedIds(channelId, items.map((item) => item.id), items.length === PREFETCH_LIMIT);
        setPrefetchedUntil(channelId, currentIndex + PREFETCH_LIMIT);
        items.forEach((item) =>
          preloadImage(item.coverImageUrl ?? (item.card.type === "anatomy_image" ? item.card.imageUrl : undefined)),
        );
      });
  }, [appendFeedIds, channelId, currentIndex, feed, ids.length, queryClient, setPrefetchedUntil]);

  if (isLoading || !reels.length) {
    return (
      <div className="absolute inset-0">
        <FeedSkeleton />
      </div>
    );
  }

  const move = (direction: "next" | "previous") => {
    if (direction === "next" && currentIndex < reels.length - 1) {
      setCurrentIndex(channelId, currentIndex + 1);
    }
    if (direction === "previous" && currentIndex > 0) {
      setCurrentIndex(channelId, currentIndex - 1);
    }
  };

  const settleGesture = (offsetY: number, velocityY: number) => {
    const viewportHeight = viewportRef.current?.clientHeight ?? 900;
    const threshold = viewportHeight * 0.14;
    const shouldAdvance = offsetY < -threshold || velocityY < -520;
    const shouldReturn = offsetY > threshold || velocityY > 520;

    if (shouldAdvance) move("next");
    if (shouldReturn) move("previous");
    setDragOffset(0);
  };

  const beginTouchTracking = (clientY: number) => {
    touchTrackingRef.current = true;
    touchStartRef.current = {
      y: clientY,
      time: performance.now(),
      lastY: clientY,
      lastTime: performance.now(),
    };
  };

  const updateTouchTracking = (clientY: number) => {
    if (!touchTrackingRef.current) return;
    const nextOffset = clientY - touchStartRef.current.y;
    touchStartRef.current.lastY = clientY;
    touchStartRef.current.lastTime = performance.now();
    setDragOffset(nextOffset);
  };

  const endTouchTracking = (clientY: number) => {
    if (!touchTrackingRef.current) return;
    const totalOffset = clientY - touchStartRef.current.y;
    const dt = Math.max(1, performance.now() - touchStartRef.current.time);
    const velocity = (totalOffset / dt) * 1000;
    touchTrackingRef.current = false;
    settleGesture(totalOffset, velocity);
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(70,160,255,0.14),transparent_22%),radial-gradient(circle_at_bottom,rgba(34,197,94,0.1),transparent_28%)]"
      role="application"
    >
      <FeedProgressOverlay />
      <motion.div
        ref={viewportRef}
        tabIndex={0}
        animate={{ y: 0 }}
        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 34, mass: 0.9 }}
        className="absolute inset-0"
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") move("previous");
          if (event.key === "ArrowDown") move("next");
        }}
        onTouchStart={(event) => {
          const target = event.target as HTMLElement | null;
          if (target?.closest(INTERACTIVE_SELECTOR)) return;
          beginTouchTracking(event.touches[0]?.clientY ?? 0);
        }}
        onTouchMove={(event) => {
          if (!touchTrackingRef.current) return;
          updateTouchTracking(event.touches[0]?.clientY ?? 0);
        }}
        onTouchEnd={(event) => {
          const touch = event.changedTouches[0];
          endTouchTracking(touch?.clientY ?? touchStartRef.current.lastY);
        }}
        onTouchCancel={() => {
          touchTrackingRef.current = false;
          setDragOffset(0);
        }}
        onWheel={(event) => {
          if (wheelLockRef.current) return;
          if (Math.abs(event.deltaY) < 18) return;

          wheelLockRef.current = true;
          move(event.deltaY > 0 ? "next" : "previous");
          window.setTimeout(() => {
            wheelLockRef.current = false;
          }, 360);
        }}
      >
        <ReelStack activeIndex={activeWindowIndex} dragY={dragOffset} reels={windowed} />
      </motion.div>
      <div className="sr-only" aria-live="polite">
        Reel {currentIndex + 1} of {reels.length}
      </div>
    </div>
  );
};
