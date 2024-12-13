import React from "react";
import { useRouter } from "next/router";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useVisibleCards } from "@/hooks/useVisibleCards";
import { AnimatedBackground } from "./AnimatedBackground";
import { useToast } from "@/hooks/useToast";

type DateType = "birthday" | "bonus" | "christmas" | "normal";

const HorizontalCalendar = () => {
  const router = useRouter();
  const { toast } = useToast();
  const scrollRef = useHorizontalScroll();
  const scrollProgress = useScrollProgress(scrollRef);
  const { firstVisible, lastVisible } = useVisibleCards(scrollRef);

  const handleDateClick = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log("Date clicked:", date > today ? "future date" : "past date");

    if (date > today) {
      console.log("Showing toast");
      toast({
        title: "Hey! No peeking!! 👀",
        message: `This message will be available on ${formatDate(date)}`,
        variant: "destructive",
      });
      return;
    }

    console.log("Routing to message page");
    router.push(`/message/${date.toISOString().split("T")[0]}`);
  };

  const getCardClasses = (index: number, dateType: DateType) => {
    const baseClasses = getDateClasses(dateType);
    const isFirstCard = index === firstVisible && firstVisible > 0;
    const isLastCard = index === lastVisible && dateType !== "christmas"; // Only blur if not Christmas

    if (isFirstCard) {
      return `${baseClasses} first-card blur-[2px]`;
    }

    if (isLastCard) {
      return `${baseClasses} last-card blur-[2px]`;
    }

    return baseClasses;
  };

  const dates = React.useMemo(() => {
    const startDate = new Date(2023, 11, 21); // December 21st
    const datesArray = [];

    // Generate dates from Dec 21 to Jan 6
    for (let i = 0; i < 17; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
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

    // Birthday: January 4th
    if (month === 0 && day === 4) return "birthday";
    // January 5th - bonus
    if (month === 0 && day === 5) return "bonus";
    // January 6th - Christmas
    if (month === 0 && day === 6) return "christmas";
    return "normal";
  };

  const getDateClasses = (dateType: DateType) => {
    const baseClasses =
      "w-full aspect-square rounded-lg backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 border";

    switch (dateType) {
      case "birthday":
        return `${baseClasses} bg-pink-500/30 hover:bg-pink-500/40 border-pink-300/40 hover:border-pink-300/60`;
      case "bonus":
        return `${baseClasses} bg-purple-500/30 hover:bg-purple-500/40 border-purple-300/40 hover:border-purple-300/60`;
      case "christmas":
        return `${baseClasses} bg-emerald-500/30 hover:bg-emerald-500/40 border-emerald-300/40 hover:border-emerald-300/60`;
      default:
        return `${baseClasses} bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40`;
    }
  };

  const getSpecialLabel = (dateType: DateType) => {
    switch (dateType) {
      case "birthday":
        return <span className="text-pink-200 text-xs mt-1">Birthday! 🎂</span>;
      case "bonus":
        return <span className="text-purple-200 text-xs mt-1">Bonus ✨</span>;
      case "christmas":
        return (
          <span className="text-emerald-200 text-xs mt-1">Christmas 🎄</span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground progress={scrollProgress} />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto hide-scrollbar gap-4 px-16 py-8 snap-x snap-mandatory"
          >
            {dates.map((date, index) => {
              const dateType = isSpecialDate(date);
              return (
                <div
                  key={date.toISOString()}
                  className="calendar-card flex-none w-32 snap-center"
                  data-index={index}
                >
                  <button
                    onClick={() => handleDateClick(date)}
                    className={getCardClasses(index, dateType)}
                  >
                    <span className="text-white/60 text-sm">
                      {formatDate(date)}
                    </span>
                    <span className="text-white text-2xl font-bold">
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
