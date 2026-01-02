import Overveiw from "@/app/components/Overveiw";
import { ResponderTab } from "@/app/components/respondersTab";
import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusTab from "../../../components/statusTab";

export default function RequestDetails() {
    const params = useLocalSearchParams();
    const { request: requestParam } = params;

    // Tabs
    const [activeTab, setActiveTab] = useState("overview");

    // Responders state
    const [responders, setResponders] = useState([]);
    const [loadingResponders, setLoadingResponders] = useState(false);

    // Parse request param safely
    let data = {};
    try {
        data = requestParam ? JSON.parse(requestParam) : {};
    } catch (err) {
        console.warn("Failed to parse request param:", requestParam);
        console.warn("Failed to parse request param:", err);
    }





    // Fetch responders
    const fetchResponders = async () => {
        try {
            setLoadingResponders(true);
            const token = await getToken("token");
            const res = await fetch(`${BASE_URL}/get-response/1`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            });

            const result = await res.json();
            setResponders(result?.data || []);
        } catch (error) {
            console.log("Failed to fetch responders:", error);
        } finally {
            setLoadingResponders(false);
        }
    };

    // Fetch only when responders tab is active
    useEffect(() => {
        if (activeTab === "responders") {
            fetchResponders();
        }
    }, [activeTab]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: 12 }}>
                    Request details
                </Text>

                <View style={{ marginLeft: "auto" }}>
                    <Ionicons name="ellipsis-horizontal" size={22} color="#000" />
                </View>
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
                            borderBottomColor: "#000",
                        }}
                    >
                        <Text style={{ fontSize: 14, fontWeight: activeTab === tab ? "600" : "400" }}>
                            {tab === "overview"
                                ? "Overview"
                                : tab === "responders"
                                    ? `Responders (${responders.length})`
                                    : "Status"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {activeTab === "overview" && (
                    <Overveiw
                        title={data?.title}
                        name={data?.name}
                        location={data?.location}
                        address={data?.address}
                        duration={data?.duration}
                        ends_in={data?.ends_in}
                        description={data?.description}
                    />
                )}

                {activeTab === "responders" && (
                    <ResponderTab loadingResponders={loadingResponders} responders={responders} />
                )}

                {activeTab === "status" && (
                    <StatusTab
                        loadingStatus={loadingStatus}
                        statusResponse={statusResponse}
                    />
                )}


            </ScrollView>

            {/* Bottom Button */}
            <View style={{ padding: 16, borderTopWidth: 1, borderColor: "#eee" }}>
                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/(root)/(tabs)/requests/edit-request",
                            params: { request: JSON.stringify(data) },
                        })
                    }
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingVertical: 14,
                        borderRadius: 30,
                    }}
                >
                    <Text style={{ textAlign: "center", fontWeight: "600" }}>
                        Edit request details
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
