// src/pages/message/[date].tsx
import { useRouter } from "next/router";
import { useState } from "react";
import TinaVerification from "@/components/TinaVerification";
import dynamic from "next/dynamic";
import { useDevMode } from "@/hooks/useDevMode";

const MessagePage = () => {
  const router = useRouter();
  const { date } = router.query;
  const [isVerified, setIsVerified] = useState(false);
  const devMode = useDevMode();

  // Early return if no date
  if (!date || typeof date !== "string") {
    return null;
  }

  // Format date to match component naming (remove dashes)
  const formattedDate = date.replace(/-/g, "");

  // Dynamically import the day component
  const DayComponent = dynamic(
    () =>
      import(`@/components/days/day-${formattedDate}`).catch(() => {
        // If component doesn't exist, redirect to home
        router.push("/");
        return () => null;
      }),
    {
      loading: () => (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ),
      ssr: false, // Each day might have different dependencies, safer to disable SSR
    },
  );

  // Skip verification if in dev mode or if NEXT_PUBLIC_SKIP_VERIFICATION is true
  if (!devMode && !process.env.NEXT_PUBLIC_SKIP_VERIFICATION && !isVerified) {
    return <TinaVerification onSuccess={() => setIsVerified(true)} />;
  }

  return <DayComponent />;
};

export default MessagePage;
