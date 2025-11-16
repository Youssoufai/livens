import { BASE_URL } from "@/app/constants/url";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export default function RequestDetails() {


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 12 }}>
                    Request details
                </Text>
            </View>

            {/* Tabs */}
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
                    tabBarIndicatorStyle: { backgroundColor: "#000" },
                    tabBarActiveTintColor: "#000",
                    tabBarInactiveTintColor: "#888",
                }}
            >
                <Tab.Screen name="Overview">
                    {() => <OverviewTab />}
                </Tab.Screen>
                <Tab.Screen name="Responders" component={RespondersTab} />
                <Tab.Screen name="Status" component={StatusTab} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

function OverviewTab() {

    const [request, setRequest] = React.useState(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchRequest = async () => {
        const res = await fetch(`${BASE_URL}/requests`);
        const data = await res.json();
        setRequest(data);
    }
    React.useEffect(() => {
        fetchRequest();
    }, [fetchRequest]);

    ;

    if (!request) return <Text>Loading...</Text>;

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Unknown
            </Text>

            <Text style={{ color: "#555" }}>By {request.name || "Unknown"}</Text>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Ionicons name="location-outline" size={18} color="#000" />
                <Text style={{ marginLeft: 6 }}>Unknown</Text>
            </View>

            <Text style={{ marginTop: 20 }}>Unknown</Text>
        </ScrollView>
    );
}

function RespondersTab() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No responders yet.</Text>
        </View>
    );
}

function StatusTab() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Status: Pending</Text>
        </View>
    );
}
