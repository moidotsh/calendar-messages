// src/hooks/useDevMode.ts
import { create } from "zustand";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface DevModeState {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
}

const useDevModeStore = create<DevModeState>((set) => ({
  enabled: false,
  toggle: () => set((state) => ({ enabled: !state.enabled })),
  setEnabled: (enabled) => set({ enabled }),
}));

export const useDevMode = () => {
  const router = useRouter();
  const { enabled, toggle, setEnabled } = useDevModeStore();

  useEffect(() => {
    // Check for URL parameter
    const devMode = router.query.dev === "true";
    if (devMode !== enabled) {
      setEnabled(devMode);
    }

    // Add keyboard shortcut (Ctrl/Cmd + Shift + D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "D") {
        e.preventDefault();
        toggle();

        // Update URL without navigation
        const newQuery = { ...router.query };
        if (!enabled) {
          newQuery.dev = "true";
        } else {
          delete newQuery.dev;
        }
        router.replace(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true },
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, enabled, toggle, setEnabled]);

  // Also check for environment variable
  const devModeEnv = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  return enabled || devModeEnv;
};
