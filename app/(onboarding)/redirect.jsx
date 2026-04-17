import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
// Make sure you import BASE_URL // Adjust to your style file
import { BASE_URL } from "../../constants/url";
import { styles } from "../styles/redirectStyle";
import { initDeviceToken } from "../utils/deviceToken";
// Import if needed
import * as SecureStore from "expo-secure-store";
export default function AuthScreen() {
    const handledRef = useRef(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const redirectUri = makeRedirectUri({
        scheme: "com.eegour.livelens",
    });

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: "850951594746-5n96ghgrb5gulf5k7oukc09i7t369idq.apps.googleusercontent.com",
        redirectUri,
        useProxy: false,
    });

    useEffect(() => {
        if (!response) return;

        if (response.type === "success" && !handledRef.current) {
            handledRef.current = true;
            const idToken = response.authentication?.idToken;

            if (!idToken) {
                Alert.alert("Error", "ID token missing");
                return;
            }

            handleGoogleLogin(idToken);
        }

        if (response.type === "error") {
            Alert.alert("Authentication Error", "Google login failed");
        }
    }, [response]);

    const saveToken = async (token) => {
        await AsyncStorage.setItem("auth_token", token);
    };

    const handleGoogleLogin = async (idToken) => {
        try {
            setGoogleLoading(true);

            const res = await fetch(`${BASE_URL}/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_token: idToken }),
            });

            const data = await res.json();
            console.log("Google login response:", data);

            const authToken = data?.token || data?.access_token;
            console.log("Auth token:", authToken);

            if (!authToken) throw new Error("Token missing");

            await SecureStore.setItemAsync("token", authToken);
            console.log("Auth token saved");

            if (data?.user?.id) {
                await AsyncStorage.setItem("user_id", String(data.user.id));
                await AsyncStorage.setItem("user", JSON.stringify(data.user));
                console.log("User info saved");
            }

            await initDeviceToken();
            console.log("Device token initialized");

            // Navigate directly without setTimeout
            console.log("Navigating to main app...");
            router.replace("/(root)/(tabs)/search");
            console.log("Navigation function called");
        } catch (error) {
            Alert.alert("Google Login Failed", error.message);
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.logoWrapper}>
                <View style={styles.logoDot} />
            </View>

            <Text style={styles.title}>Welcome to Livelens</Text>
            <Text style={styles.subtitle}>Location insights at your fingertips.</Text>

            <View style={styles.cardWrapper}>
                <Image source={require("@/app/assets/images/splash-icon.png")} />
            </View>

            <TouchableOpacity
                onPress={() => router.push("/(onboarding)/create-account")}
                activeOpacity={0.8}
                style={styles.primaryButton}
            >
                <Text style={styles.primaryButtonText}>Create a new account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => promptAsync()}
                disabled={!request || googleLoading}
                activeOpacity={0.8}
                style={styles.outlineButton}
            >
                <Text style={styles.outlineButtonText}>
                    {googleLoading ? "Signing in..." : "Continue with Google"}
                </Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
                onPress={() => router.push("/(onboarding)/login")}
                activeOpacity={0.8}
                style={styles.bottomText}
            >
                <Text>Already have an account? </Text>
                <Text style={styles.signIn}>Sign in</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}