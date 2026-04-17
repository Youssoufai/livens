import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BASE_URL } from "../constants/url";
import { getToken } from "../utils/secureStore";

export default function StatusTab({ requestId }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [loadingMainResponse, setLoadingMainResponse] = useState(true);

    const [statusResponse, setStatusResponse] = useState(null);
    const [mainResponse, setMainResponse] = useState(null);

    /* ---------------- FETCH TEMP RESPONSES ---------------- */

    const fetchTempResponses = async () => {
        try {
            if (!requestId) return;

            const token = await getToken("token");

            const res = await fetch(
                `${BASE_URL}/get-temp-responses/${requestId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.replace(/"/g, "")}`,
                    },
                }
            );

            const data = await res.json();

            console.log("Temp Responses:", data);

            setStatusResponse(data?.data || []);
        } catch (error) {
            console.log("Status fetch error:", error);
        } finally {
            setLoadingStatus(false);
        }
    };

    /* ---------------- FETCH MAIN RESPONSE ---------------- */

    const fetchMainResponse = async () => {
        try {
            if (!requestId) return;

            const token = await getToken("token");

            const res = await fetch(
                `${BASE_URL}/get-response/${requestId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token.replace(/"/g, "")}`,
                    },
                }
            );

            const data = await res.json();

            console.log("Main Response:", data);

            setMainResponse(data?.data || data);
        } catch (error) {
            console.log("Main response fetch error:", error);
        } finally {
            setLoadingMainResponse(false);
        }
    };

    /* ---------------- USE EFFECT ---------------- */

    useEffect(() => {
        if (requestId) {
            fetchTempResponses();
            fetchMainResponse();
        }
    }, [requestId]);

    /* ---------------- LOADING ---------------- */

    if (loadingStatus || loadingMainResponse) {
        return (
            <Text style={{ textAlign: "center", marginTop: 40, color: "#777" }}>
                Loading status...
            </Text>
        );
    }

    /* ---------------- NORMALIZE RESPONSE ---------------- */

    const responder =
        Array.isArray(statusResponse) && statusResponse.length > 0
            ? statusResponse[0]
            : {
                id: null,
                name: "No responder yet",
                location: "Waiting for approval",
                uploads: [],
                isStatic: true,
            };

    /* ---------------- START CHAT ---------------- */

    const startConversation = async () => {
        if (responder.isStatic) return;

        try {
            const token = await getToken("token");

            const res = await fetch(`${BASE_URL}/conversations`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            });

            const data = await res.json();
            const conversations = data?.data || data;

            const existingConversation = conversations.find((conv) =>
                conv.users?.some(
                    (user) =>
                        user.id ==
                        (responder.user?.id || responder.id)
                )
            );

            let conversationId;

            if (existingConversation) {
                conversationId = existingConversation.id;
            } else {
                const createRes = await fetch(`${BASE_URL}/conversations`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${token.replace(/"/g, "")}`,
                    },
                    body: JSON.stringify({
                        user_ids: [responder.user?.id || responder.id],
                        title: "conversation",
                    }),
                });

                const createData = await createRes.json();
                conversationId =
                    createData?.data?.id || createData?.id;
            }

            router.push({
                pathname: "/requests/chat",
                params: {
                    conversation_id: conversationId,
                    user: JSON.stringify(responder),
                },
            });
        } catch (err) {
            console.log("Conversation error:", err);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <View
            style={{
                backgroundColor: "#fff",
                padding: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#eee",
            }}
        >
            {/* HEADER */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 12,
                }}
            >
                <View
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#e5e5e5",
                        marginRight: 10,
                    }}
                />

                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600", fontSize: 15 }}>
                        {responder?.user?.name ||
                            responder?.name ||
                            "Unknown"}
                    </Text>

                    <Text style={{ fontSize: 13, color: "#777" }}>
                        {responder?.user?.location ||
                            responder?.location ||
                            "No address"}
                    </Text>
                </View>

                <TouchableOpacity
                    disabled={responder?.isStatic}
                    onPress={startConversation}
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        borderRadius: 20,
                        marginRight: 8,
                        opacity: responder?.isStatic ? 0.5 : 1,
                    }}
                >
                    <Text style={{ fontWeight: "500" }}>
                        Message
                    </Text>
                </TouchableOpacity>

                {!responder?.isStatic && (
                    <TouchableOpacity
                        onPress={() =>
                            setMenuVisible(!menuVisible)
                        }
                    >
                        <Ionicons
                            name="ellipsis-horizontal"
                            size={20}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* CONTENT */}
            <Text style={{ fontWeight: "600", marginBottom: 6 }}>
                Content
            </Text>

            {!Array.isArray(responder?.uploads) ||
                responder.uploads.length === 0 ? (
                <Text
                    style={{
                        color: "#777",
                        marginBottom: 12,
                    }}
                >
                    No content uploaded yet.
                </Text>
            ) : (
                <ScrollView horizontal style={{ marginBottom: 12 }}>
                    {responder.uploads.map((item, i) => (
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

            {/* COMMENTS */}
            <Text style={{ fontWeight: "600", marginBottom: 6 }}>
                Comments
            </Text>

            {mainResponse?.comment ? (
                <Text style={{ color: "#444" }}>
                    {mainResponse.comment}
                </Text>
            ) : (
                <Text style={{ color: "#777" }}>
                    No comment has been added yet.
                </Text>
            )}
        </View>
    );
}