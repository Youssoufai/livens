import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function CaptureContent() {
    const photos = []; // EMPTY = first screen UI

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                {/* Step Header */}
                <Text style={styles.stepText}>Step 1 of 3</Text>

                {/* Title */}
                <Text style={styles.title}>Capture photos and videos</Text>
                <Text style={styles.subtitle}>
                    We’ll review every photo before the requester views it.
                </Text>

                {/* If photos exist, show grid — else nothing */}
                {photos.length > 0 && (
                    <View style={styles.grid}>
                        {photos.map((_, index) => (
                            <View key={index} style={styles.photoBox}>
                                <TouchableOpacity style={styles.removeButton}>
                                    <Ionicons name="close" size={14} color="#fff" />
                                </TouchableOpacity>
                                <Ionicons
                                    name="play-circle-outline"
                                    size={24}
                                    color="#D1D5DB"
                                    style={{ opacity: 0.8 }}
                                />
                                <Text style={styles.duration}>0:34</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Photo Instructions */}
                <View style={styles.instructions}>
                    <Text style={styles.instructionHeader}>Your photos must be:</Text>
                    <Text style={styles.bullet}>• Clearly and carefully taken.</Text>
                    <Text style={styles.bullet}>
                        • Inclusive of places specified by the requester.
                    </Text>
                    <Text style={styles.bullet}>
                        • Moments and people in action, accurately illustrating what the
                        requester wants to see.
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Capture Button (Matches your screenshot) */}
            <TouchableOpacity style={styles.captureMainBtn} onPress={() => router.push('/(root)/(tabs)/requests/cameraScreen')}>
                <Text style={styles.captureMainText}>Capture</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    stepText: {
        color: "#9CA3AF",
        fontSize: 13,
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111827",
        lineHeight: 30,
    },
    subtitle: {
        color: "#6B7280",
        fontSize: 14,
        marginTop: 6,
        marginBottom: 24,
        lineHeight: 20,
    },
    instructions: {
        marginTop: 14,
    },
    instructionHeader: {
        color: "#111827",
        fontWeight: "600",
        marginBottom: 6,
        fontSize: 16,
    },
    bullet: {
        color: "#4B5563",
        fontSize: 14,
        lineHeight: 22,
    },

    /* Grid styles (only shows when photos exist) */
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    photoBox: {
        width: "47%",
        aspectRatio: 1,
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        marginBottom: 14,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    removeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#EF4444",
        borderRadius: 12,
        padding: 4,
        zIndex: 2,
    },
    duration: {
        fontSize: 12,
        color: "#6B7280",
        position: "absolute",
        bottom: 8,
        right: 8,
    },

    /* Bottom Main Capture Button (red) */
    captureMainBtn: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#EF4444",
        borderRadius: 100,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    captureMainText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 17,
    },
});
