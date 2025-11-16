import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../../constants/url";
import { styles } from "../../../styles/requestIndex";

export default function ConfirmPublishScreen() {
    const router = useRouter();


    const [loading, setLoading] = useState(false);

    const handlePublish = async () => {
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Error", "You are not logged in.");
                setLoading(false);
                router.replace("/(auth)/login");
                return;
            }

            const response = await fetch(`${BASE_URL}/create-request`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                Alert.alert("Success", "Your request has been created!");
                router.push("/requests/success");
            } else {
                Alert.alert("Error", data.message || "Failed to create request");
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
            Alert.alert("Network Error", "Please try again later.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.stepText}>Step 4 of 4</Text>
                <Text style={styles.title}>Confirm and publish</Text>

                <Text>Location: </Text>
                <Text>Description: </Text>
                <Text>Duration: </Text>
                <Text>Comments: </Text>
                <Text>Reward: ₦</Text>
                <TouchableOpacity onPress={handlePublish} style={styles.postButton}>
                    <Text style={styles.postButtonText}>{loading ? "Posting..." : "Post request"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
