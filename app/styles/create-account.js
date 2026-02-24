import { StyleSheet } from "react-native";

const COLORS = {
    primary: "#E11D48", // modern red (not harsh)
    border: "#E5E7EB",
    text: "#111827",
    subText: "#6B7280",
    error: "#DC2626",
    bg: "#FFFFFF",
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 24, // 🔥 keeps button above system nav
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 14,
        color: COLORS.subText,
        marginBottom: 28,
        lineHeight: 20,
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 15,
        marginBottom: 16,
        backgroundColor: "#FAFAFA",
    },

    focusedInput: {
        borderColor: COLORS.primary,
        backgroundColor: "#FFF",

    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 14,
        backgroundColor: "#FAFAFA",
    },

    passwordInput: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 15,
        color: "#333",
    },

    helperText: {
        fontSize: 12,
        color: COLORS.subText,
        marginTop: 6,
        marginBottom: 16,
    },

    errorBorder: {
        borderColor: COLORS.error,
        backgroundColor: "#FFF",
    },

    errorText: {
        color: COLORS.error,
        fontSize: 12,
        marginTop: 6,
        marginBottom: 12,
    },

    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },

    countryCode: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 14,
        backgroundColor: "#FAFAFA",
    },

    flag: {
        fontSize: 18,
        marginRight: 6,
    },

    code: {
        fontWeight: "600",
        color: COLORS.text,
    },

    nextButton: {
        backgroundColor: "#D1D5DB",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
        marginTop: "auto",
    },

    nextButtonActive: {
        backgroundColor: COLORS.primary,
    },

    nextButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});
