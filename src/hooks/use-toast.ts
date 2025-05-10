
import { useState, useCallback } from "react";

// Updated to match the expected types in the Toast component
type ToastType = "default" | "destructive";

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
  type?: ToastType;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
}

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  type?: ToastType;
  action?: React.ReactNode;
}

const toasts: ToastProps[] = [];

export function useToast() {
  const [_, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      id,
      title: options.title,
      description: options.description,
      duration: options.duration ?? 5000,
      type: options.type ?? "default",
      action: options.action,
    };

    toasts.push(newToast);
    setToasts([...toasts]);

    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        const index = toasts.findIndex((t) => t.id === id);
        if (index !== -1) {
          toasts.splice(index, 1);
          setToasts([...toasts]);
        }
      }, newToast.duration);
    }

    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.splice(index, 1);
      setToasts([...toasts]);
    }
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}

export const toast = (options: ToastOptions) => {
  // This is a simplified version for direct imports
  // Actual implementation would match the hook above
  console.log("Toast:", options);
};
