import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";


export default function SavedRequests() {
    const [savedRequests, setSavedRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSaved = async () => {
        try {
            const token = await getToken("token");
            const all = await fetch(`${BASE_URL}/get-requests`, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            });

            const data = await all.json();
            // const savedIds = await getSav();




        } catch (err) {
            console.error("Error loading saved:", err);
        } finally {
            setLoading(false);
        }
    };

    const unSave = async (id) => {
        //await removeRequest(id);
        setSavedRequests(savedRequests.filter((r) => r.id !== id));
    };

    useEffect(() => {
        fetchSaved();
    }, []);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Saved</Text>

            {savedRequests.map((req) => (
                <View key={req.id} style={styles.card}>
                    {/* Bookmark icon for removing */}
                    <TouchableOpacity
                        onPress={() => unSave(req.id)}
                        style={styles.bookmarkBtn}
                    >
                        <Ionicons name="bookmark" size={22} color="#FF9900" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            router.push({
                                pathname: "/requests/requestDetails",
                                params: {
                                    id: req.id,
                                    name: req.user?.name,
                                    location: req.location,
                                    description: req.description,
                                },
                            })
                        }
                    >
                        <Text style={styles.title}>{req.description}</Text>

                        {/* User details */}
                        <View style={styles.row}>
                            <View style={styles.avatar} />
                            <Text style={styles.user}>{req.user?.name}</Text>
                        </View>

                        <View style={styles.row}>
                            <Ionicons name="location-outline" size={16} color="#555" />
                            <Text style={styles.subText}>{req.location}</Text>
                        </View>

                        {/* Placeholder for price if available */}
                        {req.reward && (
                            <View style={styles.row}>
                                <Ionicons name="cash-outline" size={16} color="#555" />
                                <Text style={styles.subText}>{req.reward}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    header: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
    card: {
        padding: 16,
        borderBottomWidth: 0.7,
        borderBottomColor: "#eee",
        marginBottom: 10,
    },
    title: { fontSize: 17, fontWeight: "600", marginBottom: 6 },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
    avatar: {
        width: 30,
        height: 30,
        backgroundColor: "#ccc",
        borderRadius: 50,
        marginRight: 8,
    },
    user: { fontSize: 14, fontWeight: "500" },
    subText: { fontSize: 13, color: "#555", marginLeft: 4 },
    bookmarkBtn: { position: "absolute", right: 10, top: 10 },
});
