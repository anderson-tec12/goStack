import { Omit } from "@unform/core";
import { useContext, createContext, useCallback, useState } from "react";
import { v4 } from "uuid";
import { ToastContainer } from "../components/ToastContainer";

interface ToastMessage {
  id: string;
  type?: "success" | "error" | "info";
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, "id">): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const Toastprovider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: Omit<ToastMessage, "id">) => {
    const id = v4();
    const toast = { id, ...message };
    setMessages((OldState) => [...OldState, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((oldState) => oldState.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextData => {
  const constext = useContext(ToastContext);

  if (!constext) {
    throw new Error("UseToast  must be used within a ToastProvider");
  }

  return constext;
};
