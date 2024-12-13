// src/hooks/useToast.ts
import { create } from "zustand";

interface ToastState {
  toast: ToastMessage | null;
  showToast: (message: ToastMessage) => void;
  hideToast: () => void;
}

interface ToastMessage {
  title: string;
  message: string;
  variant?: "default" | "destructive";
}

const useToastStore = create<ToastState>((set) => ({
  toast: null,
  showToast: (message) => set({ toast: message }),
  hideToast: () => set({ toast: null }),
}));

export const useToast = () => {
  const { toast, showToast, hideToast } = useToastStore();

  return {
    toast: showToast,
    hideToast,
    activeToast: toast,
  };
};
