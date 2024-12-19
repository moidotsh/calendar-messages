// src/hooks/useToast.ts
import { create } from "zustand";

interface ToastMessage {
  title: string;
  content: string;
  countdown?: string | null;
  variant?: "default" | "destructive";
}

interface ToastState {
  toast: ToastMessage | null;
  showToast: (message: ToastMessage) => void;
  hideToast: () => void;
}

const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message) => set({ toast: message }),
  hideToast: () => set({ toast: null }),
}));

export const useToast = () => {
  const { toast: activeToast, showToast, hideToast } = useToastStore();

  return {
    toast: showToast,
    hideToast,
    activeToast,
  };
};
