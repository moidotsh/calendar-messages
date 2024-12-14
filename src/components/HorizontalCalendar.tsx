import React from "react";
import { useRouter } from "next/router";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useVisibleCards } from "@/hooks/useVisibleCards";
import { AnimatedBackground } from "./AnimatedBackground";
import { useToast } from "@/hooks/useToast";
import EnhancedHeader from "./EnhancedHeader";

type DateType = "birthday" | "bonus" | "christmas" | "yalda" | "normal";

const HorizontalCalendar = () => {
  const router = useRouter();
  const { toast } = useToast();
  const scrollRef = useHorizontalScroll();
  const scrollProgress = useScrollProgress(scrollRef);
  const { firstVisible, lastVisible } = useVisibleCards(scrollRef);

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    console.log({
      clicked: targetDate.toISOString(),
      today: today.toISOString(),
    });

    const targetDateTime = targetDate.getTime();
    const todayTime = today.getTime();

    if (targetDateTime > todayTime) {
      return toast({
        title: "Hey! No peeking!! 👀",
        message: `This message will be available on ${formatDate(targetDate)}`,
      });
    }

    router.push(`/message/${targetDate.toISOString().split("T")[0]}`);
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
    const baseClasses = "text-xs mt-1 font-medium tracking-wide flex gap-1";

    switch (dateType) {
      case "birthday":
        return <span className={baseClasses}>🎂 🎉 🎈</span>;
      case "bonus":
        return <span className={baseClasses}>✨ 💰 🎁</span>;
      case "christmas":
        return <span className={baseClasses}>🎄 🎅 ❄️</span>;
      case "yalda":
        return <span className={baseClasses}>🍎 🍉 🌙</span>;
      default:
        return null;
    }
  };

  const dates = React.useMemo(() => {
    const startDate = new Date(2024, 11, 21);
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const isSpecialDate = (date: Date): DateType => {
    const month = date.getMonth();
    const day = date.getDate();

    if (month === 11 && day === 21) return "yalda"; // December 21 - Shab-e Yalda
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
      <AnimatedBackground progress={scrollProgress} />
      <EnhancedHeader />
      <div className="fixed inset-0 flex items-center justify-center px-2 sm:px-4 z-10">
        <div className="w-full max-w-2xl">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-3 px-2 sm:px-4 py-8 snap-x snap-mandatory"
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
                    {getSpecialLabel(dateType)}
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
