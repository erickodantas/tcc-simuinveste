import React, { useEffect, useCallback, useState } from "react";
import { View } from "react-native";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import * as SplashScreen from "expo-splash-screen";
import { AppNavigator } from "../navigation/AppNavigator";
import { TelaSplash } from "./screens/TelaSplash"; // Importamos a tela

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#69c6dd",
    secondary: "#4a9cb0",
    background: "#f5f5f5",
    surface: "#ffffff",
  },
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showCustomSplash, setShowCustomSplash] = useState(true); // Controle da nossa Splash PNG

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();

      setShowCustomSplash(false);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme}>
        {}
        {showCustomSplash ? <TelaSplash /> : <AppNavigator />}
      </PaperProvider>
    </View>
  );
}
