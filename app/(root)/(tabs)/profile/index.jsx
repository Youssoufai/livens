import { BASE_URL } from "@/app/constants/url";
import { styles } from "@/app/styles/profile";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Paystack } from "react-native-paystack-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPaystack, setShowPaystack] = useState(false);
    const [fundAmount, setFundAmount] = useState("1000"); // default fund amount
    const [localImage, setLocalImage] = useState(null); // newly picked image

    // ✅ Load token once on component mount
    useFocusEffect(
        useCallback(() => {
            const fetchProfile = async () => {
                setLoading(true);
                try {
                    const storedToken = await getToken("token");
                    if (!storedToken) return;
                    setToken(storedToken);

                    const res = await fetch(`${BASE_URL}/profile`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${storedToken.replace(/"/g, "")}`,
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
            const storedToken = await getToken("token");
            if (!storedToken) {
                Alert.alert("Error", "No token found.");
                return;
            }

            const res = await fetch(`${BASE_URL}/logout`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${storedToken.replace(/"/g, "")}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                await SecureStore.deleteItemAsync("token");
                router.replace("/(onboarding)/login");
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

        const storedToken = await getToken("token");
        const parsedToken = storedToken ? JSON.parse(storedToken) : null;

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

    // Decide which image to show
    const displayImage = localImage || null; // only local picked image, otherwise fallback to default

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Profile</Text>

                <TouchableOpacity
                    style={styles.profileRow}
                    onPress={() => router.push('/(root)/(tabs)/profile/edit')}
                >
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{
                                uri: displayImage
                                    ? displayImage
                                    : "https://via.placeholder.com/100", // default avatar
                            }}
                            style={styles.avatar}
                        />
                    </View>
                    <View>
                        <Text style={styles.name}>{profile.name || "No Name"}</Text>
                        <Text style={styles.edit}>{profile.email || "No Email"}</Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#999"
                        style={{ marginLeft: "auto" }}
                    />
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
                        <TouchableOpacity
                            style={styles.withdrawButton}
                            onPress={() => router.push('/(root)/(tabs)/profile/withdraw')}
                        >
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
                        icon="notifications-outline"
                        label="Location & privacy"
                        desc="Control alerts for live updates and requests."
                        onPress={() => router.push("/(onboarding)/location")}
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