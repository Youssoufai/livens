import { Stack } from "expo-router";

export default function SavedLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // hide headers across all nested screens
                animation: "slide_from_right", // smooth transitions between screens
            }}
        />
    );
}
