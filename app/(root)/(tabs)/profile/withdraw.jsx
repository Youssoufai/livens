import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBankModal from "./addBank";

export default function WithdrawScreen() {
    const [modal, setModal] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} />
                <Text style={styles.headerTitle}>Withdraw</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Title */}
            <Text style={styles.title}>Choose account to{"\n"}withdraw your earnings into.</Text>

            {/* Subtitle */}
            <Text style={styles.subtitle}>You have not added any bank accounts.</Text>

            {/* Add Bank Account Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModal(true)}
            >
                <Ionicons name="add" size={20} color="#000" />
                <Text style={styles.addButtonText}>Add bank account</Text>
            </TouchableOpacity>

            {/* Withdraw button (disabled) */}
            <TouchableOpacity style={styles.withdrawButtonDisabled} disabled>
                <Text style={styles.withdrawTextDisabled}>Withdraw</Text>
            </TouchableOpacity>

            {/* Add Bank Modal */}
            <AddBankModal visible={modal} onClose={() => setModal(false)} />
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

    withdrawButtonDisabled: {
        marginTop: "auto",
        marginBottom: 20,
        paddingVertical: 16,
        borderRadius: 30,
        backgroundColor: "#EDEDED",
        alignItems: "center",
    },

    withdrawTextDisabled: {
        color: "#AFAFAF",
        fontSize: 16,
        fontWeight: "600",
    },
});
