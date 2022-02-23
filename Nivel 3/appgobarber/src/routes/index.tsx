import React from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuthProvider } from "../hooks/AuthContext";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

const Routes: React.FC = () => {
  const { user, loading } = useAuthProvider();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
