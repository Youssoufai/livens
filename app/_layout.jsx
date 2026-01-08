import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
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
  return (
    <RequestProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RequestProvider>
  );
}
