import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View
} from "react-native";

export default function NotificationSettings() {
    const [deviceToken, setDeviceToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const [pushRequest, setPushRequest] = useState(false);
    const [pushEarnings, setPushEarnings] = useState(false);
    const [pushOffers, setPushOffers] = useState(false);

    const [emailRequest, setEmailRequest] = useState(false);
    const [emailEarnings, setEmailEarnings] = useState(false);
    const [emailOffers, setEmailOffers] = useState(false);

    // -------------------------------
    // GET DEVICE TOKEN
    // -------------------------------
    const registerForPushNotifications = async () => {
        try {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                Alert.alert("Permission denied", "Enable notifications in settings.");
                return;
            }

            const projectId = Constants.expoConfig?.extra?.eas?.projectId;

            const tokenData = await Notifications.getExpoPushTokenAsync({
                projectId,
            });

            if (!tokenData?.data) {
                Alert.alert("Error", "Unable to fetch device token");
                return;
            }

            // Save token to React state
            setDeviceToken(tokenData.data);

            // Save to AsyncStorage (instant)
            await AsyncStorage.setItem("device_token", tokenData.data);

            Alert.alert("Device Token", tokenData.data);

            // Send to backend (first time)
            await saveDeviceToken(tokenData.data);
        } catch (err) {
            Alert.alert("Error", "Failed to register for notifications.");
        }
    };

    // -------------------------------
    // ALWAYS SEND TOKEN TO BACKEND
    // -------------------------------
    const saveDeviceToken = async (passedToken = null) => {
        setLoading(true);
        try {
            let finalToken = passedToken;

            if (!finalToken) {
                // Try to fetch from storage
                finalToken = await AsyncStorage.getItem("device_token");
            }

            if (!finalToken) {
                Alert.alert("Debug", "Still no token available.");
                setLoading(false);
                return;
            }

            Alert.alert("Debug", `Saving token: ${finalToken}`);

            const authToken = await getToken("token");

            const response = await fetch(`${BASE_URL}/device-token`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken.replace(/"/g, "")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    device_token: finalToken,
                    push_request: pushRequest,
                    push_earnings: pushEarnings,
                    push_offers: pushOffers,
                    email_request: emailRequest,
                    email_earnings: emailEarnings,
                    email_offers: emailOffers,
                }),
            });

            if (!response.ok) {
                Alert.alert(
                    "Backend Error",
                    "Failed to save notification settings."
                );
                setLoading(false);
                return;
            }

            Alert.alert("Success", "Notification settings updated.");
        } catch (err) {
            Alert.alert("Error", "Could not save device token.");
        } finally {
            setLoading(false);
        }
    };

    // -------------------------------
    // On Screen Open → Register Token
    // -------------------------------
    useFocusEffect(
        useCallback(() => {
            registerForPushNotifications();
        }, [])
    );

    // -------------------------------
    // Toggle Handler
    // -------------------------------
    const handleToggle = async (setter, value) => {
        setter(value);
        await saveDeviceToken(); // No token passed — it pulls from storage
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Notification Settings</Text>

            {loading && (
                <ActivityIndicator size="large" style={{ marginVertical: 10 }} />
            )}

            {/* Push Notifications */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Push Notifications</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Requests</Text>
                    <Switch
                        value={pushRequest}
                        onValueChange={(v) => handleToggle(setPushRequest, v)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Earnings</Text>
                    <Switch
                        value={pushEarnings}
                        onValueChange={(v) => handleToggle(setPushEarnings, v)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Offers</Text>
                    <Switch
                        value={pushOffers}
                        onValueChange={(v) => handleToggle(setPushOffers, v)}
                    />
                </View>
            </View>

            {/* Email Notifications */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Email Notifications</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Requests</Text>
                    <Switch
                        value={emailRequest}
                        onValueChange={(v) => handleToggle(setEmailRequest, v)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Earnings</Text>
                    <Switch
                        value={emailEarnings}
                        onValueChange={(v) => handleToggle(setEmailEarnings, v)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Offers</Text>
                    <Switch
                        value={emailOffers}
                        onValueChange={(v) => handleToggle(setEmailOffers, v)}
                    />
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
