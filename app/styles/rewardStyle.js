import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    backButton: {
        padding: 6,
        borderRadius: 10,
    },
    stepText: {
        fontSize: 14,
        color: "#777",
        marginBottom: 6,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 4,
        color: "#000",
    },
    subtitle: {
        fontSize: 15,
        color: "#666",
        marginBottom: 20,
    },
    rewardBox: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
    },
    rewardBoxSelected: {
        borderColor: "#ff3b30",
        backgroundColor: "#fff5f5",
    },
    rewardHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rewardAmount: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
    },
    rewardAmountSelected: {
        color: "#ff3b30",
    },
    tag: {
        backgroundColor: "#ff3b30",
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    tagText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    rewardLabel: {
        color: "#555",
        fontSize: 14,
        marginTop: 6,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 25,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: "#999",
        marginRight: 10,
    },
    checkboxLabel: {
        color: "#444",
        fontSize: 15,
    },
    nextButton: {
        backgroundColor: "#000",
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
    },
    nextButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});