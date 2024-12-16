// src/components/Layout.tsx
import { useRouter } from "next/router";
import { AnimatedBackground } from "./AnimatedBackground";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleStart = () => {
      setIsLeaving(true);
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    const handleComplete = () => {
      setIsLeaving(false);
      setIsEntering(true);
      // Remove entering class after animation completes
      timeoutRef.current = setTimeout(() => {
        setIsEntering(false);
      }, 500);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [router]);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background with animations */}
      {isHomePage && (
        <div
          className={`
            fixed inset-0
            transition-transform duration-500 ease-in-out
            ${isLeaving ? "animate-slide-down" : ""}
          `}
        >
          <AnimatedBackground progress={0} />
        </div>
      )}

      {/* Content with animations */}
      <div
        className={`
          relative z-10
          ${isLeaving ? "animate-fade-out" : ""}
          ${isEntering ? "animate-fade-in" : ""}
        `}
      >
        {children}
      </div>
    </div>
  );
};
