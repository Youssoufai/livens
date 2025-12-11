import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { BASE_URL } from "../constants/url";
import { saveToken } from "../utils/secureStore";

export default function Login() {
    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();



            if (!res.ok) {
                Alert.alert("Login Failed", data.message || "Invalid credentials");
                return;
            }

            // SUCCESS 🎉
            console.log("Logged in:", data);
            await saveToken(data.access_token);
            // Navigate to home (example)
            router.push("/(root)/(tabs)/search");

        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.logo}
                />
            </View>

            {/* Header */}
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Log in to continue using LiveLens</Text>

            {/* Email */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    placeholder="example@gmail.com"
                    placeholderTextColor="#999"
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Remember me + Forgot */}
            <View className={styles.row}>
                <CheckBox
                    label="Remember me"
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                />

                <TouchableOpacity>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* Login button */}
            <Button
                title={loading ? "Logging in..." : "Log In"}
                style={styles.loginButton}
                textColor="#fff"
                disabled={loading}
                onPress={handleLogin}
            />

            {/* Divider */}
            <Text style={styles.divider}>──────────  OR  ──────────</Text>

            {/* Social Buttons */}
            <Button
                title="Continue with Google"
                style={[styles.socialButton, { backgroundColor: "#DB4437" }]}
                textColor="#fff"
            />

            <Button
                title="Continue with Facebook"
                style={[styles.socialButton, { backgroundColor: "#1877F2" }]}
                textColor="#fff"
            />

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don&apos;t have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(onboarding)/create-account')}>
                    <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    logo: {
        width: 90,
        height: 90,
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        color: "#111",
    },
    subtitle: {
        textAlign: "center",
        color: "#555",
        marginBottom: 40,
        fontSize: 14,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontWeight: "500",
        color: "#333",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fafafa",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
    },
    forgotText: {
        color: "#de1c1c",
        fontWeight: "500",
    },
    loginButton: {
        backgroundColor: "#de1c1c",
        marginBottom: 15,
    },
    divider: {
        textAlign: "center",
        color: "#999",
        marginVertical: 15,
    },
    socialButton: {
        marginBottom: 15,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25,
    },
    footerText: {
        color: "#555",
    },
    footerLink: {
        color: "#de1c1c",
        fontWeight: "600",
    },
});
