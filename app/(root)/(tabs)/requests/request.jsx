import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();

// 🟢 Available Requests 

const SAVED_KEY = "SAVED_REQUESTS";

// Save request ID
const saveRequest = async (id) => {

    try {

        const stored = await AsyncStorage.getItem(SAVED_KEY);
        const parsed = stored ? JSON.parse(stored) : [];

        if (!parsed.includes(id)) {
            parsed.push(id);
            await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(parsed));
        }
    } catch (err) {
        console.log(err);
    }
};

// Remove saved request
const removeRequest = async (id) => {
    try {
        const stored = await AsyncStorage.getItem(SAVED_KEY);
        let parsed = stored ? JSON.parse(stored) : [];

        parsed = parsed.filter(item => item !== id);
        await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(parsed));
    } catch (err) {
        console.log(err);
    }
};

// Get saved IDs
const getSavedRequests = async () => {
    const stored = await AsyncStorage.getItem(SAVED_KEY);
    return stored ? JSON.parse(stored) : [];
};


function AvailableRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [savedIds, setSavedIds] = useState([]);

    const loadSaved = async () => {
        const ids = await getSavedRequests();
        setSavedIds(ids);
    };

    const toggleSave = async (id) => {
        if (savedIds.includes(id)) {
            await removeRequest(id);
            setSavedIds(savedIds.filter(item => item !== id));
        } else {
            await saveRequest(id);
            setSavedIds([...savedIds, id]);
        }
    };

    const fetchRequests = async () => {
        try {
            const token = await getToken("token");
            const res = await fetch(`${BASE_URL}/get-requests`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            });

            const data = await res.json();
            setRequests(data.data || []);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
        loadSaved();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {requests.map((req) => {
                const isSaved = savedIds.includes(req.id);

                return (
                    <View key={req.id} style={styles.card}>
                        {/* 🔘 Save Button */}
                        <TouchableOpacity
                            style={{ position: "absolute", top: 12, right: 12 }}
                            onPress={() => toggleSave(req.id)}
                        >
                            <Ionicons
                                name={isSaved ? "bookmark" : "bookmark-outline"}
                                size={24}
                                color={isSaved ? "#FF9900" : "#777"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                router.push({
                                    pathname: "/requests/requestDetails",
                                    params: {
                                        id: req.id,
                                        name: req.user?.name || "Unknown",
                                        location: req.location,
                                        description: req.description,
                                        requestLocation: req.location,
                                    },
                                })
                            }
                        >
                            <View style={styles.userRow}>
                                <View style={styles.avatar} />
                                <View>
                                    <Text style={styles.name}>
                                        {req.user?.name || "Unknown User"}
                                    </Text>
                                    <Text style={styles.subText}>
                                        {req.location || "Unknown location"}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.description}>{req.description}</Text>

                            <Text style={styles.locationText}>
                                Request location:{" "}
                                <Text style={styles.locationLink}>{req.location}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </ScrollView>
    );
}



// 🔵 Posted Requests
function PostedRequests() {
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* 🕒 Waiting for Responses */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>Waiting for responses</Text>
                </View>

                <View style={styles.lightCard}>
                    <Text style={styles.cardTitle}>The Nosta Café</Text>
                    <Text style={styles.cardDescription}>
                        I want to see what the cinema currently looks like. Also ask for the
                        price of movie tickets, and…
                    </Text>
                </View>

                {/* 🔴 Active */}
                <View style={styles.sectionHeaderActive}>
                    <Text style={styles.sectionHeaderActiveText}>Active</Text>
                </View>

                <View style={styles.activeCard}>
                    <Text style={styles.cardTitle}>Jabi Lake Mall</Text>
                    <Text style={styles.cardDescription}>
                        I want to see what the cinema currently looks like. Also ask for the
                        price of movie tickets, and…
                    </Text>
                    <TouchableOpacity style={styles.viewButton}>
                        <Text style={styles.viewButtonText}>View all responders</Text>
                    </TouchableOpacity>
                </View>

                {/* ⚪ Completed */}
                <View style={styles.sectionHeaderCompleted}>
                    <Text style={styles.sectionHeaderCompletedText}>Completed</Text>
                </View>

                <View style={styles.completedCard}>
                    <Text style={styles.cardTitle}>Silverbird, SEC</Text>
                    <Text style={styles.cardDescription}>
                        I want to see what the cinema currently looks like. Also ask for the
                        price of movie tickets, and…
                    </Text>
                </View>
            </ScrollView>

            {/* ➕ Floating Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(root)/(tabs)/requests/index2')}
            >
                <Ionicons name="add" size={26} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

// 🟣 Sent Offers
function SentOffers() {
    return (
        <View style={styles.emptyContainer}>
            <Ionicons name="paper-plane-outline" size={40} color="#ccc" />
            <Text style={styles.emptyTitle}>No offers sent</Text>
            <Text style={styles.emptyText}>
                When you send an offer, it will appear here.
            </Text>
        </View>
    );
}

export default function RequestsTabs() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Requests</Text>
            </View>

            <Tab.Navigator
                screenOptions={{
                    tabBarIndicatorStyle: { backgroundColor: "#000" },
                    tabBarLabelStyle: {
                        fontWeight: "600",
                        textTransform: "none",
                        fontSize: 14,
                    },
                    tabBarActiveTintColor: "#000",
                    tabBarInactiveTintColor: "#999",
                    tabBarStyle: {
                        backgroundColor: "#fff",
                        elevation: 0,
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee",
                    },
                }}
            >
                <Tab.Screen name="Available" component={AvailableRequests} />
                <Tab.Screen name="Posted" component={PostedRequests} />
                <Tab.Screen name="Sent offers" component={SentOffers} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
        borderWidth: 1,
        borderColor: "#eee",
    },
    userRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ddd",
        marginRight: 12,
    },
    name: { fontWeight: "600", fontSize: 16, color: "#000" },
    subText: { color: "#888", fontSize: 13 },
    description: { color: "#444", fontSize: 14, marginBottom: 8 },
    locationText: { fontSize: 13, color: "#666" },
    locationLink: { color: "#007AFF", fontWeight: "500" },

    sectionHeader: {
        backgroundColor: "#F6F7FB",
        padding: 8,
        borderRadius: 6,
        marginBottom: 10,
    },
    sectionHeaderText: {
        color: "#6C6C6C",
        fontWeight: "600",
        fontSize: 14,
    },
    sectionHeaderActive: {
        backgroundColor: "#FF3B30",
        padding: 8,
        borderRadius: 6,
        marginTop: 20,
    },
    sectionHeaderActiveText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    sectionHeaderCompleted: {
        backgroundColor: "#E9E9E9",
        padding: 8,
        borderRadius: 6,
        marginTop: 20,
    },
    sectionHeaderCompletedText: {
        color: "#8A8A8A",
        fontWeight: "600",
    },
    lightCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 16,
    },
    activeCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#FF3B30",
    },
    completedCard: {
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        opacity: 0.9,
        marginTop: 10,
    },
    cardTitle: { fontSize: 15, fontWeight: "600", marginBottom: 4 },
    cardDescription: { color: "#555", fontSize: 13 },
    viewButton: {
        backgroundColor: "#FF3B30",
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    viewButtonText: { color: "#fff", fontWeight: "600" },
    fab: {
        position: "absolute",
        bottom: 25,
        right: 25,
        backgroundColor: "#000",
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginTop: 10,
    },
    emptyText: { fontSize: 14, color: "#888", marginTop: 4 },
});
