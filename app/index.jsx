import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getToken } from "./utils/secureStore";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken("token");
        console.log("TOKEN FOUND IN INDEX:", token);

        // Defer navigation until router/RootLayout is mounted.
        // Using setTimeout lets the router finish initializing.
        if (token && token.length > 0) {

          setTimeout(() => router.replace("/(root)/(tabs)/search"), 50);

        } else {
          setTimeout(() => router.replace("/(onboarding)/onboarding"), 50);
        }
      } catch (error) {
        console.log("Token check error:", error);
        setTimeout(() => router.replace("/(auth)/login"), 50);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#de1c1c" />
      </View>
    );
  }

  return null; // nothing else should render
}
