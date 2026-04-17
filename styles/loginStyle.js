import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#fff",
    },
    googleBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingVertical: 14,
        borderRadius: 8,
        marginTop: 20,
    },

    googleText: {
        fontSize: 15,
        fontWeight: "500",
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 30,
        color: "#111827",
    },
    field: {
        marginBottom: 18,
    },
    label: {
        fontSize: 13,
        marginBottom: 6,
        color: "#111827",
        fontWeight: "500",
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 15,
        color: "#111827",
    },
    passwordInput: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    passwordText: {
        flex: 1,
        fontSize: 15,
        color: "#111827",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },
    remember: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    checkboxActive: {
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
    },
    rememberText: {
        fontSize: 13,
        color: "#374151",
    },
    forgot: {
        fontSize: 13,
        color: "#111827",
        fontWeight: "500",
    },
    loginBtn: {
        height: 52,
        borderRadius: 26,
        backgroundColor: "#EF4444",
        alignItems: "center",
        justifyContent: "center",
    },
    disabledBtn: {
        backgroundColor: "#E5E7EB",
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
