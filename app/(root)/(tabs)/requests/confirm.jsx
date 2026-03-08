import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BASE_URL } from "@/app/constants/url";
import { useRequest } from "@/app/context/requestContext";
import { saveCurrentRequestId } from "@/app/utils/requestStorage";
import { getToken } from "@/app/utils/secureStore";

export default function ConfirmPublish() {

    const router = useRouter();
    const { request } = useRequest();

    const [loading, setLoading] = useState(false);

    const walletBalance = 2000;
    const reward = 1000;

    const rewardNum = Number(reward);

    const serviceFee = rewardNum * 0.2;
    const userPayout = rewardNum - serviceFee;

    const handlePostRequest = async () => {
        postRequestToBackend();
    };

    const postRequestToBackend = async () => {
        setLoading(true);

        try {
            const token = await getToken("token");

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

            if (data?.data?.id) {
                await saveCurrentRequestId(data.data.id);
            }

            router.push("/(root)/(tabs)/requests/success");

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={{ flex: 1 }}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.container}
                >

                    <Text style={styles.title}>Confirm & Publish</Text>

                    {/* REQUEST SUMMARY */}
                    <View style={styles.card}>

                        <Text style={styles.sectionTitle}>Request summary</Text>

                        <Item label="Location" value={request.location} />
                        <Item label="Description" value={request.description} />
                        <Item label="Duration" value={request.duration} />
                        <Item
                            label="Comments"
                            value={request.allow_comment === "1" ? "Allowed" : "Not allowed"}
                        />
                        <Item
                            label="Reward"
                            value={`₦${rewardNum.toLocaleString()}`}
                        />

                    </View>

                    {/* PAYMENT DETAILS */}
                    <Text style={styles.sectionHeader}>Payment details</Text>

                    <View style={styles.walletCard}>

                        <View style={styles.walletLeft}>

                            <View style={styles.walletIcon}>
                                <Ionicons name="wallet-outline" size={20} color="#000" />
                            </View>

                            <View>
                                <Text style={styles.walletTitle}>
                                    Wallet (₦{rewardNum.toLocaleString()})
                                </Text>

                                <Text style={styles.walletSub}>
                                    Default payment method
                                </Text>
                            </View>

                        </View>

                        <View style={styles.radioOuter}>
                            <View style={styles.radioInner} />
                        </View>

                    </View>

                    {/* POLICY */}
                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Deposit & Refund Policy</Text>

                        <Text style={styles.policyText}>
                            Deposited funds remain secured until the request is completed or cancelled.
                            Refunds will be processed according to our dispute and cancellation policies.
                        </Text>

                    </View>

                    {/* PAYMENT SUMMARY */}
                    <View style={styles.card}>

                        <Text style={styles.sectionTitle}>Payment summary</Text>

                        <SummaryRow
                            label="Reward amount"
                            value={`₦${rewardNum.toLocaleString()}`}
                        />

                        <View style={styles.line} />

                        <SummaryRow
                            label="Total"
                            value={`₦${rewardNum.toLocaleString()}`}
                            bold
                        />

                    </View>

                </ScrollView>

                {/* BOTTOM BUTTON */}

                <View style={styles.bottom}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handlePostRequest}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? "Posting..." : "Post Request"}
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    );
}

function Item({ label, value }) {
    return (
        <View style={styles.item}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

function SummaryRow({ label, value, bold }) {
    return (
        <View style={styles.summaryRow}>
            <Text style={[styles.summaryLeft, bold && { fontWeight: "700" }]}>
                {label}
            </Text>
            <Text style={[styles.summaryRight, bold && { fontWeight: "700" }]}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

    safe: {
        flex: 1,
        backgroundColor: "#F6F7FB",
    },

    container: {
        padding: 20,
        paddingBottom: 140,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 18,
    },

    sectionHeader: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        marginTop: 10,
    },

    card: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 18,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
    },

    item: {
        marginBottom: 12,
    },

    label: {
        fontSize: 12,
        color: "#777",
        marginBottom: 2,
    },

    value: {
        fontSize: 15,
        fontWeight: "500",
    },

    walletCard: {
        backgroundColor: "#FFF",
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 18,
        elevation: 3,
    },

    walletLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    walletIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    walletTitle: {
        fontSize: 15,
        fontWeight: "600",
    },

    walletSub: {
        fontSize: 12,
        color: "#777",
    },

    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: "#000",
    },

    policyText: {
        fontSize: 13,
        color: "#555",
        lineHeight: 20,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    summaryLeft: {
        fontSize: 14,
    },

    summaryRight: {
        fontSize: 14,
    },

    line: {
        height: 1,
        backgroundColor: "#EEE",
        marginVertical: 10,
    },

    bottom: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#FFF",
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },

    button: {
        backgroundColor: "#000",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "600",
        fontSize: 16,
    },
});