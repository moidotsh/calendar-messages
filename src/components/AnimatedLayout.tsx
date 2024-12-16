// src/components/AnimatedLayout.tsx
import { useRouter } from "next/router";
import { AnimatedBackground } from "./AnimatedBackground";
import { useEffect, useState } from "react";

interface AnimatedLayoutProps {
  children: React.ReactNode;
  progress?: number; // Optional progress for home page
}

export const AnimatedLayout = ({
  children,
  progress = 0,
}: AnimatedLayoutProps) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    const handleRouteStart = () => setIsTransitioning(true);
    const handleRouteComplete = () => setIsTransitioning(false);

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router]);

  return (
    <div className="relative min-h-screen">
      {/* Background with transition */}
      <div
        className={`fixed inset-0 transition-transform duration-700 ease-in-out ${
          isTransitioning ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <AnimatedBackground progress={progress} />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-700 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
