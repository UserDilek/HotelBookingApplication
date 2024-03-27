import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import * as apiClient from "../apiClient";
import Toast from "../components/Toast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLogged: boolean;
};

// Create context with initial value of undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  const { isError } = useQuery("validateToken", apiClient.validateToken, { retry: false });

  return (
    <AppContext.Provider value={{
      showToast: (toastMessage) => {
        setToast(toastMessage);
      },
      isLogged: !isError
    }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />}
      {children}
    </AppContext.Provider>
  );
};

// Export the useAppContext hook separately
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
