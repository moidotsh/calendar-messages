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
    const handleStart = () => setIsTransitioning(true);
    const handleComplete = () => setIsTransitioning(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen">
      {/* Only show background on home page */}
      {isHomePage && (
        <div
          className={`fixed inset-0 transition-transform duration-500 ease-in-out ${
            isTransitioning ? "translate-y-full" : "translate-y-0"
          }`}
        >
          <AnimatedBackground progress={0} />
        </div>
      )}

      {/* Page content with fade transition */}
      <div
        className={`relative z-10 transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
