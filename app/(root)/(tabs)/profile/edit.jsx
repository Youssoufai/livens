import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
    const [image, setImage] = useState("https://via.placeholder.com/100");
    const [name, setName] = useState("Johnathan Benjamin");
    const [email, setEmail] = useState("johnathan@example.com");
    const [phone, setPhone] = useState("+234 810 000 0000");

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

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Profile</Text>
                <View style={{ width: 24 }} /> {/* spacing balance */}
            </View>

            {/* Profile Picture */}
            <View style={styles.avatarSection}>
                <Image source={{ uri: image }} style={styles.avatar} />
                <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
                    <Ionicons name="camera-outline" size={16} color="#007AFF" />
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
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
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
        backgroundColor: "#f2f2f2",
    },
    changePhotoBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    changePhotoText: {
        color: "#007AFF",
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
        backgroundColor: "#007AFF",
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
