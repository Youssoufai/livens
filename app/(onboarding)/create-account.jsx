import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
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
import { BASE_URL } from "../constants/url";

export default function CreateAccount({
    activeIndex,
    totalSteps,
    onNextStep,
}) {
    const [focusedInput, setFocusedInput] = useState(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const passwordsMatch =
        confirmPassword.length === 0 || password === confirmPassword;

    const isFormValid =
        fullName &&
        email &&
        phone &&
        password.length >= 8 &&
        passwordsMatch;

    const handleRegister = async () => {
        if (!isFormValid) {
            Alert.alert("Invalid Form", "Please fix the errors before continuing.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${BASE_URL}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        name: fullName.trim(),
                        email: email.trim(),
                        password,
                        password_confirmation: confirmPassword,
                        phone: `+234${phone}`,
                    }),
                }
            );

            const data = await response.json();
            setLoading(false);

            if (!response.ok) {
                const message = data?.errors
                    ? Object.values(data.errors).flat().join("\n")
                    : data?.message || "Registration failed";
                Alert.alert("Error", message);
                return;
            }

            router.push({
                pathname: "/(onboarding)/confirm-email",
                params: { email },
            });

            onNextStep && onNextStep();
        } catch (error) {
            setLoading(false);
            Alert.alert(
                "Network Error",
                "Please check your internet connection and try again."
            );
        }
    };

    return (
        <View style={styles.container}>
            <ProgressBar activeIndex={activeIndex} totalSteps={totalSteps} />

            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
                Get real-time location updates and full access to all features.
            </Text>

            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={[
                    styles.input,
                    focusedInput === "name" && styles.focusedInput,
                ]}
                placeholder="John Doe"
                value={fullName}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
                onChangeText={setFullName}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={[
                    styles.input,
                    focusedInput === "email" && styles.focusedInput,
                ]}
                placeholder="john@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                onChangeText={setEmail}
            />

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <View
                style={[
                    styles.passwordContainer,
                    focusedInput === "password" && styles.focusedInput,
                ]}
            >
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Create a password"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={() => setPasswordVisible(!passwordVisible)}
                >
                    <Ionicons
                        name={passwordVisible ? "eye-off" : "eye"}
                        size={20}
                        color="#777"
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.helperText}>
                Minimum 8 characters. Use letters and numbers.
            </Text>

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password</Text>
            <View
                style={[
                    styles.passwordContainer,
                    !passwordsMatch &&
                    confirmPassword &&
                    styles.errorBorder,
                ]}
            >
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm password"
                    secureTextEntry={!confirmVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    onPress={() => setConfirmVisible(!confirmVisible)}
                >
                    <Ionicons
                        name={confirmVisible ? "eye-off" : "eye"}
                        size={20}
                        color="#777"
                    />
                </TouchableOpacity>
            </View>

            {!passwordsMatch && confirmPassword ? (
                <Text style={styles.errorText}>Passwords do not match</Text>
            ) : null}

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneContainer}>
                <View style={styles.countryCode}>
                    <Text style={styles.flag}>🇳🇬</Text>
                    <Text style={styles.code}>+234</Text>
                </View>
                <TextInput
                    style={[styles.input, { flex: 1, marginLeft: 8 }]}
                    placeholder="8012345678"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            {/* Submit */}
            <TouchableOpacity
                style={[
                    styles.nextButton,
                    isFormValid && styles.nextButtonActive,
                ]}
                onPress={handleRegister}
                disabled={!isFormValid || loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.nextButtonText}>
                        Create Account
                    </Text>
                )}
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
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#D0D0D2",
        borderRadius: 6,
        padding: 12,
        marginBottom: 14,
    },
    focusedInput: {
        borderColor: "red",
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D0D0D2",
        borderRadius: 6,
        paddingHorizontal: 12,
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 12,
    },
    helperText: {
        fontSize: 12,
        color: "#666",
        marginBottom: 12,
    },
    errorBorder: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 6,
        marginBottom: 10,
    },
    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    countryCode: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D0D0D2",
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
    flag: {
        fontSize: 18,
        marginRight: 4,
    },
    code: {
        fontWeight: "600",
    },
    nextButton: {
        backgroundColor: "#111",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
        marginTop: "auto",
        marginBottom: 20,
        opacity: 0.6,
    },
    nextButtonActive: {
        backgroundColor: "red",
        opacity: 1,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
