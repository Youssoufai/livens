import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function SearchScreen() {
    return (
        <ImageBackground
            source={require("@/assets/images/search.png")}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Top Texts */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        Search a place in <Text style={styles.highlight}>Abuja</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Search any location to see what’s happening there.
                    </Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <TextInput
                        placeholder="Search places, areas, events"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                        onFocus={() => router.push("/(root)/(tabs)/search/posts")}
                    />
                </View>

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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    scrollContainer: {
        padding: 24,
        paddingBottom: 100,
    },
    textContainer: {
        marginTop: 80,
        marginBottom: 24,
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
        color: "#F3F4F6",
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
        height: 48,
        backgroundColor: "rgba(255,255,255,0.15)", // slight transparency for contrast
        marginBottom: 24,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
        color: "#fff",
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    sectionDesc: {
        color: "#E5E7EB",
        fontSize: 14,
        marginBottom: 16,
        lineHeight: 20,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
    },
    optionIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "rgba(255,255,255,0.2)",
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
