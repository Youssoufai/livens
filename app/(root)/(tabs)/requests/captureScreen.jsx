import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CaptureScreen() {
    const params = useLocalSearchParams();

    // 🔹 Ensure request_id is carried forward
    const requestId = params.request_id;
    if (!requestId) {
        console.error("🚨 CaptureScreen missing request_id!");
    }

    const initialImages = params.media ? JSON.parse(params.media) : [];
    const [media, setMedia] = useState(initialImages);

    function removeImage(uri) {
        setMedia(media.filter((img) => img !== uri));
    }

    function goNext() {
        if (media.length === 0) return;

        router.push({
            pathname: "/(root)/(tabs)/requests/submitScreen",
            params: {
                media: JSON.stringify(media.map((m) => (typeof m === "string" ? m : m.uri))),
                request_id: requestId, // 🔥 guaranteed
                comment: params.comment || "",
            },
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ fontSize: 12, color: "#777", marginBottom: 8 }}>Step 1 of 3</Text>
                <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
                    Capture photos and videos
                </Text>
                <Text style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
                    We&apos;ll review every photo before the requester views it.
                </Text>

                <FlatList
                    data={media}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    renderItem={({ item }) => (
                        <View style={{ marginRight: 12 }}>
                            <Image
                                source={{ uri: typeof item === "string" ? item : item.uri }}
                                style={{
                                    width: 125,
                                    height: 125,
                                    borderRadius: 12,
                                    backgroundColor: "#eee",
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => removeImage(item)}
                                style={{
                                    position: "absolute",
                                    top: 6,
                                    right: 6,
                                    backgroundColor: "#fff",
                                    padding: 4,
                                    borderRadius: 12,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.15,
                                    shadowRadius: 3,
                                }}
                            >
                                <Text>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: "600", marginBottom: 6 }}>Your photos must be:</Text>
                    <Text style={{ color: "#444", marginBottom: 4 }}>• Clearly and carefully taken.</Text>
                    <Text style={{ color: "#444", marginBottom: 4 }}>
                        • Inclusive of places specified by the requester.
                    </Text>
                    <Text style={{ color: "#444" }}>
                        • Moments and people in-action, accurately illustrating what the respondent wants to see.
                    </Text>
                </View>

                <View
                    style={{
                        backgroundColor: "#FFF7D1",
                        marginTop: 25,
                        padding: 16,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "#F3D26A",
                    }}
                >
                    <Text style={{ fontWeight: "600", marginBottom: 4 }}>Maximum image upload</Text>
                    <Text style={{ fontSize: 13, color: "#555" }}>
                        You can only upload 1-10 images. Ensure to follow the guidelines above.
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 15,
                        borderRadius: 30,
                        marginTop: 30,
                    }}
                >
                    <Text style={{ textAlign: "center", fontWeight: "500" }}>Capture more photos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={media.length === 0}
                    onPress={goNext}
                    style={{
                        backgroundColor: media.length === 0 ? "#ccc" : "#FF3B30",
                        padding: 15,
                        borderRadius: 30,
                        marginTop: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: "600",
                            fontSize: 16,
                        }}
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
