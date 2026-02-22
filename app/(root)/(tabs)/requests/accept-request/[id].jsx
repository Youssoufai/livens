import { BASE_URL } from "@/app/constants/url";
import { styles } from "@/app/styles/OffertoHelp";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CinemaRequestScreen = () => {

    const { request_id } = useLocalSearchParams();

    // ✅ Normalize param
    const requestId = Array.isArray(request_id)
        ? request_id[0]
        : request_id;

    const [loading, setLoading] = useState(true);
    const [offering, setOffering] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);

    /* ---------------- FETCH REQUEST DETAILS ---------------- */

    useEffect(() => {
        if (requestId) {
            fetchRequestDetails();
        }
    }, [requestId]);

    const fetchRequestDetails = async () => {
        try {
            const token = await getToken("token");

            if (!token) throw new Error("Session expired");

            const res = await fetch(`${BASE_URL}/get-request/${requestId}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            });

            const result = await res.json();

            console.log("Request details:", result);

            const requestData = Array.isArray(result?.data)
                ? result.data[0]
                : result?.data;

            setData(requestData || null);

        } catch (err) {
            console.log("❌ Failed to fetch request details:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- OFFER TO HELP ---------------- */

    const offerToHelp = async () => {
        try {
            setOffering(true);

            const token = await getToken("token");

            if (!token) throw new Error("Session expired");

            const res = await fetch(`${BASE_URL}/temp-response`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
                body: JSON.stringify({
                    request_id: requestId,
                }),
            });
            console.log("Offer help response id:", requestId);
            const result = await res.json();

            console.log("Offer help response:", result);

            if (!res.ok) {
                throw new Error(result?.message || "Failed to offer help");
            }

            // ✅ Navigate after success
            router.push({
                pathname: "/(root)/(tabs)/requests/captureContent",
                params: {
                    request_id: String(requestId),
                },
            });

        } catch (err) {
            console.log("❌ Offer help error:", err);
            Alert.alert("Error", err.message || "Something went wrong");
        } finally {
            setOffering(false);
        }
    };

    /* ---------------- LOADING STATE ---------------- */

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
                <Text style={{ color: "#666" }}>
                    Failed to load request.
                </Text>
            </SafeAreaView>
        );
    }

    /* ---------------- UI ---------------- */

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle} numberOfLines={1}>
                        Request Details
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

                {/* Offer Button */}
                <TouchableOpacity
                    style={styles.offerButton}
                    onPress={offerToHelp}
                    disabled={offering}
                >
                    {offering ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.offerButtonText}>
                            Offer to help
                        </Text>
                    )}
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

export default CinemaRequestScreen;

/* ---------------- SMALL COMPONENT ---------------- */

const InfoRow = ({ icon, text }) => (
    <View style={styles.infoRow}>
        <Ionicons name={icon} size={18} color="#666" />
        <Text style={styles.infoText}>{text || "—"}</Text>
    </View>
);
