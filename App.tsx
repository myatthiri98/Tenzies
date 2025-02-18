import MainScreen from "./src/view/screens/MainScreen";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { T } from "./src/view/design-system/theme";
import { Provider } from "react-redux";
import store from "./src/core/redux/store";
import * as ExpoListInstalledApps from "expo-list-installed-apps";
import { InstalledApp } from "expo-list-installed-apps/build/ExpoListInstalledApps.types";
import AppList from "./src/view/screens/AppList"; // Adjust the path as necessary

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={T.colors.lightBlue}
      />
      <Provider store={store}>
        {/* <MainScreen /> */}
        <AppList />
      </Provider>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: T.colors.lightBlue,
  },
});
