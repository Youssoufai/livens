import { useRequest } from "@/app/context/requestContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles/requestIndex";
export default function CreateRequest() {
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const { updateRequest } = useRequest();
    const handleNext = () => {
        if (!location || !description) {
            Alert.alert("Missing Fields", "Please fill in all fields before proceeding.");
            return;
        }

        updateRequest({ location, description });

        // Navigate to Request screen (Step 2)
        router.push('/(root)/(tabs)/requests/requestCondition');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <Text style={styles.stepText}>Step 1 of 4</Text>
            <Text style={styles.title}>Create request</Text>

            <Text style={styles.label}>Specify the location where you need updates from.</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="search-outline" size={18} color="#999" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Choose location"
                    placeholderTextColor="#999"
                    value={location}
                    onChangeText={setLocation}
                />
            </View>

            <Text style={[styles.label, { marginTop: 20 }]}>
                Describe what respondents should focus on when capturing content for you.
            </Text>
            <TextInput
                style={styles.textArea}
                placeholder="E.x: Take a picture of the pool"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity onPress={handleNext} style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
