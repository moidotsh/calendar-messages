// src/components/Layout.tsx
import { useRouter } from "next/router";
import { AnimatedBackground } from "./AnimatedBackground";
import { useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log("Route change starting:", { from: router.pathname, to: url });
      setIsTransitioning(true);
    };

    const handleComplete = (url: string) => {
      console.log("Route change complete:", { to: url });
      // Give the browser a chance to paint before removing transition
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen bg-black">
      {isHomePage && (
        <div
          className={`fixed inset-0 transform-gpu transition-transform duration-700 ease-in-out will-change-transform ${
            isTransitioning ? "translate-y-full" : "translate-y-0"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <AnimatedBackground progress={0} />
        </div>
      )}

      <div
        className={`relative z-10 transform-gpu transition-opacity duration-700 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
