import { getToken } from "@/app/utils/secureStore";
import { BASE_URL } from "@/constants/url";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBankModal from "./addBank";

export default function WithdrawScreen() {
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);

    const isDisabled = !selectedBank || loading;

    const handleWithdraw = async () => {
        try {
            setLoading(true);

            const token = await getToken("token");

            const response = await fetch(`${BASE_URL}/initiate-withdrawal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
                body: JSON.stringify({
                    amount: Number(selectedBank.amount),
                    recipient_code: selectedBank.recipient_code,
                }),
            });

            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch {
                console.log("Withdraw raw response:", text);
                throw new Error("Invalid server response");
            }

            if (!response.ok) {
                throw new Error(data?.message || "Withdrawal failed");
            }

            Alert.alert(
                "Withdrawal Successful",
                "Your withdrawal request has been submitted."
            );

            // Reset
            setSelectedBank(null);
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong");
            console.log("Withdraw error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} />
                <Text style={styles.headerTitle}>Withdraw</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Title */}
            <Text style={styles.title}>
                Withdraw your earnings
            </Text>

            {/* Selected Bank + Amount */}
            {selectedBank ? (
                <View style={styles.amountCard}>
                    <Text style={styles.amountLabel}>Amount to withdraw</Text>
                    <Text style={styles.amountValue}>
                        ₦{Number(selectedBank.amount).toLocaleString()}
                    </Text>
                    <Text style={styles.bankHint}>
                        {selectedBank.bank_name} selected
                    </Text>
                </View>
            ) : (
                <Text style={styles.subtitle}>
                    Add a bank account to withdraw your earnings.
                </Text>
            )}

            {/* Add / Change Bank Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModal(true)}
                activeOpacity={0.7}
            >
                <Ionicons name="add" size={20} color="#000" />
                <Text style={styles.addButtonText}>
                    {selectedBank ? "Change bank account" : "Add bank account"}
                </Text>
            </TouchableOpacity>

            {/* Withdraw Button */}
            <TouchableOpacity
                style={[
                    styles.withdrawButton,
                    isDisabled && styles.withdrawButtonDisabled,
                ]}
                disabled={isDisabled}
                onPress={handleWithdraw}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.withdrawText}>Withdraw</Text>
                )}
            </TouchableOpacity>

            {/* Add Bank Modal */}
            <AddBankModal
                visible={modal}
                onClose={() => setModal(false)}
                onSelectBank={(bank) => {
                    setSelectedBank(bank);
                    setModal(false);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    title: {
        marginTop: 10,
        fontSize: 22,
        fontWeight: "700",
        lineHeight: 30,
    },
    subtitle: {
        marginTop: 12,
        color: "#777",
        fontSize: 14,
    },
    addButton: {
        marginTop: 20,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "500",
    },
    amountCard: {
        marginTop: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        backgroundColor: "#f9f9f9",
    },
    amountLabel: {
        fontSize: 14,
        color: "#555",
    },
    amountValue: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 5,
    },
    bankHint: {
        marginTop: 5,
        color: "#777",
    },
    withdrawButton: {
        marginTop: "auto",
        marginBottom: 20,
        paddingVertical: 16,
        borderRadius: 30,
        backgroundColor: "#000",
        alignItems: "center",
    },
    withdrawButtonDisabled: {
        backgroundColor: "#EDEDED",
    },
    withdrawText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
