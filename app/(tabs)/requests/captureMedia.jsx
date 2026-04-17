import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CapturedMediaScreen({ navigation, route }) {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (route.params?.newPhoto) {
            setPhotos((prev) => [...prev, { uri: route.params.newPhoto }]);
        }
    }, [route.params?.newPhoto]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 160 }}>

                <View style={styles.warningBox}>
                    <Text style={styles.warningText}>Max upload: 5 photos / videos</Text>
                </View>

                <Text style={styles.title}>Already captured</Text>

                <View style={styles.grid}>
                    {photos.map((photo, index) => (
                        <View key={index} style={styles.mediaBox}>
                            <Image source={{ uri: photo.uri }} style={styles.mediaThumb} />

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() =>
                                    setPhotos(photos.filter((_, i) => i !== index))
                                }
                            >
                                <Ionicons name="close" size={14} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.bottomArea}>

                <TouchableOpacity
                    style={styles.captureBtn}
                    onPress={() => navigation.navigate("CameraScreen")}
                >
                    <Text style={styles.captureText}>Capture</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continueBtn}>
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },

    warningBox: {
        backgroundColor: "#FEF3C7",
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 10,
    },
    warningText: { color: "#92400E", fontWeight: "600" },

    title: {
        fontSize: 22,
        fontWeight: "700",
        marginVertical: 20,
        color: "#111827",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    mediaBox: {
        width: "47%",
        aspectRatio: 1,
        borderRadius: 14,
        marginBottom: 16,
        overflow: "hidden",
    },

    mediaThumb: {
        width: "100%",
        height: "100%",
    },

    removeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#EF4444",
        borderRadius: 20,
        padding: 4,
    },

    bottomArea: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    captureBtn: {
        backgroundColor: "#EF4444",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 100,
    },
    captureText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },

    continueBtn: {
        backgroundColor: "#D1D5DB",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 100,
    },
    continueText: {
        color: "#374151",
        fontWeight: "600",
        fontSize: 16,
    },
});
