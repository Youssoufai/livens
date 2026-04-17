import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const transactions = [
    { id: 1, title: "WALLET WITHDRAWAL", amount: "₦3,700 withdrawn from wallet", status: "Processing", date: "21/07/25 14:23" },
    { id: 2, title: "WALLET WITHDRAWAL", amount: "₦3,700 withdrawn from wallet", status: "Failed", date: "21/07/25 14:23" },
    { id: 3, title: "REQUEST REWARD", amount: "₦1,200 added to wallet", status: "Successful", date: "21/07/25 14:23" },
    { id: 4, title: "WALLET DEPOSIT", amount: "₦2,500 added to wallet", status: "Successful", date: "21/07/25 16:14" },
];

export default function TransactionHistory() {
    const hasTransactions = transactions.length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="#000" />
                <Text style={styles.headerTitle}>Transaction history</Text>
            </View>

            {hasTransactions ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {transactions.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.title}</Text>
                                <View style={[styles.status, styles[`status_${item.status}`]]}>
                                    <Text style={styles.statusText}>{item.status}</Text>
                                </View>
                            </View>
                            <Text style={styles.amount}>{item.amount}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.emptyState}>
                    <ActivityIndicator size="large" color="#aaa" />
                    <Text style={styles.emptyText}>
                        Once you start making transactions, your history will show up here.
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginLeft: 10,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 40,
    },
    card: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingVertical: 14,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: { fontWeight: "600", color: "#000" },
    amount: { color: "#444", fontSize: 14, marginTop: 4 },
    date: { color: "#999", fontSize: 12, marginTop: 2 },
    status: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    statusText: { color: "#fff", fontSize: 11, fontWeight: "600" },
    status_Successful: { backgroundColor: "#28a745" },
    status_Failed: { backgroundColor: "#dc3545" },
    status_Processing: { backgroundColor: "#ffc107" },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    emptyText: {
        marginTop: 12,
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
});
