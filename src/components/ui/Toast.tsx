// src/components/ui/Toast.tsx
import { useEffect } from "react";

interface ToastMessage {
  title: string;
  content: string;
  countdown?: string | null;
}

interface ToastProps {
  title: string;
  message: ToastMessage;
  onClose: () => void;
}

export const Toast = ({ title, message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-slide-in-up">
      <div className="rounded-lg shadow-lg p-4 backdrop-blur-md bg-black/30 text-white space-y-2">
        <h4 className="font-semibold">{title}</h4>
        <div className="space-y-2">
          <p className="text-sm opacity-90">{message.content}</p>
          {message.countdown && (
            <p className="text-sm opacity-90 pt-2">{message.countdown}</p>
          )}
        </div>
      </div>
    </div>
  );
};
