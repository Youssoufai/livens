import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user"); // stored after register/login
        if (user) {
          router.replace("/(root)/(tabs)/requests"); // user exists → go to home tabs
        } else {
          router.replace("/(onboarding)/onboarding"); // no user → go to onboarding
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return null;
}
