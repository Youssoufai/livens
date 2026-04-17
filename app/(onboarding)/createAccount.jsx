import { auth } from "@/lib/firebase";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../styles/createAccount";

// Complete any in-progress auth sessions
WebBrowser.maybeCompleteAuthSession();

export default function CreateAccount() {
    // === Configure Google Auth ===
    const [request, response, promptAsync] = Google.useAuthRequest({
        // Web client ID is always required for all platforms
        webClientId: "850951594746-nmpehcc6so6bedll8k4ohrj7uca14fu2.apps.googleusercontent.com",

        // Platform-specific client IDs (from Google Cloud)
        iosClientId: "850951594746-xxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
        androidClientId: "850951594746-9a1ejl5aeos1keoj2dc0q9b6sob2d172.apps.googleusercontent.com",
    });

    // === Handle Google response ===
    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.authentication;

            if (!id_token) {
                Alert.alert("Google Sign-In Failed", "No token received");
                return;
            }

            const credential = GoogleAuthProvider.credential(id_token);

            signInWithCredential(auth, credential)
                .then(() => {
                    console.log("[FIREBASE] Signed in successfully");
                    router.replace("/(tabs)");
                })
                .catch((err) => {
                    console.error("[FIREBASE] Sign-in error:", err);
                    Alert.alert("Auth Error", err.message);
                });
        }

        if (response?.type === "error") {
            console.error("[GOOGLE] Auth error:", response.error);
            Alert.alert("Google Sign-In Error", response.error || "Unknown error");
        }
    }, [response]);

    const onGooglePress = async () => {
        try {
            if (!request) {
                Alert.alert("Error", "Google Sign-In not ready");
                return;
            }
            await promptAsync(); // Launch Google login
        } catch (err) {
            console.error("[GOOGLE] Prompt error:", err);
            Alert.alert("Google Sign-In Error", err.message || "Unknown error");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.logoWrapper}>
                        <Ionicons name="location-sharp" size={32} color="#FF3B3B" />
                    </View>
                    <Text style={styles.title}>Welcome to Livelens</Text>
                    <Text style={styles.subtitle}>Location insights at your fingertips.</Text>
                </View>

                <View style={styles.imageStack}>
                    <Image
                        source={require("@/app/assets/images/snip.png")}
                        style={styles.mainImage}
                    />
                </View>

                <View style={{ width: "100%" }}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.push("/(auth)/email-signup")}
                    >
                        <Text style={styles.primaryButtonText}>Create a new account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.socialButton}
                        onPress={onGooglePress}
                        disabled={!request}
                    >
                        <Ionicons name="logo-google" size={20} color="#DB4437" />
                        <Text style={styles.socialButtonText}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
