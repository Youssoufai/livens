import { BASE_URL } from "@/app/constants/url";
import { styles } from "@/app/styles/requestTabStyle";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();


function AvailableRequests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    /* ---------------- LOAD USER ---------------- */

    const loadCurrentUser = async () => {
        try {
            const userId = await AsyncStorage.getItem("user_id");

            console.log("Current User ID:", userId);

            if (userId) {
                setCurrentUserId(String(userId));
            }
        } catch (err) {
            console.log("Error loading user_id:", err);
        } finally {
            setUserLoaded(true);
        }
    };

    /* ---------------- FETCH REQUESTS ---------------- */

    const fetchRequests = async () => {
        try {
            const token = await getToken("token");

            const res = await fetch(`${BASE_URL}/all-requests`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            });

            const data = await res.json();

            console.log("Fetched Requests:", data);

            setRequests(data?.data || []);

        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- INIT ---------------- */

    useEffect(() => {
        loadCurrentUser();
        fetchRequests();
    }, []);

    /* ---------------- WAIT UNTIL BOTH LOADED ---------------- */

    if (loading || !userLoaded) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    /* ---------------- UI ---------------- */

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {requests.map((req) => {

                // ✅ ONLY compare user_id
                const isOwner =
                    String(currentUserId) === String(req.user_id);

                console.log(
                    "Compare:",
                    currentUserId,
                    req.user_id,
                    "Owner:",
                    isOwner
                );

                return (
                    <View key={req.id} style={styles.card}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {

                                if (!req?.id) return;

                                if (isOwner) {

                                    router.push(
                                        `/requests/requestDetails/${req.id}`
                                    );

                                } else {

                                    router.push({
                                        pathname: `/requests/accept-request/${req.id}`,
                                        params: {
                                            request_id: String(req.id),
                                        },
                                    });
                                }
                            }}
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

                            <Text style={styles.description}>
                                {req.description}
                            </Text>

                            <Text style={styles.locationText}>
                                Request location:
                                <Text style={styles.locationLink}>
                                    {" "}{req.location}
                                </Text>
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

