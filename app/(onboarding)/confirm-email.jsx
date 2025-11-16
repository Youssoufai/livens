import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
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

export default function ConfirmEmail({ activeIndex, totalSteps, onNextStep }) {
    // ✅ Get the email from route params
    const { email } = useLocalSearchParams();

    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    // ✅ Verify Email API Call
    const handleVerify = async () => {
        if (!token) {
            Alert.alert("Missing Code", "Please enter the verification code.");
            return;
        }

        if (!email) {
            Alert.alert(
                "Missing Email",
                "Email address not found. Please go back and re-enter."
            );
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                "https://livelenns.online/public/api/verify-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        token: token,
                    }),
                }
            );

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                Alert.alert("Success", "Email verified successfully!");
                console.log("✅ Verified:", data);
                onNextStep?.();
                router.push("/(onboarding)/location");
            } else {
                console.log("❌ Error:", data);
                Alert.alert("Error", data.message || "Invalid verification code.");
            }
        } catch (error) {
            setLoading(false);
            console.error("❌ Network Error:", error);
            Alert.alert(
                "Network Error",
                "Please check your connection and try again."
            );
        }
    };

    // 🔁 Resend Code API Call
    const handleResend = async () => {
        if (!email) {
            Alert.alert(
                "Missing Email",
                "Email address not found. Please go back and re-enter."
            );
            return;
        }

        setResending(true);
        try {
            const response = await fetch(
                "https://livelenns.online/public/api/resend-code",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();
            setResending(false);

            if (response.ok) {
                Alert.alert("Success", "Verification code resent successfully!");
            } else {
                Alert.alert("Error", data.message || "Failed to resend code.");
            }
        } catch (error) {
            setResending(false);
            console.error("❌ Network Error:", error);
            Alert.alert(
                "Network Error",
                "Please check your connection and try again."
            );
        }
    };

    return (
        <View style={styles.container}>
            <ProgressBar activeIndex={activeIndex} totalSteps={totalSteps} />

            <Text style={styles.title}>Confirm your email</Text>

            {email ? (
                <Text style={styles.subtitle}>
                    We’ve sent a verification code to{" "}
                    <Text style={{ fontWeight: "700" }}>{email}</Text>.{"\n"}
                    Please enter it below to verify your account.
                </Text>
            ) : (
                <Text style={styles.subtitle}>
                    We’ve sent a verification code to your email address.
                    Please enter it below to verify your account.
                </Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Enter verification code"
                value={token}
                onChangeText={(text) => setToken(text.toLowerCase())}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                maxLength={10}
                textAlign="center"
            />

            <TouchableOpacity
                style={[
                    styles.verifyButton,
                    token.length >= 4 && styles.verifyButtonActive,
                ]}
                onPress={handleVerify}
                disabled={loading || token.length < 4}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text
                        style={[
                            styles.verifyButtonText,
                            token.length >= 4 && styles.verifyButtonTextActive,
                        ]}
                    >
                        Verify Email
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.resendButton}
                onPress={handleResend}
                disabled={resending}
            >
                <Text style={styles.resendButtonText}>
                    {resending
                        ? "Resending..."
                        : "Didn’t receive the code? Resend"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.changeEmailButton}
                onPress={() => router.back()}
            >
                <Text style={styles.changeEmailButtonText}>
                    Change email address
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: "#555",
        marginBottom: 30,
        lineHeight: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        padding: 16,
        marginBottom: 24,
        fontSize: 20,
        letterSpacing: 4,
        fontWeight: "600",
    },
    verifyButton: {
        backgroundColor: "#ddd",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 16,
    },
    verifyButtonActive: {
        backgroundColor: "red",
    },
    verifyButtonText: {
        color: "#999",
        fontSize: 16,
        fontWeight: "600",
    },
    verifyButtonTextActive: {
        color: "#fff",
    },
    resendButton: {
        alignItems: "center",
        marginBottom: 12,
        paddingVertical: 8,
    },
    resendButtonText: {
        color: "red",
        fontSize: 14,
        fontWeight: "500",
    },
    changeEmailButton: {
        alignItems: "center",
        paddingVertical: 8,
    },
    changeEmailButtonText: {
        color: "#555",
        fontSize: 14,
    },
});
