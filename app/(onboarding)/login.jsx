import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { router, useSegments } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { makeRedirectUri } from "expo-auth-session";
import { BASE_URL } from "../constants/url";
import { styles } from "../styles/loginStyle";
import { initDeviceToken } from "../utils/deviceToken";
import { saveToken } from "../utils/secureStore";
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const segments = useSegments();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const canLogin = email.trim() && password.trim();

    const redirectUri = makeRedirectUri({
        scheme: "com.eegour.livelens",
        useProxy: false
    });


    // 🔹 GOOGLE CONFIG
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "850951594746-5n96ghgrb5gulf5k7oukc09i7t369idq.apps.googleusercontent.com",
        redirectUri,
        useProxy: false,
    });
    // hjbjhbjhgh
    console.log("🔹 Redirect URI:", request?.redirectUri);
    console.log("🔹 Redirect URI:", request?.redirectUri);

    useEffect(() => {
        console.log("🔹 Full Response:", JSON.stringify(response, null, 2));
        console.log("🔹 Response Type:", response?.type);

        if (response?.type === "success") {
            console.log("✅ SUCCESS!");
            console.log("🔹 Authentication object:", response.authentication);
            console.log("🔹 ID Token:", response.authentication?.idToken);

            const idToken = response.authentication?.idToken;
            if (idToken) {
                console.log("✅ ID Token found, calling handleGoogleLogin");
                handleGoogleLogin(idToken);
            } else {
                console.error("❌ No ID token found in success response");
                Alert.alert("Error", "ID token missing from Google response");
            }
        } else if (response?.type === "error") {
            console.error("❌ ERROR Response:", response.error);
            console.error("❌ Error details:", JSON.stringify(response.error, null, 2));
            Alert.alert("Authentication Error", response.error?.message || "Failed to authenticate with Google");
        } else if (response?.type === "cancel") {
            console.log("⚠️ User cancelled authentication");
        } else if (response?.type === "dismiss") {
            console.log("⚠️ User dismissed authentication");
        } else if (response?.type === "locked") {
            console.log("⚠️ Authentication locked");
        }
    }, [response]);

    const handleGoogleLogin = async (idToken) => {
        try {
            console.log("🔹 Starting backend Google login...");
            setGoogleLoading(true);

            const res = await fetch(`${BASE_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_token: idToken }),
            });

            console.log("🔹 Backend response status:", res.status);
            const data = await res.json();
            console.log("🔹 Backend response data:", data);

            if (!res.ok) {
                throw new Error(data.message || "Google login failed");
            }

            const authToken = data?.token || data?.access_token;

            if (!authToken) {
                throw new Error("Authentication token missing");
            }

            await saveToken(authToken);

            if (data?.user?.id) {
                await AsyncStorage.setItem("user_id", String(data.user.id));
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
            }

            await initDeviceToken();

            Alert.alert("Success", "Logged in with Google");
            router.replace("/(root)/(tabs)/search");

        } catch (error) {
            console.error("❌ Google login error:", error);
            Alert.alert("Google Login Failed", error.message);
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!canLogin) return;

        try {
            setLoading(true);

            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            const authToken = data?.access_token;

            if (!authToken) {
                throw new Error("Authentication token missing");
            }

            await saveToken(authToken);

            if (data?.user?.id) {
                await AsyncStorage.setItem("user_id", String(data.user.id));
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
            }

            await initDeviceToken();

            Alert.alert("Success", "Logged in successfully");
            router.replace("/(root)/(tabs)/search");

        } catch (error) {
            Alert.alert("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome back</Text>

                {/* EMAIL */}
                <View style={styles.field}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* PASSWORD */}
                <View style={styles.field}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordInput}>
                        <TextInput
                            placeholder="Enter password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={!showPassword}
                            style={styles.passwordText}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* GOOGLE BUTTON */}
                <TouchableOpacity
                    style={[styles.googleBtn, googleLoading && styles.disabledBtn]}
                    onPress={() => {
                        console.log("🔹 Google button pressed");
                        promptAsync();
                    }}
                    disabled={!request || googleLoading}
                >
                    {googleLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <Ionicons name="logo-google" size={18} color="#DB4437" />
                            <Text style={styles.googleText}>Continue with Google</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                {/* LOGIN BUTTON */}
                <View style={{ paddingBottom: insets.bottom + 16 }}>
                    <TouchableOpacity
                        style={[
                            styles.loginBtn,
                            (!canLogin || loading) && styles.disabledBtn,
                        ]}
                        onPress={handleLogin}
                        disabled={!canLogin || loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginText}>Log in</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}