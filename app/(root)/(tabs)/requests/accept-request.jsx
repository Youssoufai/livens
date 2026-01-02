import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CinemaRequestScreen = () => {
    const { request_id } = useLocalSearchParams();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchRequest();
    }, []);

    const fetchRequest = async () => {
        try {
            const token = await getToken("token");

            const res = await fetch(`${BASE_URL}/temp-response`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token?.replace(/"/g, "")}`,
                },
            });

            const json = await res.json();

            // temp-response may return { data: {...} } or just {...}
            setData(json?.data || json);
        } catch (err) {
            console.log("❌ Fetch request error:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.loader}>
                <ActivityIndicator size="large" color="#ff3b30" />
            </SafeAreaView>
        );
    }

    if (error || !data) {
        return (
            <SafeAreaView style={styles.loader}>
                <Text style={{ color: "#666" }}>Failed to load request.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {data.title || "Request Details"}
                    </Text>

                    <Ionicons name="ellipsis-vertical" size={20} color="#000" />
                </View>

                {/* Reward */}
                <Text style={styles.price}>₦{data.reward}</Text>

                {/* User Card */}
                <View style={styles.card}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{
                                uri:
                                    data.user?.avatar ||
                                    "https://ui-avatars.com/api/?name=User",
                            }}
                            style={styles.avatar}
                        />
                        <Text style={styles.userName}>
                            {data.user?.name || "Unknown User"}
                        </Text>
                    </View>

                    <InfoRow icon="location-outline" text={data.location} />
                    <InfoRow
                        icon="time-outline"
                        text={`Duration: ${data.duration}`}
                    />
                </View>

                {/* Description */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {data.description}
                    </Text>
                </View>

                {/* CTA */}
                <TouchableOpacity
                    style={styles.offerButton}
                    onPress={() =>
                        router.push({
                            pathname:
                                "/(root)/(tabs)/requests/captureContent",
                            params: {
                                request_id: String(request_id || data.id),
                            },
                        })
                    }
                >
                    <Text style={styles.offerButtonText}>Offer to help</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CinemaRequestScreen;

/* ---------- Small Components ---------- */

const InfoRow = ({ icon, text }) => (
    <View style={styles.infoRow}>
        <Ionicons name={icon} size={18} color="#666" />
        <Text style={styles.infoText}>{text || "—"}</Text>
    </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    content: { padding: 20 },

    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        textAlign: "center",
    },

    price: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 10,
    },

    card: {
        marginTop: 15,
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#eee",
    },

    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 10,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    userName: {
        fontSize: 16,
        fontWeight: "600",
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 6,
    },

    infoText: {
        fontSize: 14,
        color: "#555",
    },

    descriptionSection: {
        marginTop: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    descriptionText: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
    },

    offerButton: {
        backgroundColor: "#ff3b30",
        marginTop: 25,
        paddingVertical: 14,
        borderRadius: 10,
    },

    offerButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});
