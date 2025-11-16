import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CinemaRequestScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={22} color="#000" />
                    <Text style={styles.headerTitle}>Is the Silverbird cinema full?</Text>
                    <Ionicons name="ellipsis-vertical" size={20} color="#000" />
                </View>

                {/* Price */}
                <Text style={styles.price}>₦2,500</Text>

                {/* User Info */}
                <View style={styles.card}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{
                                uri: "https://via.placeholder.com/50",
                            }}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.userName}>John Ackerman</Text>
                            <View style={styles.verifiedRow}>
                                <Ionicons name="checkmark-circle" size={16} color="green" />
                                <Text style={styles.verifiedText}>Verified user</Text>
                            </View>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>
                            Plot 235, Adewale Adetokunbo St, Central District, Abuja, FCT.
                        </Text>
                    </View>

                    {/* Duration */}
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>Duration: 2 hours</Text>
                    </View>

                    {/* Comment Requirement */}
                    <View style={styles.infoRow}>
                        <Ionicons name="chatbubble-ellipses-outline" size={18} color="#666" />
                        <Text style={styles.infoText}>Comments required</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.descriptionSection}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        I want to see what the cinema currently looks like. Also ask for the
                        price of movie tickets, and if theyre running promos.
                    </Text>
                </View>

                {/* Offer Status */}
                <View style={styles.offerStatus}>
                    <Ionicons name="people-outline" size={18} color="#555" />
                    <Text style={styles.offerStatusText}>
                        3 people have already sent their offer.
                    </Text>
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.offerButton} onPress={() => router.push('/(root)/(tabs)/requests/captureContent')}>
                    <Text style={styles.offerButtonText}>Offer to help</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CinemaRequestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111",
        flex: 1,
        textAlign: "center",
    },
    price: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    card: {
        backgroundColor: "#fafafa",
        borderRadius: 12,
        padding: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#eee",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontWeight: "600",
        fontSize: 16,
        color: "#111",
    },
    verifiedRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    verifiedText: {
        fontSize: 13,
        color: "#444",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 5,
        gap: 5,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: "#555",
    },
    descriptionSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontWeight: "600",
        fontSize: 16,
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
    },
    offerStatus: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        gap: 6,
    },
    offerStatusText: {
        fontSize: 14,
        color: "#666",
    },
    offerButton: {
        backgroundColor: "#ff3b30",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 20,
    },
    offerButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },
});
