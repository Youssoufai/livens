import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Paystack } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../../constants/url";

export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPaystack, setShowPaystack] = useState(false);
    const [fundAmount, setFundAmount] = useState("1000"); // default fund amount
    useFocusEffect(
        useCallback(() => {
            const fetchProfile = async () => {
                setLoading(true);
                try {
                    const token = await getToken("token");
                    if (!token) return;

                    const res = await fetch(`${BASE_URL}/profile`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token.replace(/"/g, "")}`,
                            Accept: "application/json",
                        },
                    });

                    const data = await res.json();
                    if (data?.data) setProfile(data.data);
                } catch (err) {
                    console.error("Error fetching profile:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchProfile();
        }, [])
    );

    const logout = async () => {
        try {
            const token = await getToken("token");
            if (!token) {
                Alert.alert("Error", "No token found.");
                return;
            }

            const res = await fetch(`${BASE_URL}/logout`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                await SecureStore.deleteItemAsync("token");
                router.replace("/(auth)/login");
            } else {
                Alert.alert("Error", data.message || "Logout failed.");
            }
        } catch (err) {
            console.error("Logout error:", err);
            Alert.alert("Error", "Something went wrong during logout.");
        }
    };

    const handlePaymentSuccess = async (response) => {
        console.log("Paystack Success:", response);

        const token = await getToken("token"); // from SecureStore
        const parsedToken = token ? JSON.parse(token) : null;


        try {
            const res = await fetch(`${BASE_URL}/fund-wallet`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${parsedToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    amount: fundAmount,
                    reference: response.transactionRef.reference,
                }),
            });

            const result = await res.json();
            console.log("Backend wallet update:", result);

            if (result.status === "success") {
                Alert.alert("Success", "Wallet funded successfully!");
                setProfile({ ...profile, balance: result.new_balance });
            } else {
                Alert.alert("Error", result.message || "Funding failed.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Funding failed.");
        }
    };

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
                <Text style={styles.header}>Profile</Text>

                <TouchableOpacity style={styles.profileRow} onPress={() => router.push('/(root)/(tabs)/profile/edit')}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: profile.avatar || "https://via.placeholder.com/100",
                            }}
                            style={styles.avatar}
                        />
                    </View>
                    <View>
                        <Text style={styles.name}>{profile.name || "No Name"}</Text>
                        <Text style={styles.edit}>{profile.email || "No Email"}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#999" style={{ marginLeft: "auto" }} />
                </TouchableOpacity>

                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <Text style={styles.balanceLabel}>Balance:</Text>
                        <TouchableOpacity>
                            <Text style={styles.history}>Transaction history</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.balanceAmount}>₦{profile.balance || "0.00"}</Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.withdrawButton} onPress={() => router.push('/(root)/(tabs)/profile/withdraw')}>
                            <Text style={styles.withdrawText}>Withdraw</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.fundButton}
                            onPress={() => router.push('/(root)/(tabs)/profile/fundWallet')}
                        >
                            <Text style={styles.fundText}>Fund wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Paystack Modal */}
                {showPaystack && (
                    <Paystack
                        paystackKey="pk_test_your_public_key_here"
                        billingEmail={profile.email}
                        amount={fundAmount}
                        onCancel={() => setShowPaystack(false)}
                        onSuccess={handlePaymentSuccess}
                        autoStart={true}
                    />
                )}

                <View style={styles.section}>
                    <ProfileOption
                        icon="lock-closed-outline"
                        label="Password & security"
                        desc="Update your password and manage account security."
                    />
                    <ProfileOption
                        icon="notifications-outline"
                        label="Notifications"
                        desc="Control alerts for live updates and requests."
                        onPress={() => router.push("/(root)/(tabs)/profile/notifications")}
                    />


                    <ProfileOption
                        icon="gift-outline"
                        label="Refer users and earn"
                        desc="Invite friends and earn rewards."
                    />
                    <ProfileOption
                        icon="help-circle-outline"
                        label="Help & Support"
                        desc="Get answers or contact support."
                    />
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Log out</Text>
                    <Ionicons name="log-out-outline" size={18} color="#f00" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const ProfileOption = ({ icon, label, desc, onPress }) => (
    <TouchableOpacity style={styles.optionRow} onPress={onPress}>
        <Ionicons name={icon} size={22} color="#000" style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
            <Text style={styles.optionLabel}>{label}</Text>
            <Text style={styles.optionDesc}>{desc}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
);

// styles remain unchanged...

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
