import MainScreen from "./src/view/screens/MainScreen";
import React from "react";
import { SafeAreaView, StatusBar,StyleSheet } from "react-native";
import { T } from "./src/view/design-system/theme";
import { Provider } from "react-redux";
import store from "./src/core/redux/store";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={T.colors.lightBlue} />
      <Provider store={store}>
      <MainScreen />
      </Provider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: T.colors.lightBlue,
  },})