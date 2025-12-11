import { BASE_URL } from "@/app/constants/url";
import { getToken } from "@/app/utils/secureStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
    const [image, setImage] = useState("https://via.placeholder.com/100");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!name.trim() && !email.trim() && !phone.trim()) {
            Alert.alert("Validation Error", "Please update at least one field.");
            return;
        }

        try {
            setLoading(true);

            const token = await getToken();
            const parsedToken = token ? JSON.parse(token) : null;

            const updates = [];

            // Dynamically push update requests based on filled fields
            if (name.trim()) {
                updates.push({
                    url: `${BASE_URL}/update-profile/name/${encodeURIComponent(name)}`,
                    field: 'Name',
                });
            }
            if (email.trim()) {
                updates.push({
                    url: `${BASE_URL}/update-profile/email/${encodeURIComponent(email)}`,
                    field: 'Email',
                });
            }
            if (phone.trim()) {
                updates.push({
                    url: `${BASE_URL}/update-profile/phone/${encodeURIComponent(phone)}`,
                    field: 'Phone',
                });
            }

            let successMessages = [];
            let errorMessages = [];

            // Loop through each update and send request
            for (const update of updates) {
                const response = await fetch(update.url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${parsedToken}`,
                    },
                });

                const rawText = await response.text();
                console.log(`🔥 Raw Response (${update.field}):`, rawText);

                let data;
                try {
                    data = JSON.parse(rawText);
                } catch (err) {
                    errorMessages.push(`${update.field}: Invalid response`);
                    continue;
                }

                if (response.ok) {
                    successMessages.push(`${update.field} updated`);
                } else {
                    errorMessages.push(`${update.field}: ${data.message || "Failed"}`);
                }
            }

            // Show combined results
            if (successMessages.length) {
                Alert.alert("Success", successMessages.join("\n"));
                router.back();
            }
            if (errorMessages.length) {
                Alert.alert("Error", errorMessages.join("\n"));
            }

        } catch (error) {
            console.error(error);
            Alert.alert("Network Error", "Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Profile</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Profile Picture */}
            <View style={styles.avatarSection}>
                <Image source={{ uri: image }} style={styles.avatar} />
                <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
                    <Ionicons name="camera-outline" size={16} color="#FF3344" />
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
            </View>

            {/* Input Fields */}
            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#aaa"
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    placeholderTextColor="#aaa"
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholder="Enter your phone number"
                    placeholderTextColor="#aaa"
                />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Save</Text>}
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: "700",
    },
    avatarSection: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    changePhotoBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    changePhotoText: {
        color: "#FF3344",
        marginLeft: 5,
        fontWeight: "600",
    },
    form: {
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        padding: 12,
        marginBottom: 18,
        fontSize: 14,
        color: "#000",
        backgroundColor: "#fafafa",
    },
    saveButton: {
        backgroundColor: "#FF3344",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
    },
    saveText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});
