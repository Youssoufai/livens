import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubmitContentScreen() {
    const params = useLocalSearchParams();
    const media = params.media ? JSON.parse(params.media) : [];
    const comment = params.comment || "";
    const requestId = params.request_id; // 🔥 must exist

    const [loading, setLoading] = useState(false);

    function goBackEditPhotos() {
        router.push({
            pathname: "/submit/capture",
            params: {
                media: JSON.stringify(media.map((m) => m.uri)),
                request_id: 2,
                comment,
            },
        });
    }

    async function onSubmit() {
        if (!requestId) {
            Alert.alert("Error", "Missing request id.");
            return;
        }

        if (!media.length && !comment) {
            Alert.alert("Error", "Please add images or a comment before submitting.");
            return;
        }

        setLoading(true);

        try {
            const token = await getToken("token");

            if (!token) {
                Alert.alert("Error", "Authentication failed.");
                setLoading(false);
                return;
            }

            const formData = new FormData();

            media.forEach((photo, index) => {
                const uri = photo.uri.startsWith("file://") ? photo.uri : `file://${photo.uri}`;
                formData.append("media[]", {
                    uri,
                    name: `photo_${index}.jpg`,
                    type: "image/jpeg",
                });
            });

            formData.append("comment", comment || "");
            formData.append("request_id", requestId.toString());

            const response = await fetch(`${BASE_URL}/submit-response`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
                body: formData,
            });

            const data = await response.json();
            console.log("📥 Server Response:", data);

            if (!response.ok) {
                Alert.alert("Submission Failed", JSON.stringify(data.errors || data.message));
            } else {
                Alert.alert("Success", "Response submitted!");
                router.push({
                    pathname: "/requests/confirmation",
                    params: {
                        media: JSON.stringify(media),
                        comment,
                        request_id: requestId,
                    },
                });
            }
        } catch (err) {
            console.error("🚨 Submission error:", err);
            Alert.alert("Network Error", "Please check your internet or try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={{ fontSize: 12, color: "#555" }}>Step 3 of 3</Text>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>Submit content</Text>

                {media.length > 0 && (
                    <View style={{ marginTop: 20, flexDirection: "row", flexWrap: "wrap" }}>
                        {media.map((photo, i) => (
                            <Image
                                key={i}
                                source={{ uri: photo.uri }}
                                style={{
                                    width: 90,
                                    height: 90,
                                    borderRadius: 10,
                                    marginRight: 10,
                                    marginBottom: 10,
                                    backgroundColor: "#eee",
                                }}
                            />
                        ))}
                    </View>
                )}

                <TouchableOpacity onPress={goBackEditPhotos}>
                    <Text style={{ color: "#007AFF", marginTop: 8 }}>Edit photos</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>Comment</Text>
                    <Text style={{ color: "#555", marginTop: 4 }}>
                        {comment || "No comment provided"}
                    </Text>
                </View>
            </ScrollView>

            <View style={{ padding: 20 }}>
                <TouchableOpacity
                    onPress={onSubmit}
                    disabled={loading}
                    style={{
                        backgroundColor: "#ff3b30",
                        padding: 16,
                        borderRadius: 50,
                        opacity: loading ? 0.5 : 1,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    {loading && <ActivityIndicator color="#fff" style={{ marginRight: 10 }} />}
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                        {loading ? "Submitting..." : "Submit content"}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
