// src/pages/message/[date].tsx
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TinaVerification from "@/components/TinaVerification";
import dynamic from "next/dynamic";
import { useDevMode } from "@/hooks/useDevMode";

const MessagePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const [isVerified, setIsVerified] = useState(false);
  const devMode = useDevMode();

  // Debug logging
  useEffect(() => {
    if (date) {
      console.log("Incoming date:", date);
      const formattedDate = date.toString().replace(/-/g, "");
      console.log("Formatted date:", formattedDate);

      // Log the expected component path
      console.log(
        "Attempting to load component:",
        `@/components/days/day-${formattedDate}`,
      );

      // Log current timezone information
      const stockholmDate = new Date().toLocaleString("en-US", {
        timeZone: "Europe/Stockholm",
      });
      console.log("Current Stockholm time:", stockholmDate);
    }
  }, [date]);

  // Early return if no date
  if (!date || typeof date !== "string") {
    return null;
  }

  // Format date to match component naming (remove dashes)
  const formattedDate = date.replace(/-/g, "");

  // Dynamically import the day component with error handling
  const DayComponent = dynamic(
    () =>
      import(`@/components/days/day-${formattedDate}`).catch((error) => {
        console.error("Failed to load component:", error);
        console.log(
          "Attempted to load:",
          `@/components/days/day-${formattedDate}`,
        );

        // Log available components in development
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Component path attempted:",
            require.resolve(`@/components/days/day-${formattedDate}`),
          );
        }

        router.push("/");
        return () => null;
      }),
    {
      loading: () => (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ),
      ssr: false,
    },
  );

  // Skip verification if in dev mode or if NEXT_PUBLIC_SKIP_VERIFICATION is true
  if (!devMode && !process.env.NEXT_PUBLIC_SKIP_VERIFICATION && !isVerified) {
    return <TinaVerification onSuccess={() => setIsVerified(true)} />;
  }

  // Add debug information in development
  if (process.env.NODE_ENV === "development") {
    return (
      <>
        <DayComponent />
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-sm">
          <p>Date param: {date}</p>
          <p>Formatted date: {formattedDate}</p>
          <p>Component: day-{formattedDate}</p>
        </div>
      </>
    );
  }

  return <DayComponent />;
};

export default MessagePage;
