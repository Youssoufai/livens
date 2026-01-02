import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { styles } from "../styles/createAccount";

export default function WelcomeScreen() {
    const { promptAsync } = useGoogleAuth();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Top */}
                <View style={{ alignItems: "center" }}>
                    <View style={styles.logoWrapper}>
                        <Ionicons name="location-sharp" size={32} color="#FF3B3B" />
                    </View>

                    <Text style={styles.title}>Welcome to Livelens</Text>
                    <Text style={styles.subtitle}>
                        Location insights at your fingertips.
                    </Text>
                </View>

                {/* Middle Image */}
                <View style={styles.imageStack}>
                    <Image
                        source={require("../../assets/images/snip.png")}
                        style={styles.mainImage}
                    />
                </View>

                {/* Bottom */}
                <View style={{ width: "100%" }}>
                    <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("create-account")}>
                        <Text style={styles.primaryButtonText}>Create a new account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton} onPress={() => promptAsync()}>
                        <Ionicons name="logo-google" size={20} color="#DB4437" />
                        <Text style={styles.socialButtonText}>
                            Continue with Google
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                        <Text style={styles.socialButtonText}>
                            Continue with Facebook
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.line} />
                    </View>

                    <Text style={styles.signInText}>
                        Already have an account?{" "}
                        <Text style={styles.signInLink}>Sign in</Text>
                    </Text>
                </View>
            </View>

        </SafeAreaView>
    );
}
