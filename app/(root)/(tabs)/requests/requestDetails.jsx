import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestDetails() {
    const params = useLocalSearchParams();
    const [hasOffered, setHasOffered] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", padding: 16 }}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>

                <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 12 }}>
                    Request details
                </Text>

                <View style={{ flexDirection: "row", marginLeft: "auto" }}>
                    <Ionicons name="share-outline" size={22} color="#000" style={{ marginRight: 18 }} />
                    <Ionicons name="ellipsis-vertical" size={22} color="#000" />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>

                {/* Title */}
                <Text style={{ fontSize: 22, fontWeight: "700", lineHeight: 30 }}>
                    {params.description}
                </Text>

                {/* Reward */}
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
                    <Ionicons name="cash-outline" size={20} color="#000" />
                    <Text style={{ fontSize: 18, fontWeight: "600", marginLeft: 6 }}>
                        ₦{params.reward}
                    </Text>
                </View>

                {/* User Card */}
                <View
                    style={{
                        backgroundColor: "#fff",
                        padding: 16,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "#eee",
                        marginTop: 20,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={{
                                uri: params.avatar ??
                                    "https://ui-avatars.com/api/?name=User&background=eee&color=555",
                            }}
                            style={{
                                width: 45,
                                height: 45,
                                borderRadius: 45,
                                marginRight: 12,
                            }}
                        />

                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                {params.name || "Unknown User"}
                            </Text>

                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
                                <Ionicons name="checkmark-circle" size={16} color="green" />
                                <Text style={{ marginLeft: 4, color: "green" }}>Verified user</Text>
                            </View>
                        </View>
                    </View>

                    {/* Location */}
                    <View style={{ marginTop: 18 }}>
                        <Text style={{ color: "#777", marginBottom: 4 }}>Location</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="location-outline" size={18} color="#000" />
                            <Text style={{ marginLeft: 6, fontSize: 15 }}>
                                {params.location}
                            </Text>
                        </View>
                    </View>

                    {/* Duration */}
                    <View style={{ marginTop: 18 }}>
                        <Text style={{ color: "#777", marginBottom: 4 }}>Duration</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="time-outline" size={18} color="#000" />
                            <Text style={{ marginLeft: 6, fontSize: 15 }}>
                                {params.duration}
                            </Text>
                        </View>
                    </View>

                    {/* Comment Requirement */}
                    <View style={{ marginTop: 18 }}>
                        <Text style={{ color: "#777", marginBottom: 4 }}>Comment requirements</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#000" />
                            <Text style={{ marginLeft: 6, fontSize: 15 }}>
                                {params.allow_comment === "1"
                                    ? "Comments required"
                                    : "Comments not required"}
                            </Text>
                        </View>
                    </View>

                </View>

                {/* Description */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 6 }}>
                        Description
                    </Text>
                    <Text style={{ fontSize: 15, color: "#444", lineHeight: 22 }}>
                        {params.description}
                    </Text>
                </View>

            </ScrollView>

            {/* Bottom bar */}
            <View
                style={{
                    padding: 16,
                    borderTopWidth: 1,
                    borderColor: "#eee",
                    backgroundColor: "#fff",
                }}
            >
                <Text style={{ textAlign: "center", marginBottom: 10, color: "#666" }}>
                    {hasOffered
                        ? "3+ people have already sent their offer!"
                        : "3 people have already sent their offer."}
                </Text>

                <TouchableOpacity
                    onPress={() => router.push('/(root)/(tabs)/requests/captureContent')}
                    disabled={hasOffered}
                    style={{
                        backgroundColor: hasOffered ? "#ddd" : "#ff3b30",
                        paddingVertical: 14,
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: hasOffered ? "#666" : "#fff",
                            fontSize: 16,
                            fontWeight: "600",
                        }}
                    >
                        {hasOffered ? "Offer sent!" : "Offer to help"}
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
