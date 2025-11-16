import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function CaptureContent() {
    const photos = Array(10).fill(null); // sample 10 placeholders

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

                {/* Photo Grid */}
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

                {/* Upload Limit Info */}
                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        <Text style={{ fontWeight: "600" }}>Maximum image upload</Text>{" "}
                        You can upload up to 10 images, ensure to abide by the photo
                        capturing guidelines above.
                    </Text>
                </View>

                {/* Buttons */}
                <TouchableOpacity style={styles.captureBtn}>
                    <Text style={styles.captureText}>Capture more photos</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.continueBtn}>
                <Text style={styles.continueText}>Continue</Text>
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
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    subtitle: {
        color: "#6B7280",
        fontSize: 14,
        marginTop: 6,
        marginBottom: 18,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
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
    instructions: {
        marginTop: 20,
    },
    instructionHeader: {
        color: "#111827",
        fontWeight: "600",
        marginBottom: 6,
    },
    bullet: {
        color: "#4B5563",
        fontSize: 14,
        lineHeight: 22,
    },
    infoBox: {
        backgroundColor: "#FFF7ED",
        borderRadius: 8,
        padding: 12,
        marginTop: 18,
    },
    infoText: {
        fontSize: 13,
        color: "#92400E",
        lineHeight: 18,
    },
    captureBtn: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
    },
    captureText: {
        color: "#111827",
        fontWeight: "600",
        fontSize: 15,
    },
    continueBtn: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#EF4444",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    continueText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
