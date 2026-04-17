import { getToken } from "@/app/utils/secureStore";
import { BASE_URL } from "@/constants/url";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FundWalletScreen() {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const isDisabled = !amount || parseFloat(amount) <= 0;

    const handleFundWallet = async () => {
        try {
            setLoading(true);
            const token = await getToken("token");
            const amountInKobo = parseInt(amount);

            const response = await fetch(`${BASE_URL}/paystack-init`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ amount: amountInKobo }),
            });

            const data = await response.json();
            const authorizationUrl = data?.data?.authorization_url;

            if (authorizationUrl) {
                // Open WebView and pass a return route
                router.push({
                    pathname: "/(root)/(tabs)/profile/paymentWebview",
                    params: { url: authorizationUrl, onSuccessRedirect: "/(root)/(tabs)/profile" },
                });
            } else {
                Alert.alert("Error", "No payment link returned");
            }
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="black" onPress={() => router.back()} />
                <Text style={styles.headerTitle}>Fund wallet</Text>
            </View>

            <Text style={styles.title}>Add funds to your wallet</Text>
            <Text style={styles.subtitle}>
                Select a method to add external funds to your wallet. More options coming soon.
            </Text>

            <Text style={styles.inputLabel}>Enter amount</Text>
            <TextInput
                style={styles.input}
                placeholder="0.0"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <View style={{ flex: 1 }} />

            <TouchableOpacity
                style={[styles.button, isDisabled && styles.disabledButton]}
                disabled={isDisabled || loading}
                onPress={handleFundWallet}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={[styles.buttonText, isDisabled && styles.disabledButtonText]}>Fund wallet</Text>}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
    headerTitle: { fontSize: 18, fontWeight: "500", marginLeft: 10 },
    title: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#555", marginBottom: 30, lineHeight: 20 },
    inputLabel: { fontSize: 15, fontWeight: "500", marginBottom: 8 },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 15, fontSize: 16 },
    button: { backgroundColor: "#000", padding: 18, borderRadius: 30, alignItems: "center", marginBottom: 10 },
    disabledButton: { backgroundColor: "#E5E5E5" },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
    disabledButtonText: { color: "#888" },
});