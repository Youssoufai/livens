import { Stack } from "expo-router";

export default function SearchLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // hide headers across all nested screens
                animation: "slide_from_right", // smooth transitions between screens
            }}
        />
    );
}
