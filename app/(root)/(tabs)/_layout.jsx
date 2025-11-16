import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "red",
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0.5,
                    borderTopColor: "#ddd",
                    height: 60,
                    paddingBottom: 8,
                },
            }}
        >
            <Tabs.Screen
                name="search"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="requests"
                options={{
                    title: "Request",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="chatbubbles" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bookmark" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
