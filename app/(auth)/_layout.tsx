// app/(auth)/_layout.tsx
import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="signup" />
            {/* Later you can add login, signup, etc. */}
        </Stack>
    );
}
