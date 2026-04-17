import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        padding: 12,
        marginBottom: 15,
    },
    focusedInput: {
        borderColor: "#EF4444",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        marginBottom: 10,
    },
    inputField: {
        flex: 1,
        padding: 12,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    errorBorder: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 10,
    },
    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    countryCode: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    flag: {
        fontSize: 18,
        marginRight: 4,
    },
    code: {
        fontSize: 14,
        fontWeight: "600",
    },
    nextButton: {
        backgroundColor: "#ddd",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
        marginTop: "auto",
        marginBottom: 20,
    },
    nextButtonActive: {
        backgroundColor: "red",
    },
    nextButtonText: {
        color: "#999",
        fontSize: 16,
        fontWeight: "600",
    },
    nextButtonTextActive: {
        color: "#fff",
    },
});