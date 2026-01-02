import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import PaystackWebView, { PaystackProvider } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";

import { BASE_URL } from "@/app/constants/url";
import { useRequest } from "@/app/context/requestContext";
import { PAYSTACK_SECRET_KEY } from "@/app/utils/key";
import { saveCurrentRequestId } from "@/app/utils/requestStorage";
import { getToken } from "@/app/utils/secureStore";
export default function ConfirmPublish() {
    const router = useRouter();
    const { request, saveRequestId } = useRequest(); // ✅ get saveRequestId
    const [loading, setLoading] = useState(false);
    const [showPaystack, setShowPaystack] = useState(false);

    const walletBalance = 2000; // User wallet balance (dynamic later)
    const reward = 1000;
    const rewardNum = Number(reward);
    const serviceFee = rewardNum * 0.2;
    const userPayout = rewardNum - serviceFee;

    const handlePostRequest = async () => {
        if (walletBalance < rewardNum) {
            alert("Insufficient wallet balance. Redirecting to Paystack...");
            setShowPaystack(true);
            return;
        }
        postRequestToBackend();
    };


    const postRequestToBackend = async () => {
        setLoading(true);
        try {
            const token = await getToken("token");
            if (!token) {
                alert("You are not logged in. Please log in again.");
                return;
            }

            const formData = new FormData();
            formData.append("location", request.location);
            formData.append("description", request.description);
            formData.append("duration", request.duration);
            formData.append("allow_comment", request.allow_comment);
            formData.append("reward", reward);

            const response = await fetch(`${BASE_URL}/create-request`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log("Backend Response:", data);

            if (!response.ok) {
                alert(data?.message || "Submission failed, try again.");
                return;
            }

            // ✅ Save request_id in context
            if (data?.data?.id) {
                await saveCurrentRequestId(data.data.id);
            }


            router.push("/(root)/(tabs)/requests/success");
        } catch (error) {
            console.error("Submit error:", error);
            alert("Network or server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.stepText}>Step 4 of 4</Text>
                <Text style={styles.title}>Confirm and publish</Text>

                {/* Summary */}
                <Text style={styles.sectionTitle}>Request summary</Text>
                {["location", "description", "duration"].map((key) => (
                    <View key={key} style={styles.summaryItem}>
                        <Text style={styles.summaryLabel}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                        <Text style={styles.summaryValue}>{request[key]}</Text>
                    </View>
                ))}
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Comments</Text>
                    <Text style={styles.summaryValue}>
                        {request.allow_comment === "1" ? "Allowed" : "Not allowed"}
                    </Text>
                </View>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Reward</Text>
                    <Text style={styles.summaryValue}>₦{rewardNum.toLocaleString()}</Text>
                </View>

                {/* Payment option */}
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Payment method</Text>
                <TouchableOpacity style={styles.walletCard}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons
                            name="wallet-outline"
                            size={22}
                            color="#E60023"
                            style={{ marginRight: 10 }}
                        />
                        <View>
                            <Text style={styles.walletTitle}>
                                Wallet (₦{walletBalance.toLocaleString()})
                            </Text>
                            <Text style={styles.walletSubtitle}>
                                Default payment method.
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.radioOuter, true && styles.radioOuterActive]}>
                        <View style={styles.radioInner} />
                    </View>
                </TouchableOpacity>

                {/* Payment summary */}
                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Payment summary</Text>
                {[
                    ["Reward amount:", rewardNum],
                    ["Service fee (20%):", serviceFee],
                    ["User payout:", userPayout],
                ].map(([label, value]) => (
                    <View key={label} style={styles.summaryRow}>
                        <Text style={styles.summaryLeft}>{label}</Text>
                        <Text style={styles.summaryRight}>₦{Math.round(value).toLocaleString()}</Text>
                    </View>
                ))}

                <Text style={styles.infoText}>
                    Jo Service charges 20% of reward as service fee.
                </Text>

                <TouchableOpacity
                    style={[styles.submitButton, loading && { opacity: 0.7 }]}
                    disabled={loading}
                    onPress={handlePostRequest}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.submitText}>Post Request</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>

            {showPaystack && (
                <PaystackProvider publicKey={PAYSTACK_SECRET_KEY} currency="NGN" debug>
                    <PaystackWebView
                        paystackKey={PAYSTACK_SECRET_KEY}
                        amount={rewardNum * 100}
                        billingEmail="yusufmuhammadbashir2005@gmail.com"
                        onCancel={() => {
                            alert("Payment cancelled");
                            setShowPaystack(false);
                        }}
                        onSuccess={(response) => {
                            console.log("Payment success:", response);
                            alert("Payment successful! Continuing...");
                            setShowPaystack(false);
                            postRequestToBackend();
                        }}
                        autoStart={true}
                    />
                </PaystackProvider>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, paddingBottom: 40 },
    backButton: { marginBottom: 10 },
    stepText: { color: "#777", fontSize: 14, marginBottom: 6 },
    title: { fontSize: 22, fontWeight: "600", marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, marginTop: 12 },
    summaryItem: { marginBottom: 14 },
    summaryLabel: { color: "#777", fontSize: 14 },
    summaryValue: { fontSize: 16, fontWeight: "500", marginTop: 4 },
    walletCard: {
        borderWidth: 1,
        borderColor: "#E60023",
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    walletTitle: { fontSize: 16, fontWeight: "600" },
    walletSubtitle: { color: "#777", fontSize: 13 },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#aaa",
        justifyContent: "center",
        alignItems: "center",
    },
    radioOuterActive: { borderColor: "#E60023" },
    radioInner: { width: 10, height: 10, borderRadius: 6, backgroundColor: "#E60023" },
    summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
    summaryLeft: { color: "#555", fontSize: 15 },
    summaryRight: { fontSize: 15, fontWeight: "600" },
    infoText: { fontSize: 13, color: "#777", marginTop: 10 },
    submitButton: {
        backgroundColor: "#E60023",
        paddingVertical: 16,
        borderRadius: 30,
        marginTop: 30,
    },
    submitText: { color: "#fff", fontSize: 17, textAlign: "center", fontWeight: "600" },
});
