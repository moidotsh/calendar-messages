// components/ui/Toast.tsx
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  title?: string;
  variant?: "default" | "destructive";
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  title,
  variant = "default",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = variant === "destructive" ? "bg-red-500/80" : "bg-black/80";

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-in-up">
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm`}
      >
        {title && <h3 className="font-semibold mb-1">{title}</h3>}
        <p className="text-sm opacity-90">{message}</p>
      </div>
    </div>
  );
};
