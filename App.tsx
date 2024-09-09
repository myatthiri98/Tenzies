import MainScreen from "./src/view/screens/MainScreen";
import React from "react";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainScreen />
    </SafeAreaView>
  );
}
