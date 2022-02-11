import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, StatusBar } from "react-native";

import { AuthRoutes } from "./routes";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e31"
        hidden={false}
      />
      <View
        style={{
          backgroundColor: "#312e31",
          flex: 1,
        }}
      >
        <AuthRoutes />
      </View>
    </NavigationContainer>
  );
};

export default App;
