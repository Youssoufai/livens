import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    content: { padding: 20 },

    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        textAlign: "center",
    },

    price: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 10,
    },

    card: {
        marginTop: 15,
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#fafafa",
        borderWidth: 1,
        borderColor: "#eee",
    },

    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 10,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    userName: {
        fontSize: 16,
        fontWeight: "600",
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 6,
    },

    infoText: {
        fontSize: 14,
        color: "#555",
    },

    descriptionSection: {
        marginTop: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    descriptionText: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
    },

    offerButton: {
        backgroundColor: "#ff3b30",
        marginTop: 25,
        paddingVertical: 14,
        borderRadius: 10,
    },

    offerButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});