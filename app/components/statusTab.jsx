import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../constants/url";
import { getToken } from "../utils/secureStore";

export default function StatusTab({
    loadingStatus,
    statusResponse,
}) {
    if (loadingStatus) {
        return (
            <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
                Loading status...
            </Text>
        );
    }

    if (!statusResponse) {
        return (
            <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
                No responder has been approved yet.
            </Text>
        );
    }
    const startConversation = async () => {
        try {
            const token = await getToken("token");

            const res = await fetch(`${BASE_URL}/conversations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_ids: [statusResponse.id], // responder id
                    title: "conversation",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to start conversation");
            }

            // Navigate to chat screen with conversation ID
            router.push({
                pathname: "../(root)/(tabs)/requests/chat",
                params: {
                    conversation_id: data.id,
                    user: JSON.stringify(statusResponse),
                },
            });
        } catch (err) {
            console.log("Error", err.message);
        }
    };

    return (
        <View>
            {/* RESPONDER HEADER */}
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: "#eee",
                marginBottom: 12,
            }}>
                <View style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#e5e5e5",
                    marginRight: 10,
                }} />

                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600" }}>
                        {statusResponse.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: "#777" }}>
                        {statusResponse.address}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={startConversation}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                        borderRadius: 20,
                    }}
                >
                    <Text>Message</Text>
                </TouchableOpacity>
            </View>

            {/* UPLOADS */}
            <Text style={{ fontWeight: "600", marginBottom: 6 }}>
                Uploaded content
            </Text>

            {statusResponse.uploads?.length === 0 ? (
                <Text style={{ color: "#777" }}>
                    No content has been uploaded yet.
                </Text>
            ) : (
                <ScrollView horizontal>
                    {statusResponse.uploads.map((_, i) => (
                        <View
                            key={i}
                            style={{
                                width: 90,
                                height: 90,
                                backgroundColor: "#ddd",
                                borderRadius: 8,
                                marginRight: 8,
                            }}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
