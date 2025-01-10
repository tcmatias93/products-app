import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import GestureHandlerRootView from "react-native-gesture-handler";

import { useColorScheme } from "@/presentation/theme/hooks/useColorScheme";
import { View } from "react-native";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//Esto va en el punto mas alto de mi app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "background");
  const [loaded] = useFonts({
    KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
    KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
    KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}></Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </View>
    </QueryClientProvider>
  );
}
