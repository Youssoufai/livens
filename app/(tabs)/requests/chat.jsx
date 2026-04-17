import { getToken } from "@/app/utils/secureStore";
import { BASE_URL } from "@/constants/url";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
    const { user, conversation_id } = useLocalSearchParams();
    const responder = user ? JSON.parse(user) : {};

    const flatListRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [conversationId] = useState(conversation_id || null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    // ✅ Load logged-in user
    useEffect(() => {
        const loadCurrentUser = async () => {
            const raw = await AsyncStorage.getItem("user");
            const parsed = raw ? JSON.parse(raw) : null;

            if (parsed) {
                setCurrentUser(parsed);
                setCurrentUserId(parsed.id);
            }
        };

        loadCurrentUser();
    }, []);

    // ✅ Fetch Messages
    const fetchMessages = async () => {
        if (!conversationId) return;

        try {
            setLoading(true);

            const token = await getToken("token");

            const res = await fetch(
                `${BASE_URL}/conversations/${conversationId}/messages`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setMessages(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
            console.log("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [conversationId]);

    // ✅ Send Message
    const handleSend = async () => {
        if (!input.trim() || !conversationId || sending) return;

        try {
            setSending(true);

            const token = await getToken("token");

            const res = await fetch(`${BASE_URL}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    conversation_id: conversationId,
                    message: input.trim(),
                }),
            });

            const responseData = await res.json();

            if (!res.ok) {
                console.log("Send error:", responseData);
                return;
            }

            setInput("");
            await fetchMessages();

            flatListRef.current?.scrollToEnd({ animated: true });
        } catch (error) {
            console.log("Send error:", error);
        } finally {
            setSending(false);
        }
    };

    // ✅ Modern Message Bubble
    const renderItem = ({ item }) => {
        const isMe = item.sender_id == currentUserId;

        return (
            <View
                style={{
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    backgroundColor: isMe ? "#2563eb" : "#ffffff",
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 18,
                    borderBottomRightRadius: isMe ? 4 : 18,
                    borderBottomLeftRadius: isMe ? 18 : 4,
                    marginVertical: 6,
                    maxWidth: "75%",
                    shadowColor: "#000",
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 1,
                }}
            >
                <Text style={{ color: isMe ? "#fff" : "#111", fontSize: 14 }}>
                    {item.message}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f7fb" }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}
            >
                {/* HEADER */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 16,
                        paddingVertical: 14,
                        backgroundColor: "#fff",
                        borderBottomWidth: 0.5,
                        borderColor: "#e5e7eb",
                    }}
                >
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={22} color="#111" />
                    </TouchableOpacity>

                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: "#d1d5db",
                            marginLeft: 12,
                        }}
                    />

                    <View style={{ marginLeft: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#111" }}>
                            {currentUser?.name || "Chat"}

                        </Text>
                        <Text style={{ fontSize: 12, color: "#6b7280" }}>
                            Active now
                        </Text>
                    </View>
                </View>

                {/* CHAT BODY */}
                {loading ? (
                    <ActivityIndicator style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 16 }}
                        keyboardShouldPersistTaps="handled"
                        onContentSizeChange={() =>
                            flatListRef.current?.scrollToEnd({ animated: true })
                        }
                    />
                )}

                {/* INPUT */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        backgroundColor: "#fff",
                        borderTopWidth: 0.5,
                        borderColor: "#e5e7eb",
                    }}
                >
                    <TextInput
                        placeholder="Message..."
                        placeholderTextColor="#9ca3af"
                        value={input}
                        onChangeText={setInput}
                        style={{
                            flex: 1,
                            backgroundColor: "#f3f4f6",
                            borderRadius: 24,
                            paddingHorizontal: 12,
                            paddingVertical: 12,
                            fontSize: 15,
                        }}
                    />

                    <TouchableOpacity
                        disabled={sending || !input.trim()}
                        onPress={handleSend}
                        style={{
                            marginLeft: 10,
                            backgroundColor: "#2563eb",
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: sending || !input.trim() ? 0.5 : 1,
                        }}
                    >
                        <Ionicons name="send" color="#fff" size={18} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
