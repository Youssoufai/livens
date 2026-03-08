import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 120,
    },

    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
    },

    sectionHeader: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 12,
        marginTop: 10,
    },

    item: {
        marginBottom: 12,
    },

    label: {
        fontSize: 13,
        color: "#777",
        marginBottom: 3,
    },

    value: {
        fontSize: 14,
        color: "#111",
    },

    walletCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: "#FF3B30", // red border like screenshot
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    walletTitle: {
        fontSize: 14,
        fontWeight: "600",
    },

    walletSub: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },

    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FF3B30",
        alignItems: "center",
        justifyContent: "center",
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#FF3B30",
    },

    policyText: {
        fontSize: 13,
        color: "#555",
        lineHeight: 18,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    summaryLeft: {
        fontSize: 14,
        color: "#444",
    },

    summaryRight: {
        fontSize: 14,
        color: "#111",
    },

    dashedLine: {
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: "#CCC",
        marginVertical: 10,
    },

    totalLeft: {
        fontSize: 15,
        fontWeight: "600",
    },

    totalRight: {
        fontSize: 15,
        fontWeight: "600",
    },

    bottomContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFF",
        padding: 16,
        borderTopWidth: 1,
        borderColor: "#EEE",
    },

    submitButton: {
        backgroundColor: "#FF3B30",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: "center",
    },

    submitText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});