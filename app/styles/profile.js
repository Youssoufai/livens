import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
        color: "#000",
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    avatarContainer: {
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    edit: {
        color: "#999",
        fontSize: 13,
        marginTop: 3,
    },
    balanceCard: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    balanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    balanceLabel: {
        color: "#999",
        fontSize: 13,
    },
    history: {
        color: "#007AFF",
        fontSize: 13,
    },
    balanceAmount: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 10,
    },
    withdrawButton: {
        backgroundColor: "#f44336",
        borderRadius: 8,
        paddingVertical: 10,
        flex: 1,
        alignItems: "center",
    },
    withdrawText: {
        color: "#fff",
        fontWeight: "600",
    },
    fundButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingVertical: 10,
        flex: 1,
        alignItems: "center",
    },
    fundText: {
        color: "#000",
        fontWeight: "600",
    },
    section: {
        marginTop: 10,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingVertical: 15,
    },
    optionLabel: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },
    optionDesc: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#f00",
        borderRadius: 10,
        paddingVertical: 12,
        marginVertical: 30,
    },
    logoutText: {
        color: "#f00",
        fontWeight: "600",
        marginRight: 6,
    },
});
