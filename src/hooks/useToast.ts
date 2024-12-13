// hooks/useToast.ts
import { useState, useCallback } from "react";

interface ToastProps {
  title: string;
  message: string;
  variant?: "default" | "destructive";
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = useCallback((config: ToastProps) => {
    setToast(config);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast: showToast,
    hideToast,
    activeToast: toast,
  };
};
