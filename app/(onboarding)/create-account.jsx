import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProgressBar from "../components/progressBar";
import { BASE_URL } from "../constants/url";
import { styles } from "../styles/create-account";
import { saveToken } from "../utils/secureStore";
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
            // 🔹 Clean & format phone properly
            const cleanedPhone = phone.replace(/\s+/g, "").trim();

            let formattedPhone = cleanedPhone;

            if (!cleanedPhone.startsWith("+234")) {
                formattedPhone = "+234" + cleanedPhone.replace(/^0/, "");
            }

            const response = await fetch(`${BASE_URL}/register`, {
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
                    phone: formattedPhone,
                }),
            });

            // 🔥 Read raw response first (prevents crash)
            const text = await response.text();
            console.log("Raw response:", text);
            console.log("Status:", response.status);

            let data;
            try {
                data = text ? JSON.parse(text) : {};
            } catch (jsonError) {
                console.log("JSON Parse Error:", jsonError);
                throw new Error("Invalid JSON response from server");
            }

            if (!response.ok) {
                const message = data?.errors
                    ? Object.values(data.errors).flat().join("\n")
                    : data?.message || "Registration failed";
                setLoading(false);
                Alert.alert("Error", message);
                return;
            }

            // 🔐 Save token if returned
            if (data?.access_token) {
                await saveToken(data.access_token);
            }

            await SecureStore.setItemAsync("email", email.trim());

            setLoading(false);

            router.push({
                pathname: "/(onboarding)/confirm-email",
                params: { email },
            });

            onNextStep?.();
        } catch (error) {
            console.log("Registration Error:", error);
            setLoading(false);

            Alert.alert(
                "Server Error",
                "Something went wrong. Please try again."
            );
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView>

                    <View style={styles.container}>
                        <ProgressBar
                            activeIndex={activeIndex}
                            totalSteps={totalSteps}
                        />

                        <Text style={styles.title}>Create your account</Text>
                        <Text style={styles.subtitle}>
                            Get real-time location updates and full access to all
                            features.
                        </Text>

                        {/* Full Name */}
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === "name" && styles.focusedInput,
                            ]}
                            placeholder="John Doe"
                            placeholderTextColor="#000"
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
                            placeholderTextColor="#000"
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
                                placeholderTextColor="#000"
                                secureTextEntry={!passwordVisible}
                                value={password}
                                onFocus={() => setFocusedInput("password")}
                                onBlur={() => setFocusedInput(null)}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    setPasswordVisible(!passwordVisible)
                                }
                            >
                                <Ionicons
                                    name={passwordVisible ? "eye-off" : "eye"}
                                    size={20}
                                    color="#6B7280"
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
                                focusedInput === "confirm" && styles.focusedInput,
                                !passwordsMatch &&
                                confirmPassword &&
                                styles.errorBorder,
                            ]}
                        >
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Confirm password"
                                secureTextEntry={!confirmVisible}
                                placeholderTextColor="#000"
                                value={confirmPassword}
                                onFocus={() => setFocusedInput("confirm")}
                                onBlur={() => setFocusedInput(null)}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    setConfirmVisible(!confirmVisible)
                                }
                            >
                                <Ionicons
                                    name={confirmVisible ? "eye-off" : "eye"}
                                    size={20}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>
                        </View>

                        {!passwordsMatch && confirmPassword ? (
                            <Text style={styles.errorText}>
                                Passwords do not match
                            </Text>
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
                                placeholderTextColor="#000"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                            />
                        </View>

                        {/* Submit Button */}
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

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/* ===== Styles ===== */
