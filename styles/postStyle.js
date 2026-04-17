import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    searchBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 40,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    searchInput: {
        flex: 1,
        marginLeft: 6,
        fontSize: 15,
        color: "#111827",
    },
    filtersRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18,
        marginBottom: 16,
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9FAFB",
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    filterText: {
        color: "#111827",
        fontSize: 13,
        fontWeight: "500",
        marginRight: 4,
    },
    resultsInfo: {
        color: "#6B7280",
        fontSize: 13,
        marginBottom: 16,
    },
    highlight: {
        fontWeight: "600",
        color: "#111827",
    },
    postCard: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        paddingBottom: 18,
        marginBottom: 18,
    },
    postHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    avatarPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E5E7EB",
        marginRight: 10,
    },
    name: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    location: {
        fontSize: 12,
        color: "#6B7280",
    },
    postQuestion: {
        fontSize: 15,
        color: "#111827",
        marginBottom: 6,
    },
    requestLocation: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 10,
    },
    link: {
        color: "#2563EB",
        textDecorationLine: "underline",
    },
    responseCard: {
        backgroundColor: "#F9FAFB",
        borderRadius: 10,
        padding: 10,
        marginTop: 4,
    },
    responseLeft: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    smallAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#E5E7EB",
        marginRight: 8,
    },
    responseName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
    },
    responseTime: {
        fontSize: 11,
        color: "#9CA3AF",
    },
    responseText: {
        fontSize: 13,
        color: "#4B5563",
        lineHeight: 18,
    },
    searchBtn: {
        backgroundColor: "#EF4444",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginLeft: 6,
    },
    searchBtnText: {
        color: "#fff",
        fontWeight: "600",
    },

});