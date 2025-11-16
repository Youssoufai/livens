import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { styles } from "../../../styles/postStyle";
export default function SearchPostsScreen() {
    return (
        <View style={styles.container}>
            {/* Top Search Bar */}
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={18} color="#9CA3AF" />
                    <TextInput
                        placeholder="nosta cafe"
                        placeholderTextColor="#111827"
                        style={styles.searchInput}
                        defaultValue="nosta cafe"
                    />
                </View>
                <Ionicons name="options-outline" size={22} color="#111827" />
            </View>

            {/* Filters */}
            <View style={styles.filtersRow}>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Date posted</Text>
                    <Ionicons name="chevron-down" size={14} color="#111827" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Sort by</Text>
                    <Ionicons name="chevron-down" size={14} color="#111827" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterText}>Has responses</Text>
                    <Ionicons name="chevron-down" size={14} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Results Info */}
                <Text style={styles.resultsInfo}>
                    23 search results for{" "}
                    <Text style={styles.highlight}>
                        The Nosta Cafe & Grills, 900110
                    </Text>{" "}
                    closest to you
                </Text>

                {/* Post 1 */}
                <TouchableOpacity
                    style={styles.postCard}
                    activeOpacity={0.7}
                    onPress={() => router.push("/(root)/(tabs)/search/posts-details")}
                >
                    <View style={styles.postHeader}>
                        <View style={styles.avatarPlaceholder} />
                        <View>
                            <Text style={styles.name}>Emeka Chukwuka</Text>
                            <Text style={styles.location}>
                                Federal Capital Territory, 900110
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.postQuestion}>
                        Has the queue at the even center subsided?
                    </Text>

                    <Text style={styles.requestLocation}>
                        Request location:{" "}
                        <Text style={styles.link}>9472 W Monroe Street</Text>
                    </Text>

                    <View style={styles.responseCard}>
                        <View style={styles.responseLeft}>
                            <View style={styles.smallAvatar} />
                            <View>
                                <Text style={styles.responseName}>John Ackerman</Text>
                                <Text style={styles.responseTime}>Responder • 2d ago</Text>
                            </View>
                        </View>
                        <Text style={styles.responseText}>
                            They’re currently running a discount so the place is packed.
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Post 2 */}
                <View style={styles.postCard}>
                    <View style={styles.postHeader}>
                        <View style={styles.avatarPlaceholder} />
                        <View>
                            <Text style={styles.name}>Timothy Weimann</Text>
                            <Text style={styles.location}>Abuja, 900110</Text>
                        </View>
                    </View>

                    <Text style={styles.postQuestion}>
                        Forem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>

                    <Text style={styles.requestLocation}>
                        Request location:{" "}
                        <Text style={styles.link}>9472 W Monroe Street</Text>
                    </Text>

                    <View style={styles.responseCard}>
                        <View style={styles.responseLeft}>
                            <View style={styles.smallAvatar} />
                            <View>
                                <Text style={styles.responseName}>John Ackerman</Text>
                                <Text style={styles.responseTime}>Responder • 2d ago</Text>
                            </View>
                        </View>
                        <Text style={styles.responseText}>
                            They’re currently running a discount so the place is packed.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


