import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../services/api";

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
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async ({ email, password }) => {
    console.log("signIn");
    try {
      const { data } = await api.post("/sessions", { email, password });
      const { user, token } = data;

      await AsyncStorage.setItem("CURSO_@GoBarber:token", token);
      await AsyncStorage.setItem("CURSO_@GoBarber:user", JSON.stringify(user));
      setData({ token, user });
    } catch (err) {
      throw new Error();
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem("CURSO_@GoBarber:token");
    await AsyncStorage.removeItem("CURSO_@GoBarber:user");

    setData({} as AuthState);
  }, []);

  useEffect(() => {
    async function LOAD() {
      const token = await AsyncStorage.getItem("CURSO_@GoBarber:token");
      const user = await AsyncStorage.getItem("CURSO_@GoBarber:user");

      if (token && user) {
        setData({
          user: JSON.parse(user),
          token,
        });
      }

      setLoading(false);
    }

    LOAD();
    loading;
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
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
