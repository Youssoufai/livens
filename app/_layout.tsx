import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
// ✅ OneSignal imports
import { LogLevel, OneSignal } from "react-native-onesignal";

import { RequestProvider } from "./context/requestContext";


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
    const init = async () => {
      OneSignal.Debug.setLogLevel(LogLevel.Verbose);

      await OneSignal.initialize("ab35b02e-e56d-4e83-86ca-ca3ad162e87a");

      await OneSignal.Notifications.requestPermission(false);
    };

    init();

  }, []);



  return (
    <RequestProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </RequestProvider>
  );
}
