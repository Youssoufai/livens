import CheckBox from "@/app/components/CheckBox";
import { useRequest } from "@/app/context/requestContext";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles/requestCondition";

export default function RequestConditions() {
    const router = useRouter();
    const { updateRequest } = useRequest();

    const [duration, setDuration] = useState("");
    const [radioButtons, setRadioButtons] = useState([
        { id: "1", label: "Yes", value: "yes", selected: true },
        { id: "2", label: "No", value: "no", selected: false },
    ]);

    const handleSelect = (id) => {
        setRadioButtons(radioButtons.map(btn => ({
            ...btn,
            selected: btn.id === id,
        })));
    };

    const getAllowComment = () => radioButtons.find(btn => btn.selected)?.value === "yes" ? "1" : "0";

    const handleNext = () => {
        if (!duration) {
            Alert.alert("Select duration", "Please select a duration before proceeding.");
            return;
        }

        updateRequest({
            duration,
            allow_comment: getAllowComment(),
        });

        router.push("/(root)/(tabs)/requests/reward"); // next step
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.stepText}>Step 2 of 4</Text>
                    <Text style={styles.title}>Set request conditions</Text>

                    <Text style={styles.label}>Choose a time duration for which the request must be completed.</Text>
                    <View style={styles.inputContainer}>
                        <Picker selectedValue={duration || ""} style={styles.picker} onValueChange={setDuration}>
                            <Picker.Item label="Select duration" value="" color="#999" />
                            <Picker.Item label="1 hour" value="1 hour" />
                            <Picker.Item label="3 hours" value="3 hours" />
                            <Picker.Item label="6 hours" value="6 hours" />
                            <Picker.Item label="12 hours" value="12 hours" />
                            <Picker.Item label="24 hours" value="24 hours" />
                        </Picker>
                    </View>

                    <Text style={[styles.label, { marginTop: 24 }]}>
                        Allow respondents to write comments based on their experience.
                    </Text>
                    <View style={styles.radioContainer}>
                        {radioButtons.map(btn => (
                            <CheckBox key={btn.id} label={btn.label} checked={btn.selected} onPress={() => handleSelect(btn.id)} />
                        ))}
                    </View>

                    <TouchableOpacity onPress={handleNext} style={styles.button}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
