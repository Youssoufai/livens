import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { id: "1", text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", sender: "user" },
    ]);

    const handleSend = () => {
        if (message.trim()) {
            setMessages([...messages, { id: Date.now().toString(), text: message, sender: "me" }]);
            setMessage("");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="#000" />
                <View>
                    <Text style={styles.name}>Chimka Amanda</Text>
                    <Text style={styles.subText}>Last seen today at 12:30 PM</Text>
                </View>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.messageBubble, item.sender === "me" ? styles.myMessage : styles.userMessage]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
                contentContainerStyle={styles.chatBody}
            />

            <View style={styles.inputRow}>
                <TextInput
                    placeholder="Write a message..."
                    value={message}
                    onChangeText={setMessage}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                    <Ionicons name="arrow-up" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
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
    name: { fontWeight: "700", fontSize: 16 },
    subText: { fontSize: 12, color: "#666" },
    chatBody: { padding: 16 },
    messageBubble: {
        maxWidth: "75%",
        borderRadius: 12,
        padding: 12,
        marginVertical: 4,
    },
    myMessage: {
        backgroundColor: "#FF3B30",
        alignSelf: "flex-end",
    },
    userMessage: {
        backgroundColor: "#f1f1f1",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "#000",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        padding: 10,
    },
    input: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 14,
    },
    sendBtn: {
        backgroundColor: "#FF3B30",
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
    },
});
