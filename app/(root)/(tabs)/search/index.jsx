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
            if (!token) {
                router.replace("/(auth)/login");
            } else {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#EF4444" />
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {/* TOP IMAGE SECTION */}
            <ImageBackground
                source={require("@/assets/images/search.png")}
                style={styles.hero}
                resizeMode="cover"
            >
                <View style={styles.heroContent}>
                    <Text style={styles.title}>
                        Search a place in{" "}
                        <Text style={styles.underline}>Abuja</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Search any location to see what’s happening there.
                    </Text>

                    {/* Search Bar */}
                    <TouchableOpacity
                        style={styles.searchBar}
                        activeOpacity={0.85}
                        onPress={() =>
                            router.push("/(root)/(tabs)/search/posts")
                        }
                    >
                        <Text style={styles.searchPlaceholder}>
                            Search places, areas, events
                        </Text>
                        <Ionicons
                            name="search"
                            size={18}
                            color="#9CA3AF"
                        />
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* WHITE SECTION (STARTS UNDER SEARCH BAR) */}
            <View style={styles.whiteSection}>
                <Text style={styles.sectionTitle}>
                    Get started with Livelens
                </Text>
                <Text style={styles.sectionDesc}>
                    You can also start on your own and choose one of these
                    options later.
                </Text>

                {/* Option 1 */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() =>
                        router.push("/(root)/(tabs)/search/posts")
                    }
                >
                    <View style={styles.iconCircle}>
                        <Ionicons name="search" size={20} color="#EF4444" />
                    </View>

                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Search a place</Text>
                        <Text style={styles.optionDesc}>
                            See the most recent news and updates about a place.
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#9CA3AF"
                    />
                </TouchableOpacity>

                {/* Option 2 */}
                <TouchableOpacity
                    style={styles.option}
                    onPress={() =>
                        router.push("/(root)/(tabs)/requests")
                    }
                >
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name="chatbubble-ellipses"
                            size={20}
                            color="#EF4444"
                        />
                    </View>

                    <View style={styles.optionText}>
                        <Text style={styles.optionTitle}>Ask the public</Text>
                        <Text style={styles.optionDesc}>
                            Get answers from locals about what’s happening in a
                            location.
                        </Text>
                    </View>

                    <Ionicons
                        name="chevron-forward"
                        size={18}
                        color="#9CA3AF"
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    hero: {
        height: 360,
        width: "100%",
    },

    heroContent: {
        flex: 1,
        padding: 20,
        justifyContent: "flex-end",
        paddingBottom: 24,
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#FFFFFF",
        lineHeight: 36,
    },

    underline: {
        textDecorationLine: "underline",
    },

    subtitle: {
        marginTop: 6,
        fontSize: 15,
        color: "#F3F4F6",
        lineHeight: 22,
        marginBottom: 16,
    },

    searchBar: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        height: 52,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },

    searchPlaceholder: {
        color: "#9CA3AF",
        fontSize: 15,
    },

    whiteSection: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        paddingTop: 24,
        minHeight: 400,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
    },

    sectionDesc: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 20,
        lineHeight: 20,
    },

    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },

    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#FEE2E2",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 14,
    },

    optionText: {
        flex: 1,
    },

    optionTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#111827",
    },

    optionDesc: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
        lineHeight: 18,
    },
});
