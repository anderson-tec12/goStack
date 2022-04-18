import React from "react";
import { View, Text, Button } from "react-native";

import { useAuthProvider } from "../../hooks/AuthContext";
export const Dashboard: React.FC = () => {
  const { signOut } = useAuthProvider();
  return (
    <View>
      <Text>OLAAA</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
};
