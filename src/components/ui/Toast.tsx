// src/components/ui/Toast.tsx
import React, { useEffect } from "react";

interface ToastProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const Toast = ({ title, message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-slide-in-up">
      <div
        className={`rounded-lg shadow-lg p-4 backdrop-blur-md bg-black/30 text-white`}
      >
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm mt-1 opacity-90">{message}</p>
      </div>
    </div>
  );
};
