// src/components/ui/Toast.tsx
import React, { useEffect } from "react";

interface ToastProps {
  title: string;
  message: string;
  variant?: "default" | "destructive";
  onClose: () => void;
}

export const Toast = ({
  title,
  message,
  variant = "default",
  onClose,
}: ToastProps) => {
  useEffect(() => {
    console.log("Toast mounted with:", { title, message, variant });
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose, title, message, variant]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-slide-in-up">
      <div
        className={`rounded-lg shadow-lg p-4 ${
          variant === "destructive" ? "bg-red-500/90" : "bg-black/90"
        } text-white`}
      >
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm mt-1 opacity-90">{message}</p>
      </div>
    </div>
  );
};
