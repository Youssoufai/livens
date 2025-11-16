import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

const images = [
    require("@/assets/images/logo.png"),
    require("@/assets/images/logo.png"),
    require("@/assets/images/logo.png"),
];

export default function PostDetails() {
    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    Has the queue at the event center subsided?
                </Text>
                <Text style={styles.location}>Federal Capital Territory, 900110</Text>
            </View>

            {/* Engagement Row */}
            <View style={styles.engagementRow}>
                <View style={styles.engageItem}>
                    <Ionicons name="eye-outline" size={18} color="#6B7280" />
                    <Text style={styles.engageText}>23 views</Text>
                </View>
                <View style={styles.engageItem}>
                    <Ionicons name="bookmark-outline" size={18} color="#6B7280" />
                    <Text style={styles.engageText}>1 save</Text>
                </View>
                <View style={styles.engageItem}>
                    <Ionicons name="time-outline" size={18} color="#6B7280" />
                    <Text style={styles.engageText}>2 days ago</Text>
                </View>
            </View>

            {/* Request location */}
            <Text style={styles.requestLocation}>
                Request location: <Text style={styles.link}>9472 W Monroe Street</Text>
            </Text>

            {/* Responses */}
            <View style={styles.responseSection}>
                <Text style={styles.responseHeader}>Responses</Text>

                <View style={styles.responseCard}>
                    <View style={styles.responderHeader}>
                        <View style={styles.avatar} />
                        <View>
                            <Text style={styles.responderName}>John Ackerman</Text>
                            <Text style={styles.responderMeta}>Responder • 2d ago</Text>
                        </View>
                    </View>

                    <Text style={styles.responseText}>
                        They’re currently running a discount so the place is packed.
                    </Text>

                    {/* Image Slider */}
                    <FlatList
                        horizontal
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Image source={item} style={styles.responseImage} />
                        )}
                        contentContainerStyle={{ marginTop: 10 }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 20 },
    header: { marginBottom: 12 },
    title: { fontSize: 20, fontWeight: "700", color: "#111827", marginBottom: 4 },
    location: { color: "#6B7280", fontSize: 14 },
    engagementRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 6,
        gap: 20,
    },
    engageItem: { flexDirection: "row", alignItems: "center", gap: 4 },
    engageText: { color: "#6B7280", fontSize: 13 },
    requestLocation: { color: "#6B7280", fontSize: 14, marginTop: 4 },
    link: { color: "#2563EB", textDecorationLine: "underline" },

    responseSection: { marginTop: 28 },
    responseHeader: { fontSize: 17, fontWeight: "700", color: "#111827" },

    responseCard: {
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 16,
        marginTop: 14,
    },
    responderHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E5E7EB",
        marginRight: 10,
    },
    responderName: { fontSize: 15, fontWeight: "600", color: "#111827" },
    responderMeta: { color: "#9CA3AF", fontSize: 12 },
    responseText: { color: "#374151", fontSize: 14, marginTop: 4 },
    responseImage: {
        width: 140,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: "#E5E7EB",
    },
});
