import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "AnekTamil-Regular": require("../assets/fonts/AnekTamil-Regular.ttf"),
    "AnekTamil-Medium": require("../assets/fonts/AnekTamil-Medium.ttf"),
    "AnekTamil-SemiBold": require("../assets/fonts/AnekTamil-SemiBold.ttf"),
    "AnekTamil-Bold": require("../assets/fonts/AnekTamil-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setPositionAsync("absolute");
      NavigationBar.setBackgroundColorAsync("#00000000");
    }
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
