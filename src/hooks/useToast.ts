import { create } from "zustand";

interface ToastMessage {
  title: string;
  message: string;
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
    activeToast, // Now this matches what we're using in _app.tsx
  };
};
