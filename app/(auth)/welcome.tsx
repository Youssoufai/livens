import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
export default function Welcome() {
    return (
        <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image source={require("@/assets/images/group.png")} style={styles.logo} />
            </View>

            {/* Headline */}
            <Text style={styles.title}>Welcome to LiveLens</Text>
            <Text style={styles.subtitle}>Location insights at your fingertips</Text>

            {/* Illustration */}
            <Image
                source={require("@/assets/images/group.png")}
                style={styles.illustration}
                resizeMode="contain"
            />

            {/* Action Buttons */}
            <View style={styles.buttonGroup}>
                <Button
                    title="Create a new account"
                    textColor="#fff"
                    style={{ backgroundColor: "#DB4437" }}
                    icon={<FontAwesome name="google" size={20} color="#DB4437" />}
                    onPress={() => { router.push('/(auth)/login') }}
                />
                <Button
                    title="Continue with Google"
                    textColor="#000"
                    style={{ backgroundColor: "#fff", borderWidth: 1 }}
                    icon={<FontAwesome name="google" size={20} color="#377bdbff" />}
                    onPress={() => { }}
                />
                <Button
                    title="Continue with Facebook"
                    textColor="#000"
                    style={{ backgroundColor: "#ffffffff", borderWidth: 1 }}
                    icon={<FontAwesome name="facebook" size={20} color="#377bdbff" />}
                    onPress={() => { }}
                />
            </View>

            {/* Divider */}
            <Text style={styles.divider}>───────── OR ─────────</Text>

            {/* Sign in link */}
            <Text style={styles.footerText}>
                Already have an account?{" "}
                <Pressable onPress={() => { }}>
                    <Text style={styles.signIn}>Sign in</Text>
                </Pressable>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        paddingTop: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    facebookButton: {
        backgroundColor: "#fff",
        color: "black",
        borderWidth: 1,
        borderColor: "#e6e2e2ff"
    },
    googleButton: {
        color: "white",
    },
    emailButton: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#e6e2e2ff"
    },
    logoContainer: {
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111",
        textAlign: "center",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginBottom: 30,
    },
    illustration: {
        width: "100%",
        height: 220,
        marginBottom: 30,
    },
    buttonGroup: {
        width: "100%",
        gap: 12,
        marginBottom: 20,
    },
    divider: {
        color: "#aaa",
        marginBottom: 20,
        fontSize: 14,
    },
    footerText: {
        fontSize: 16,
        color: "#181717ff",
        fontWeight: "bold"
    },
    signIn: {
        fontWeight: "600",
        color: "#DB4437",
    },
});
