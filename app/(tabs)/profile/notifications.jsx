import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Switch, Text, View } from "react-native";

import { initDeviceToken } from "@/app/utils/deviceToken"; // Only OneSignal
import { getToken } from "@/app/utils/secureStore";
import { BASE_URL } from "@/constants/url";

export default function NotificationSettings() {
    const [loading, setLoading] = useState(false);

    const [pushRequest, setPushRequest] = useState(false);
    const [pushEarnings, setPushEarnings] = useState(false);
    const [pushOffers, setPushOffers] = useState(false);

    const [emailRequest, setEmailRequest] = useState(false);
    const [emailEarnings, setEmailEarnings] = useState(false);
    const [emailOffers, setEmailOffers] = useState(false);

    // -------------------------------
    // Save settings + send device token to backend
    // -------------------------------
    const saveSettings = async () => {
        setLoading(true);
        try {
            // Ensure the OneSignal player ID is stored
            await initDeviceToken();

            const token = await getToken("token");
            if (!token) {
                Alert.alert("Error", "No authentication token found.");
                setLoading(false);
                return;
            }

            const response = await fetch(`${BASE_URL}/device-token`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    device_token: await getToken("device_token"), // OneSignal ID from secure store
                    push_request: pushRequest,
                    push_earnings: pushEarnings,
                    push_offers: pushOffers,
                    email_request: emailRequest,
                    email_earnings: emailEarnings,
                    email_offers: emailOffers,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update notification settings.");
            }

            Alert.alert("Success", "Notification settings updated.");
        } catch (err) {
            console.error("Notification settings error:", err);
            Alert.alert("Error", err.message || "Failed to save settings.");
        } finally {
            setLoading(false);
        }
    };

    // -------------------------------
    // Focus Effect → ensure OneSignal ID is synced
    // -------------------------------
    useFocusEffect(
        useCallback(() => {
            initDeviceToken();
        }, [])
    );

    // -------------------------------
    // Toggle handler
    // -------------------------------
    const handleToggle = async (setter, value) => {
        setter(value);
        await saveSettings();
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Notification Settings</Text>

            {loading && <ActivityIndicator size="large" style={{ marginVertical: 10 }} />}

            {/* Push Notifications */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Push Notifications</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Requests</Text>
                    <Switch value={pushRequest} onValueChange={(v) => handleToggle(setPushRequest, v)} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Earnings</Text>
                    <Switch value={pushEarnings} onValueChange={(v) => handleToggle(setPushEarnings, v)} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Offers</Text>
                    <Switch value={pushOffers} onValueChange={(v) => handleToggle(setPushOffers, v)} />
                </View>
            </View>

            {/* Email Notifications */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Email Notifications</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Requests</Text>
                    <Switch value={emailRequest} onValueChange={(v) => handleToggle(setEmailRequest, v)} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Earnings</Text>
                    <Switch value={emailEarnings} onValueChange={(v) => handleToggle(setEmailEarnings, v)} />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Offers</Text>
                    <Switch value={emailOffers} onValueChange={(v) => handleToggle(setEmailOffers, v)} />
                </View>
            </View>
        </ScrollView>
    );
}

// -------------------------------
// STYLES
// -------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 15,
    },
    section: {
        marginBottom: 25,
        padding: 15,
        backgroundColor: "#f6f6f6",
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    label: {
        fontSize: 16,
    },
});
