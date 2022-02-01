import { useContext, createContext, useCallback, useState } from "react";
import { ToastContainer } from "../components/ToastContainer";
interface ToastContextData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const Toastprovider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log("ADD");
  }, []);

  const removeToast = useCallback(() => {}, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
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
