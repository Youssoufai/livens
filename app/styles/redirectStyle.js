import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        paddingHorizontal: 24,
        alignItems: "center",
    },

    logoWrapper: {
        marginTop: 40,
        marginBottom: 20,
    },

    logoDot: {
        width: 30,
        height: 30,
        backgroundColor: "#FF2E3E",
        borderRadius: 15,
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 15,
        color: "#7A7A7A",
        marginTop: 8,
        marginBottom: 35,
        textAlign: "center",
    },

    /* Card Stack */

    cardWrapper: {
        width: 250,
        height: 200,
        marginBottom: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    sideCard: {
        position: "absolute",
        width: 170,
        height: 170,
        borderRadius: 20,
        opacity: 0.35,
    },

    leftCard: {
        left: -45,
        transform: [{ rotate: "-12deg" }],
    },

    rightCard: {
        right: -45,
        transform: [{ rotate: "12deg" }],
    },

    mainCard: {
        width: 190,
        height: 190,
        borderRadius: 22,
    },

    /* Buttons */

    primaryButton: {
        width: "100%",
        backgroundColor: "#FF2E3E",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
        marginBottom: 16,
    },

    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

    outlineButton: {
        width: "100%",
        paddingVertical: 15,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        marginBottom: 14,
    },

    outlineButtonText: {
        fontSize: 15,
        color: "#222",
        fontWeight: "500",
    },

    /* Divider */

    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 20,
    },

    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#DADADA",
    },

    dividerText: {
        marginHorizontal: 12,
        color: "#777",
        fontSize: 13,
        fontWeight: "500",
    },

    /* Bottom */

    bottomText: {
        fontSize: 14,
        color: "#555",
        display: "flex",
        flexDirection: "row",
    },

    signIn: {
        color: "#FF2E3E",
        fontWeight: "600",
    },
});