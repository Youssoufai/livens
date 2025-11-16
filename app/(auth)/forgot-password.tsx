import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../components/Button";
export default function ForgotPassword() {
    return (
        <View style={styles.container}>
            {/* Logo */}
            {/*          <View style={styles.logoContainer}>
                <Image
                    source={require("@/assets/images/logo.png")}
                    style={styles.logo}
                />
            </View>
 */}
            {/* Header */}
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
                Enter the email address you used to create your account. We’ll send you a link to reset your password.
            </Text>

            {/* Input Field */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />
            </View>

            {/* Button */}
            <Button
                title="Send Reset Code"
                style={styles.button}
                textColor="#fff"
                onPress={() => { router.push('/(auth)/create-password'); }} icon={undefined} />

            {/* Back to Login */}
            <Text style={styles.backText}>
                Remember your password? <Text style={styles.backLink}>Log in</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#111",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        textAlign: "center",
        color: "#555",
        fontSize: 14,
        marginBottom: 40,
        lineHeight: 20,
    },
    inputGroup: {
        marginBottom: 25,
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
        padding: 14,
        fontSize: 16,
        backgroundColor: "#fafafa",
    },
    button: {
        backgroundColor: "#de1c1c",
        marginTop: 10,
    },
    backText: {
        textAlign: "center",
        marginTop: 25,
        color: "#555",
    },
    backLink: {
        color: "#de1c1c",
        fontWeight: "600",
    },
});
