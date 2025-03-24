import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider as AntdProvider } from "@ant-design/react-native";
import en_US from "@ant-design/react-native/lib/locale-provider/en_US";

import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rootStore, StoreProvider } from "@/modules/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    antoutline: require("@ant-design/icons-react-native/fonts/antoutline.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const queryClient = new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     gcTime: 5 * 60 * 1000,
    //     staleTime: 30 * 1000,
    //     refetchOnWindowFocus: false,
    //     refetchOnReconnect: true,
    //     refetchInterval: 60 * 1000
    //   },
    // },
  });

  return (
    <StoreProvider value={rootStore}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AntdProvider locale={en_US}>
            <Stack>
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </AntdProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}
