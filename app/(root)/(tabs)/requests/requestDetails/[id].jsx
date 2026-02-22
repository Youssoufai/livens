import Overveiw from "@/app/components/Overveiw";
import { ResponderTab } from "@/app/components/respondersTab";
import StatusTab from "@/app/components/statusTab";
import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestDetails() {


    const { id } = useLocalSearchParams();
    console.log("Received ID:", id);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");

    // ✅ Fetch request details
    const fetchRequestDetails = async () => {
        try {
            const token = await getToken("token");

            const res = await fetch(`${BASE_URL}/get-request/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            });

            const result = await res.json();
            console.log("Request details:", result);
            setRequest(result?.data?.[0] || null);

        } catch (err) {
            console.log("Failed to fetch request details:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchRequestDetails();
        }
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    if (!request) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Request not found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Header */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 16,
                borderBottomWidth: 1,
                borderColor: "#eee",
            }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>

                <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 12 }}>
                    Request details
                </Text>
            </View>

            {/* Tabs */}
            <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#eee" }}>
                {["overview", "responders", "status"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={{
                            flex: 1,
                            paddingVertical: 12,
                            alignItems: "center",
                            borderBottomWidth: activeTab === tab ? 2 : 0,
                        }}
                    >
                        <Text style={{ fontWeight: activeTab === tab ? "600" : "400" }}>
                            {tab === "overview"
                                ? "Overview"
                                : tab === "responders"
                                    ? "Responders"
                                    : "Status"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {activeTab === "overview" && (
                    <Overveiw data={request} />

                )}

                {activeTab === "responders" && (
                    <ResponderTab responders={request.responders || []} requestId={id} />
                )}

                {activeTab === "status" && (
                    <StatusTab statusResponse={request.status} requestId={id} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
