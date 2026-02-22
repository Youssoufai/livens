import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    content: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
    },
    description: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 6,
        marginBottom: 30,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
    },
    searchIcon: { marginRight: 8 },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#111827",
    },
    locationButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },
    locationText: {
        color: "#EF4444",
        fontWeight: "500",
        marginLeft: 6,
    },
    buttonGroup: {
        paddingTop: 10,
    },
    button: {
        backgroundColor: "#EF4444",
        paddingVertical: 16,
        borderRadius: 25,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: "#E5E7EB",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    skipButtonText: {
        color: "#6B7280",
        fontSize: 14,
        textAlign: "center",
    },
});