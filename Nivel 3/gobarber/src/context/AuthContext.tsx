import React, { createContext, useCallback, useContext, useState } from "react";
import { Api } from "../services/apiClient";

interface CredentialsProps {
  email: string;
  password: string;
}

interface AuthState {
  token: string;
  user: object;
}

interface AuthContextData {
  user: object;
  signIn(credentials: CredentialsProps): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("CURSO_@GoBarber:token");
    const user = localStorage.getItem("CURSO_@GoBarber:user");

    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    console.log("signIn");
    try {
      const { data } = await Api.post("/sessions", { email, password });
      const { user, token } = data;

      localStorage.setItem("CURSO_@GoBarber:token", token);
      localStorage.setItem("CURSO_@GoBarber:user", JSON.stringify(user));
      setData({ token, ...user });
    } catch (err) {}
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProvider = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
