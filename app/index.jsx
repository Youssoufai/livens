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

        if (token && token.length > 0) {
          router.replace("/(root)/(tabs)/search");
        } else {
          router.replace("/(onboarding)/onboarding");
        }
      } catch (error) {
        console.log("Token check error:", error);
        router.replace("/(auth)/login");
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
