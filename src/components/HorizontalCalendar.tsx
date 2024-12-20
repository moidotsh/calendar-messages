import React from "react";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useVisibleCards } from "@/hooks/useVisibleCards";
import { AnimatedBackground } from "./AnimatedBackground";
import { useToast } from "@/hooks/useToast";
import EnhancedHeader from "./EnhancedHeader";
import { useDevMode } from "@/hooks/useDevMode";
import { useRouter } from "next/navigation";

type DateType = "birthday" | "bonus" | "christmas" | "yalda" | "normal";

const HorizontalCalendar = () => {
  const devMode = useDevMode();
  const router = useRouter();
  const { toast } = useToast();
  const scrollRef = useHorizontalScroll();
  const scrollProgress = useScrollProgress(scrollRef);
  const { firstVisible, lastVisible } = useVisibleCards(scrollRef);

  const formatTimeRemaining = (milliseconds: number): string => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minute${minutes !== 1 ? "s" : ""}`;
    }
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleDateClick = async (date: Date) => {
    // Format date in Stockholm timezone to ensure correct date
    const stockholmDate = new Date(
      date.toLocaleString("en-US", {
        timeZone: "Europe/Stockholm",
      }),
    );

    // Get current time in Stockholm
    const stockholmTime = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Stockholm",
    });
    const currentStockholmTime = new Date(stockholmTime);

    // Set the access time to 8 PM (20:00) Stockholm time for the target date
    const accessTime = new Date(stockholmDate);
    accessTime.setHours(20, 0, 0, 0);

    console.log("Date clicked:", {
      date: stockholmDate,
      devMode,
      currentTime: currentStockholmTime,
      accessTime: accessTime,
      isFuture: currentStockholmTime < accessTime,
    });

    if (currentStockholmTime < accessTime && !devMode) {
      console.log("Showing toast - future date");

      // Calculate time difference
      const timeDiff = accessTime.getTime() - currentStockholmTime.getTime();
      const isWithin24Hours = timeDiff <= 24 * 60 * 60 * 1000;

      return toast({
        title: "Hey! No peeking!! 👀",
        content: `Available ${formatDate(stockholmDate)}, 8PM Stockholm time`,
        countdown: isWithin24Hours
          ? `⏳ Opening in ${formatTimeRemaining(timeDiff)}!`
          : null,
      });
    }

    // Format the date string using the Stockholm date to ensure correct day
    const dateString = stockholmDate.toLocaleDateString("en-CA"); // This will give YYYY-MM-DD format
    console.log("Navigating to:", `/message/${dateString}`);

    try {
      await router.push(`/message/${dateString}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const getCardClasses = (index: number, dateType: DateType) => {
    const baseClasses = getDateClasses(dateType);
    const isFirstCard = index === firstVisible && firstVisible > 0;
    const isLastCard = index === lastVisible && dateType !== "christmas";

    if (isFirstCard) {
      return `${baseClasses} first-card blur-[2px]`;
    }

    if (isLastCard) {
      return `${baseClasses} last-card blur-[2px]`;
    }

    return baseClasses;
  };

  const getSpecialLabel = (dateType: DateType) => {
    const baseClasses =
      "text-xs font-medium tracking-wide flex gap-1 justify-center";

    switch (dateType) {
      case "birthday":
        return <span className={baseClasses}>🎂 🎉 🎈</span>;
      case "bonus":
        return <span className={baseClasses}>✨✨✨</span>;
      case "christmas":
        return <span className={baseClasses}>🎄 🎅 ❄️</span>;
      case "yalda":
        return <span className={baseClasses}>🍎 🍉 🌙</span>;
      default:
        // Empty space with visibility hidden for consistent height
        return <span className={`${baseClasses} invisible`}>🎄 🎅 ❄️</span>;
    }
  };

  const dates = React.useMemo(() => {
    const startDate = new Date(2024, 11, 20);
    startDate.setHours(0, 0, 0, 0);

    const datesArray = [];
    for (let i = 0; i < 17; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      date.setHours(0, 0, 0, 0);
      datesArray.push(date);
    }
    return datesArray;
  }, []);

  const isSpecialDate = (date: Date): DateType => {
    const month = date.getMonth();
    const day = date.getDate();

    if (month === 11 && day === 20) return "yalda"; // December 20 - Shab-e Yalda
    if (month === 0 && day === 4) return "birthday";
    if (month === 0 && day === 5) return "bonus";
    if (month === 0 && day === 6) return "christmas";
    return "normal";
  };

  const getDateClasses = (dateType: DateType) => {
    const baseClasses = `
      w-full aspect-square rounded-lg backdrop-blur-sm
      transition-all duration-300
      flex flex-col items-center justify-center gap-2
      border
    `;

    switch (dateType) {
      case "birthday":
        return `${baseClasses} bg-pink-500/30 hover:bg-pink-500/40 border-pink-300/40 hover:border-pink-300/60`;
      case "bonus":
        return `${baseClasses} bg-purple-500/30 hover:bg-purple-500/40 border-purple-300/40 hover:border-purple-300/60`;
      case "christmas":
        return `${baseClasses} bg-emerald-500/30 hover:bg-emerald-500/40 border-emerald-300/40 hover:border-emerald-300/60`;
      case "yalda":
        return `${baseClasses} bg-red-500/30 hover:bg-red-500/40 border-red-300/40 hover:border-red-300/60`;
      default:
        return `${baseClasses} bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40`;
    }
  };

  return (
    <div className="relative min-h-screen">
      {devMode && (
        <div className="fixed top-0 right-0 m-4 px-3 py-1 bg-yellow-500/20 text-yellow-200 text-sm rounded-full border border-yellow-500/30 z-50">
          Dev Mode
        </div>
      )}
      <AnimatedBackground progress={scrollProgress} />
      <EnhancedHeader />
      <div className="fixed inset-0 flex items-center justify-center px-2 sm:px-4 z-10">
        <div className="w-full max-w-2xl">
          <div
            ref={scrollRef}
            className="flex mt-12 overflow-x-auto hide-scrollbar gap-2 sm:gap-3 px-2 sm:px-4 py-8 snap-x snap-mandatory"
          >
            {dates.map((date, index) => {
              const dateType = isSpecialDate(date);
              return (
                <div
                  key={date.toISOString()}
                  className="calendar-card flex-none w-20 sm:w-24 snap-center"
                >
                  <button
                    onClick={() => handleDateClick(date)}
                    className={getCardClasses(index, dateType)}
                  >
                    <span className="text-white/60 text-[10px] sm:text-xs">
                      {formatDate(date)}
                    </span>
                    <span className="text-white text-lg sm:text-xl font-bold">
                      {date.getDate()}
                    </span>
                    {/* Reserve consistent space for emojis */}
                    <div className="h-[24px] flex items-center justify-center">
                      {getSpecialLabel(dateType)}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCalendar;
