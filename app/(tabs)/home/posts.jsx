
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "@/styles/postStyle";
import { getToken } from "@/utils/secureStore";
import { BASE_URL } from "@/constants/url";

export default function SearchPostsScreen() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [period, setPeriod] = useState("all");
    const [sort, setSort] = useState("latest");

    const fetchPosts = async () => {
        if (!searchQuery.trim()) {
            setError("Please enter a search term.");
            return;
        }

        try {
            setLoading(true);
            const token = await getToken();
            console.log("🔑 Sending token:", token);

            const response = await fetch(`${BASE_URL}/search-requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
                body: JSON.stringify({
                    search: searchQuery,
                    period,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.log("❌ Error Response Body:", errorText);
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("📥 API Response:", data);
            setPosts(data.data || []);
            setError(null);
        } catch (err) {
            console.error("❌ Error fetching posts:", err);
            setError("Failed to fetch results. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Search Bar with Button */}
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <TextInput
                        placeholder="Search places, areas, events"
                        placeholderTextColor="#111827"
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={fetchPosts} // 🔹 Enter key triggers search
                    />

                    <TouchableOpacity style={styles.searchBtn} onPress={fetchPosts}>
                        <Text style={styles.searchBtnText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filter Buttons */}
            <View style={styles.filtersRow}>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setLocation(location === "Abuja" ? "" : "Abuja")}
                >
                    <Text style={styles.filterText}>Location: {location || "Any"}</Text>
                    <Ionicons name="chevron-down" size={14} color="#111827" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() =>
                        setPeriod(period === "weekly" ? "monthly" : period === "monthly" ? "all" : "weekly")
                    }
                >
                    <Text style={styles.filterText}>Period: {period}</Text>
                    <Ionicons name="chevron-down" size={14} color="#111827" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() =>
                        setSort(sort === "latest" ? "oldest" : sort === "oldest" ? "popular" : "latest")
                    }
                >
                    <Text style={styles.filterText}>Sort: {sort}</Text>
                    <Ionicons name="chevron-down" size={14} color="#111827" />
                </TouchableOpacity>
            </View>

            {/* Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#de1c1c" />}

            {/* Error Message */}
            {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}

            {/* Results */}
            {!loading && !error && (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.resultsInfo}>
                        {posts.length} results found
                    </Text>

                    {posts.map((post) => (
                        <TouchableOpacity
                            key={post.id}
                            style={styles.postCard}
                            activeOpacity={0.7}
                            onPress={() =>
                                router.push({
                                    pathname: "/(root)/(tabs)/home/posts-details",
                                    params: { id: post.id },
                                })
                            }
                        >
                            <View style={styles.postHeader}>
                                <View style={styles.avatarPlaceholder} />
                                <View>
                                    <Text style={styles.name}>{post.user?.name || "Unknown"}</Text>
                                    <Text style={styles.location}>{post.location || "Not specified"}</Text>
                                </View>
                            </View>

                            <Text style={styles.postQuestion}>{post.question}</Text>

                            <Text style={styles.requestLocation}>
                                Request location: <Text style={styles.link}>{post.address}</Text>
                            </Text>

                            {post.latest_response && (
                                <View style={styles.responseCard}>
                                    <View style={styles.responseLeft}>
                                        <View style={styles.smallAvatar} />
                                        <View>
                                            <Text style={styles.responseName}>
                                                {post.latest_response.user?.name}
                                            </Text>
                                            <Text style={styles.responseTime}>
                                                Responder • {post.latest_response.time_ago}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.responseText}>
                                        {post.latest_response.answer}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
