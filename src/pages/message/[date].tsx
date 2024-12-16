// pages/message/[date].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDevMode } from "@/hooks/useDevMode"; // Add this import

const MessagePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const devMode = useDevMode(); // Add this
  const [isValidDate, setIsValidDate] = useState<boolean | null>(null);

  useEffect(() => {
    if (!date) return;

    // Parse the date and compare with today
    const messageDate = new Date(date as string);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Only redirect if not in dev mode and trying to access a future date
    if (messageDate > today && !devMode) {
      router.push("/");
      return;
    }

    setIsValidDate(true);
  }, [date, router, devMode]);

  // Show nothing while checking date validity
  if (isValidDate === null) return null;

  // Only render content if date is valid
  if (!isValidDate) return null;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Message for {date}</h1>
        <p className="text-xl text-gray-400">Coming soon...</p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
        >
          Back to Calendar
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
