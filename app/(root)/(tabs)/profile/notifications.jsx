import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Device from "expo-device";

export default function NotificationsScreen() {
    const [pushRequest, setPushRequest] = useState(false);
    const [pushEarnings, setPushEarnings] = useState(false);
    const [pushOffers, setPushOffers] = useState(false);

    const [emailRequest, setEmailRequest] = useState(false);
    const [emailEarnings, setEmailEarnings] = useState(false);
    const [emailOffers, setEmailOffers] = useState(false);

    useEffect(() => {
        registerForPushNotifications();
    }, []);

    const registerForPushNotifications = async () => {
        // ❗ Prevent Expo Go Android error
        if (Platform.OS === "android" && Constants.appOwnership === "expo") {
            console.warn(
                "Push notifications not supported in Expo Go on Android. Use a dev build."
            );
            return;
        }

        if (!Device.isDevice) {
            alert("Push notifications require a physical device.");
            return;
        }

        const { status } = await Notifications.getPermissionsAsync();
        let finalStatus = status;

        if (finalStatus !== "granted") {
            const { status: reqStatus } = await Notifications.requestPermissionsAsync();
            finalStatus = reqStatus;
        }

        if (finalStatus !== "granted") {
            alert("Permission denied!");
            return;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });

        const deviceToken = tokenData.data;
        console.log("Expo Device Token:", deviceToken);

        await saveDeviceToken(deviceToken);
    };

    const saveDeviceToken = async (deviceToken = null) => {
        try {
            const token = await getToken();

            await fetch(`${BASE_URL}/device-token`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    device_token: deviceToken,
                    push_request: pushRequest,
                    push_earnings: pushEarnings,
                    push_offers: pushOffers,
                    email_request: emailRequest,
                    email_earnings: emailEarnings,
                    email_offers: emailOffers,
                }),
            });
        } catch (err) {
            console.log("Error saving token:", err);
        }
    };

    const updateSettings = async (type, value) => {
        switch (type) {
            case "pushRequest": setPushRequest(value); break;
            case "pushEarnings": setPushEarnings(value); break;
            case "pushOffers": setPushOffers(value); break;
            case "emailRequest": setEmailRequest(value); break;
            case "emailEarnings": setEmailEarnings(value); break;
            case "emailOffers": setEmailOffers(value); break;
        }

        // Save settings instantly (no deviceToken needed)
        saveDeviceToken();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    <View style={{ width: 24 }} />
                </View>

                <Text style={styles.sectionTitle}>Push Notifications</Text>

                <ToggleRow
                    title="Request updates"
                    desc="Receive alerts for new requests or status changes."
                    value={pushRequest}
                    onValueChange={(v) => updateSettings("pushRequest", v)}
                />

                <ToggleRow
                    title="Earnings and transactions"
                    desc="Be notified instantly for earnings and withdrawals."
                    value={pushEarnings}
                    onValueChange={(v) => updateSettings("pushEarnings", v)}
                />

                <ToggleRow
                    title="Promotions and offers"
                    desc="Stay informed about deals and new features."
                    value={pushOffers}
                    onValueChange={(v) => updateSettings("pushOffers", v)}
                />

                <Text style={styles.sectionTitle}>Email Notifications</Text>

                <ToggleRow
                    title="Request updates"
                    desc="Receive alerts for new requests or status changes."
                    value={emailRequest}
                    onValueChange={(v) => updateSettings("emailRequest", v)}
                />

                <ToggleRow
                    title="Earnings and transactions"
                    desc="Be notified instantly for earnings and withdrawals."
                    value={emailEarnings}
                    onValueChange={(v) => updateSettings("emailEarnings", v)}
                />

                <ToggleRow
                    title="Promotions and offers"
                    desc="Get important product updates and offers."
                    value={emailOffers}
                    onValueChange={(v) => updateSettings("emailOffers", v)}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const ToggleRow = ({ title, desc, value, onValueChange }) => (
    <View style={styles.row}>
        <View style={{ flex: 1 }}>
            <Text style={styles.rowTitle}>{title}</Text>
            <Text style={styles.rowDesc}>{desc}</Text>
        </View>
        <Switch value={value} onValueChange={onValueChange} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        marginTop: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000"
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 10,
        color: "#000"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 15
    },
    rowTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000"
    },
    rowDesc: {
        fontSize: 12,
        color: "#777",
        marginTop: 3
    }
});
