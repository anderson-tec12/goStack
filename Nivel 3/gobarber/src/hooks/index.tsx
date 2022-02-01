import { AuthProvider } from "./AuthContext";
import { Toastprovider } from "./ToastContext";

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <Toastprovider>{children}</Toastprovider>
    </AuthProvider>
  );
};
