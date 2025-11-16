import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RequestSuccess() {
    return (
        <View style={styles.container}>
            <Image
                source={require("@/assets/images/group.png")}
                style={styles.image}
                resizeMode="contain"
            />

            <Text style={styles.title}>Your request has been posted!</Text>

            <Text style={styles.subtitle}>
                Your request is now visible to the public. Expect some responses soon!
            </Text>

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.9}
                onPress={() => router.push("/(root)/(tabs)/requests")}
            >
                <Text style={styles.buttonText}>Go to My Requests</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.8}
                onPress={() => router.push("/(root)/(tabs)/home")}
            >
                <Text style={styles.secondaryText}>Return Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    image: {
        width: 160,
        height: 160,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: "#555",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 40,
    },
    button: {
        backgroundColor: "#111",
        paddingVertical: 14,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginBottom: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
    secondaryButton: {
        paddingVertical: 10,
    },
    secondaryText: {
        color: "#007aff",
        fontWeight: "500",
        fontSize: 15,
    },
});
