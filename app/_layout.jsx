import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { RequestProvider } from "./context/requestContext";

// ✅ OneSignal imports
import { LogLevel, OneSignal } from "react-native-onesignal";

WebBrowser.maybeCompleteAuthSession();

const tokenCache = {
  async getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key, value) {
    return SecureStore.setItemAsync(key, value);
  },
};

export default function RootLayout() {
  useEffect(() => {
    // 🔍 Verbose logging for development (remove in production)
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // 🚀 Initialize OneSignal
    OneSignal.initialize(process.env.EXPO_PUBLIC_ONESIGNAL_APP_ID);

    // 🔔 Request notification permission (iOS)
    // Recommended only for testing — later use In-App Messages
    OneSignal.Notifications.requestPermission(false);
  }, []);

  return (
    <RequestProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RequestProvider>
  );
}
