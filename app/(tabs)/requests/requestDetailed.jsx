import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestDetailed() {
    const [isPublic, setIsPublic] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="#000" />
                <Text style={styles.headerTitle}>Request details</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileRow}>
                    <Image
                        source={{ uri: "https://via.placeholder.com/50" }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.name}>Chimka Amanda</Text>
                        <Text style={styles.location}>Gudu, Abuja</Text>
                    </View>
                    <TouchableOpacity style={styles.messageBtn}>
                        <Text style={styles.messageText}>Message</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Uploaded content</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[1, 2, 3].map((i) => (
                        <Image
                            key={i}
                            source={{ uri: `https://picsum.photos/200/200?random=${i}` }}
                            style={styles.image}
                        />
                    ))}
                </ScrollView>

                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Make available to public</Text>
                    <Switch value={isPublic} onValueChange={setIsPublic} />
                </View>

                <Text style={styles.commentLabel}>Responder comments</Text>
                <Text style={styles.comment}>
                    A new store is offering free tryouts for all clothes under 10k.
                </Text>

                <View style={styles.alertBox}>
                    <Ionicons name="alert-circle-outline" size={20} color="#FF3B30" />
                    <Text style={styles.alertText}>
                        Automatic payment: You have 48 hours to withdraw if this responder made invalid content. Payment will be made immediately content has been uploaded.
                    </Text>
                </View>

                <TouchableOpacity style={styles.approveBtn}>
                    <Text style={styles.approveText}>Approve & Pay</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: { fontSize: 18, fontWeight: "700", marginLeft: 10 },
    scrollContainer: { padding: 16 },
    profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    name: { fontWeight: "700", fontSize: 16 },
    location: { color: "#777", fontSize: 13 },
    messageBtn: {
        marginLeft: "auto",
        borderWidth: 1,
        borderColor: "#FF3B30",
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
    },
    messageText: { color: "#FF3B30", fontWeight: "600" },
    sectionTitle: { fontSize: 15, fontWeight: "700", marginBottom: 8 },
    image: { width: 120, height: 120, borderRadius: 10, marginRight: 10 },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 16,
    },
    switchLabel: { color: "#000", fontWeight: "500" },
    commentLabel: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
    comment: { color: "#444", marginBottom: 16 },
    alertBox: {
        backgroundColor: "#ffe6e6",
        borderRadius: 10,
        padding: 12,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 6,
    },
    alertText: { color: "#FF3B30", flex: 1, fontSize: 13 },
    approveBtn: {
        marginTop: 20,
        backgroundColor: "#FF3B30",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    approveText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
