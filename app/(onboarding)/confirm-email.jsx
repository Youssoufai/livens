import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import ProgressBar from "../components/progressBar";
import { BASE_URL } from "../constants/url";
import { getToken } from "../utils/secureStore";

export default function ConfirmEmail({ activeIndex, totalSteps, onNextStep }) {
    const { email } = useLocalSearchParams();

    // ✅ Verification code state (NOT auth token)
    const [verificationCode, setVerificationCode] = useState("");

    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const handleVerify = async () => {
        if (!verificationCode || verificationCode.length < 4) {
            Alert.alert("Missing Code", "Please enter the verification code.");
            return;
        }

        if (!email) {
            Alert.alert("Missing Email", "Email address not found.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    email,
                    token: verificationCode,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid verification code");
            }

            // ✅ Just confirm session still exists
            const authToken = await getToken("token");

            if (!authToken) {
                Alert.alert(
                    "Session expired",
                    "Please log in again to continue."
                );

                router.replace("/login");
                return;
            }

            Alert.alert("Success", "Email verified successfully!");

            onNextStep?.();
            router.push("/(onboarding)/location");

        } catch (error) {
            Alert.alert("Verification Failed", error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <ProgressBar activeIndex={activeIndex} totalSteps={totalSteps} />

            <Text style={styles.title}>Confirm your email</Text>

            <Text style={styles.subtitle}>
                We’ve sent a verification code to{" "}
                <Text style={{ fontWeight: "700" }}>{email}</Text>
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter verification code"
                value={verificationCode}
                onChangeText={setVerificationCode}
                textAlign="center"
            />

            <TouchableOpacity
                style={[
                    styles.verifyButton,
                    verificationCode.length >= 4 && styles.verifyButtonActive,
                ]}
                onPress={handleVerify}
                disabled={loading || verificationCode.length < 4}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.verifyButtonText}>
                        Verify Email
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
    title: { fontSize: 22, fontWeight: "700", marginBottom: 6 },
    subtitle: { fontSize: 14, color: "#555", marginBottom: 30, lineHeight: 20 },
    input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 6, padding: 16, marginBottom: 24, fontSize: 20, letterSpacing: 4, fontWeight: "600" },
    verifyButton: { backgroundColor: "#ddd", paddingVertical: 14, borderRadius: 25, alignItems: "center", marginBottom: 16 },
    verifyButtonActive: { backgroundColor: "red" },
    verifyButtonText: { color: "#999", fontSize: 16, fontWeight: "600" },
    verifyButtonTextActive: { color: "#fff" },
    resendButton: { alignItems: "center", marginBottom: 12, paddingVertical: 8 },
    resendButtonText: { color: "red", fontSize: 14, fontWeight: "500" },
    changeEmailButton: { alignItems: "center", paddingVertical: 8 },
    changeEmailButtonText: { color: "#555", fontSize: 14 },
});
