import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../../constants/url"; // adjust path if needed

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (!token) {
                    console.warn("No token found");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${BASE_URL}/profile`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // or "Bearer" if your API uses Bearer
                        Accept: "application/json",
                    },
                });

                const data = await response.json();
                console.log("Profile data:", data); // debug log

                // Handle nested responses
                // if API returns {status, message, data: { ...user }}
                const profileData = data.data || data;

                setProfile(profileData);
            } catch (error) {
                console.log("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 100 }} />
            </SafeAreaView>
        );
    }

    if (!profile) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: "center", marginTop: 100 }}>No profile data found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text style={styles.header}>Profile</Text>

                {/* User Info */}
                <TouchableOpacity style={styles.profileRow}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: profile.avatar || "https://via.placeholder.com/100",
                            }}
                            style={styles.avatar}
                        />
                    </View>
                    <View>
                        <Text style={styles.name}>{profile.name || profile.full_name || "No Name"}</Text>
                        <Text style={styles.edit}>{profile.email || "No Email"}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: "auto" }} />
                </TouchableOpacity>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Balance:</Text>
                        <TouchableOpacity>
                            <Text style={styles.history}>Transaction history</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.balanceAmount}>₦{profile.balance || "0.00"}</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.withdrawButton}>
                            <Text style={styles.withdrawText}>Withdraw</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.fundButton}>
                            <Text style={styles.fundText}>Fund wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Settings Section */}
                <View style={styles.section}>
                    <ProfileOption
                        icon="lock-closed-outline"
                        label="Password & security"
                        desc="Update your password and manage your account security."
                    />
                    <ProfileOption
                        icon="notifications-outline"
                        label="Notifications"
                        desc="Control the alerts you receive for live updates and requests."
                    />
                    <ProfileOption
                        icon="gift-outline"
                        label="Refer users and earn"
                        desc="Invite friends and earn rewards when they join and use the app."
                    />
                    <ProfileOption
                        icon="help-circle-outline"
                        label="Help & Support"
                        desc="Get answers to questions or contact us for help."
                    />
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log out</Text>
                    <Ionicons name="log-out-outline" size={18} color="#f00" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const ProfileOption = ({ icon, label, desc }) => (
    <TouchableOpacity style={styles.optionRow}>
        <Ionicons name={icon} size={22} color="#000" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
            <Text style={styles.optionLabel}>{label}</Text>
            <Text style={styles.optionDesc}>{desc}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
);

// Styles remain the same

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
        color: "#000",
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
    },
    avatarContainer: {
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
    },
    edit: {
        color: "#999",
        fontSize: 13,
        marginTop: 3,
    },
    balanceCard: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    balanceHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    balanceLabel: {
        color: "#999",
        fontSize: 13,
    },
    history: {
        color: "#007AFF",
        fontSize: 13,
    },
    balanceAmount: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 10,
    },
    withdrawButton: {
        backgroundColor: "#f44336",
        borderRadius: 8,
        paddingVertical: 10,
        flex: 1,
        alignItems: "center",
    },
    withdrawText: {
        color: "#fff",
        fontWeight: "600",
    },
    fundButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingVertical: 10,
        flex: 1,
        alignItems: "center",
    },
    fundText: {
        color: "#000",
        fontWeight: "600",
    },
    section: {
        marginTop: 10,
    },
    optionRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#f2f2f2",
        paddingVertical: 15,
    },
    optionLabel: {
        fontSize: 15,
        fontWeight: "600",
        color: "#000",
    },
    optionDesc: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#f00",
        borderRadius: 10,
        paddingVertical: 12,
        marginVertical: 30,
    },
    logoutText: {
        color: "#f00",
        fontWeight: "600",
        marginRight: 6,
    },
});
