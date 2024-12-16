// src/pages/index.tsx
import { useRouter } from "next/router";
import { useState } from "react";
import HorizontalCalendar from "@/components/HorizontalCalendar";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handlePageTransition = async (path: string) => {
    setIsTransitioning(true);
    // Wait for animation to complete before changing routes
    await new Promise((resolve) => setTimeout(resolve, 700)); // Match duration with CSS
    router.push(path);
  };

  return (
    <div className="relative min-h-screen">
      <div
        className={`fixed inset-0 transition-transform duration-700 ease-in-out ${
          isTransitioning ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <AnimatedBackground progress={0} />
      </div>

      <div className="relative z-10">
        <HorizontalCalendar onNavigate={handlePageTransition} />
      </div>
    </div>
  );
}
