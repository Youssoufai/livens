import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  // ✅ Remove all token checking logic from layout
  // Let index.jsx handle the routing
  console.log("ONBOARDING MOUNTED");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(root)" />
    </Stack>
  );
}