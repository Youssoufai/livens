import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
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
    const inputRefs = useRef([]);
    const CODE_LENGTH = 6;

    // Store OTP as array for stable updates
    const [verificationCode, setVerificationCode] = useState(Array(CODE_LENGTH).fill(""));
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        const codeStr = verificationCode.join("");
        if (codeStr.length < CODE_LENGTH) {
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
                body: JSON.stringify({ email, token: codeStr }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Invalid verification code");

            const authToken = await getToken("token");
            if (!authToken) {
                Alert.alert("Session expired", "Please log in again.");
                router.replace("/login");
                return;
            }

            Alert.alert("Success", "Email verified successfully!");
            onNextStep?.();
            router.push("/(onboarding)/location");
        } catch (err) {
            Alert.alert("Verification Failed", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (val, index) => {
        // Allow any character (letters, numbers, symbols), max 1 per box
        const sanitized = val.slice(-1);

        const newCode = [...verificationCode];
        newCode[index] = sanitized;
        setVerificationCode(newCode);

        // Move focus to next box
        if (sanitized && index < CODE_LENGTH - 1) {
            inputRefs.current[index + 1].focus();
        } else if (!sanitized && index > 0) {
            // Move back on delete
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            <ProgressBar activeIndex={activeIndex} totalSteps={totalSteps} />

            <Text style={styles.title}>Confirm your email</Text>
            <Text style={styles.subtitle}>
                We’ve sent a verification code to <Text style={{ fontWeight: "700" }}>{email}</Text>
            </Text>

            <View style={styles.otpContainer}>
                {verificationCode.map((digit, i) => (
                    <TextInput
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        style={styles.otpBox}
                        maxLength={1}
                        value={digit}
                        onChangeText={(val) => handleInputChange(val, i)}
                        autoCapitalize="none"
                        textAlign="center"
                    />
                ))}
            </View>

            <TouchableOpacity
                style={[
                    styles.verifyButton,
                    verificationCode.join("").length === CODE_LENGTH && styles.verifyButtonActive,
                ]}
                onPress={handleVerify}
                disabled={loading || verificationCode.join("").length < CODE_LENGTH}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.verifyButtonText}>Verify Email</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 24, paddingTop: 40 },
    title: { fontSize: 24, fontWeight: "700", color: "#111", marginBottom: 8 },
    subtitle: { fontSize: 15, color: "#555", marginBottom: 32, lineHeight: 22 },
    otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
    otpBox: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "600",
        color: "#111",
        backgroundColor: "#fafafa",
    },
    verifyButton: { backgroundColor: "#ddd", paddingVertical: 14, borderRadius: 25, alignItems: "center", marginBottom: 16 },
    verifyButtonActive: { backgroundColor: "red" },
    verifyButtonText: { color: "#999", fontSize: 16, fontWeight: "600" },
});