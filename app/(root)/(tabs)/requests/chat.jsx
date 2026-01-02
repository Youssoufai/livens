import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
    const { user } = useLocalSearchParams();
    const responder = user ? JSON.parse(user) : {};

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            {/* HEADER */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 14,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} />
                </TouchableOpacity>

                <View
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: "#ddd",
                        marginHorizontal: 10,
                    }}
                />

                <View>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>
                        {responder.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: "#777" }}>
                        Last seen {responder.last_seen || "recently"}
                    </Text>
                </View>
            </View>

            {/* CHAT BODY */}
            <View style={{ flex: 1 }} />

            {/* INPUT */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    borderTopWidth: 1,
                    borderColor: "#eee",
                }}
            >
                <TextInput
                    placeholder="Write a message..."
                    style={{
                        flex: 1,
                        backgroundColor: "#f2f2f2",
                        borderRadius: 20,
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        fontSize: 14,
                    }}
                />

                <TouchableOpacity
                    style={{
                        marginLeft: 10,
                        backgroundColor: "#000",
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Ionicons name="send" color="#fff" size={16} />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
