import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SearchScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await getToken("token");
            if (!token || token.length === 0) {
                router.replace("/(auth)/login"); // redirect if not authenticated
            } else {
                setLoading(false); // user is authenticated, show screen
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#de1c1c" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require("@/assets/images/search.png")}
            style={styles.background}
            resizeMode="cover"
            blurRadius={3}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Text */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Search a place in <Text style={styles.highlight}>Abuja</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Search any location to see what’s happening there.
                    </Text>
                </View>

                {/* Fake Search Input */}
                <TouchableOpacity
                    style={styles.searchBar}
                    activeOpacity={0.8}
                    onPress={() => router.push("/(root)/(tabs)/search/posts")}
                >
                    <Ionicons name="search" size={18} color="#ddd" />
                    <Text style={styles.fakeInput}>Search places, areas, events</Text>
                </TouchableOpacity>

                {/* Get Started Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Get started with Livelens</Text>
                    <Text style={styles.sectionDesc}>
                        You can also start on your own and choose one of these options later.
                    </Text>

                    {/* Option 1 */}
                    <TouchableOpacity
                        style={styles.option}
                        activeOpacity={0.7}
                        onPress={() => router.push("/(root)/(tabs)/search/posts")}
                    >
                        <View style={styles.optionIcon}>
                            <Ionicons name="search" size={22} color="#EF4444" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.optionTitle}>Search a place</Text>
                            <Text style={styles.optionSubtitle}>
                                See the most recent news and updates about a place.
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>

                    {/* Option 2 */}
                    <TouchableOpacity
                        style={styles.option}
                        activeOpacity={0.7}
                        onPress={() => router.push("/(root)/(tabs)/requests")}
                    >
                        <View style={styles.optionIcon}>
                            <Ionicons name="chatbubble-ellipses" size={22} color="#EF4444" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.optionTitle}>Ask the public</Text>
                            <Text style={styles.optionSubtitle}>
                                Get answers from locals about what’s happening in a location.
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}


// 💅 Styles
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    scrollContainer: {
        padding: 24,
        paddingBottom: 120,
    },
    textContainer: {
        marginTop: 80,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        color: "#fff",
        fontWeight: "700",
        lineHeight: 34,
    },
    highlight: {
        textDecorationLine: "underline",
        color: "#fff",
    },
    subtitle: {
        color: "#E5E7EB",
        fontSize: 15,
        marginTop: 6,
        lineHeight: 22,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.4)",
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 50,
        backgroundColor: "rgba(255,255,255,0.18)",
        marginBottom: 30,
    },
    fakeInput: {
        marginLeft: 8,
        fontSize: 15,
        color: "#E5E7EB",
    },
    section: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    sectionDesc: {
        color: "#D1D5DB",
        fontSize: 14,
        marginBottom: 16,
        lineHeight: 20,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    optionIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "rgba(255,255,255,0.25)",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    optionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#fff",
    },
    optionSubtitle: {
        fontSize: 13,
        color: "#E5E7EB",
        marginTop: 2,
        lineHeight: 18,
    },
});
