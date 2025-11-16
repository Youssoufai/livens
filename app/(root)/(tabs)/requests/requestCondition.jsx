import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter, useSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles/requestCondition";

export default function Request() {
    const router = useRouter();
    const params = useSearchParams();

    const location = params?.location || "";
    const description = params?.description || "";

    const [duration, setDuration] = useState("");
    const [radioButtons, setRadioButtons] = useState([
        { id: "1", label: "Yes", value: "yes", selected: true },
        { id: "2", label: "No", value: "no" },
    ]);

    const onPressRadioButton = (radioArray) => setRadioButtons(radioArray);

    const getAllowComment = () => {
        const selected = radioButtons.find((r) => r.selected);
        return selected?.value === "yes" ? "1" : "0"; // string
    };

    const handleNext = () => {
        if (!duration) {
            Alert.alert("Select duration", "Please select a duration before proceeding.");
            return;
        }

        router.push({
            pathname: "/requests/reward",
            params: {
                location,
                description,
                duration,
                allow_comment: getAllowComment(),
            },
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.stepText}>Step 2 of 4</Text>
                    <Text style={styles.title}>Set request conditions</Text>

                    <Text style={styles.label}>Choose a time duration for which the request must be completed.</Text>
                    <View style={styles.inputContainer}>
                        <Picker
                            selectedValue={duration || ""}
                            style={styles.picker}
                            onValueChange={(itemValue) => setDuration(itemValue)}
                        >
                            <Picker.Item label="Select duration" value="" color="#999" />
                            <Picker.Item label="1 hour" value="1h" />
                            <Picker.Item label="3 hours" value="3h" />
                            <Picker.Item label="6 hours" value="6h" />
                            <Picker.Item label="12 hours" value="12h" />
                            <Picker.Item label="24 hours" value="24h" />
                        </Picker>
                    </View>

                    <Text style={[styles.label, { marginTop: 24 }]}>Allow respondents to write comments based on their experience.</Text>
                    <View style={styles.radioContainer}>
                        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} layout="row" />
                    </View>

                    <TouchableOpacity onPress={handleNext} style={styles.button}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
