import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 24,
        paddingTop: 60,
        alignItems: "center",
    },

    logoWrapper: {
        marginBottom: 24,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#000",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 15,
        color: "#6B7280",
        marginBottom: 20,
    },

    imageStack: {
        alignItems: "center",
    },

    mainImage: {
        width: 240,
        height: 220,
        resizeMode: "contain",
        borderRadius: 16,
    },

    primaryButton: {
        backgroundColor: "#FF3B3B",
        width: "100%",
        height: 54,
        borderRadius: 27,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    bottomSection: {
        marginTop: "auto",
        width: "100%",
        alignItems: "center",
        paddingBottom: 24,
    },

    socialButton: {
        width: "100%",
        height: 54,
        borderRadius: 27,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 14,
    },

    socialButtonText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#111827",
    },

    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 14,
        width: "100%",
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#E5E7EB",
    },

    orText: {
        marginHorizontal: 12,
        fontSize: 12,
        color: "#9CA3AF",
        fontWeight: "500",
    },

    signInText: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
    },

    signInLink: {
        color: "#FF3B3B",
        fontWeight: "600",
    },
});
