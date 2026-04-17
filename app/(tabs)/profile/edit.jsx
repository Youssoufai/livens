import { getToken } from "@/app/utils/secureStore";
import { BASE_URL } from "@/constants/url";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

// if MediaType does not exist, just remove mediaTypes
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
    const [image, setImage] = useState(null);
    const [originalImage] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [localImage, setLocalImage] = useState(null);
    const IMAGE_BASE_URL = "https://livelenns.online/public/images";
    useEffect(() => {
        requestPermission();
        fetchProfile();
    }, []);
    const fetchProfile = async () => {
        const response = await fetch(`${BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${await getToken("token")}`,
            },
        });
        const result = await response.json();
        const photo = result.data.profile_photo;

        if (photo) {
            setImage(`${IMAGE_BASE_URL}/${photo}`);
        }
        console.log("PROFILE RESULT:", result);
        console.log("IMAGE URL:", image);
        if (result.status === "success") {
            setUser(result.data); // 🔥 store the data properly
        }
    };
    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission required", "Gallery permission is needed.");
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                // remove mediaTypes
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            console.log("📦 Picker result:", result);

            if (!result.canceled) {
                const asset = result.assets[0];
                console.log("📷 Selected asset:", asset);
                setImage(asset.uri);
            }
        } catch (error) {
            console.log("❌ Picker error:", error);
        }
    };
    const handleSave = async () => {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();
        const imageChanged = image && image !== originalImage;

        if (!trimmedName && !trimmedEmail && !trimmedPhone && !imageChanged) {
            Alert.alert("Validation Error", "Update at least one field.");
            return;
        }

        try {
            setLoading(true);

            const rawToken = await getToken("token");
            const token = rawToken?.replace(/"/g, "");

            const success = [];
            const errors = [];

            // IMAGE UPLOAD
            if (imageChanged && image) {
                const formData = new FormData();
                const fileName = image.split("/").pop() || `photo-${Date.now()}.jpg`;
                formData.append("photo", {
                    uri: image,
                    name: fileName,
                    type: "image/jpeg",
                });

                try {
                    const res = await fetch(`${BASE_URL}/profile-photo`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    });

                    const text = await res.text();
                    console.log("📡 Upload response:", text);

                    if (res.ok) {
                        success.push("Profile photo updated");
                    } else {
                        errors.push(`Photo: ${text}`);
                    }
                } catch (err) {
                    console.log("❌ Upload error:", err);
                    errors.push("Photo upload failed.");
                }
            }

            // TEXT UPDATES
            const updates = [
                trimmedName && {
                    url: `${BASE_URL}/update-profile/name/${encodeURIComponent(trimmedName)}`,
                    field: "Name",
                },
                trimmedEmail && {
                    url: `${BASE_URL}/update-profile/email/${encodeURIComponent(trimmedEmail)}`,
                    field: "Email",
                },
                trimmedPhone && {
                    url: `${BASE_URL}/update-profile/phone/${encodeURIComponent(trimmedPhone)}`,
                    field: "Phone",
                },
            ].filter(Boolean);

            for (const update of updates) {
                const res = await fetch(update.url, {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const text = await res.text();
                console.log(`📡 ${update.field} response:`, text);

                if (res.ok) {
                    success.push(`${update.field} updated`);
                } else {
                    errors.push(`${update.field}: ${text}`);
                }
            }

            if (success.length) {
                Alert.alert("Success", success.join("\n"));
                router.back();
            }

            if (errors.length) {
                Alert.alert("Error", errors.join("\n"));
            }
        } catch (err) {
            console.log("❌ General error:", err);
            Alert.alert("Network Error", "Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Edit Profile</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.avatarSection}>
                        {image ? (

                            <Image
                                key={image}
                                source={{ uri: image }}
                                style={styles.avatar}
                                onError={(e) => console.log("❌ Image load error:", e.nativeEvent)}
                            />
                        ) : (
                            <View style={[styles.avatar, styles.placeholder]}>
                                <Ionicons name="person" size={40} color="#999" />
                            </View>
                        )}

                        <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImage}>
                            <Ionicons name="camera-outline" size={16} color="#FF3344" />
                            <Text style={styles.changePhotoText}>Change Photo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter full name"
                        />

                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Enter email"
                        />

                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="Enter phone"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSave}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveText}>Save</Text>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 20 },
    headerText: { fontSize: 18, fontWeight: "700" },
    avatarSection: { alignItems: "center", marginBottom: 30 },
    avatar: { width: 100, height: 100, borderRadius: 100 },
    placeholder: { backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
    changePhotoBtn: { flexDirection: "row", alignItems: "center", marginTop: 8 },
    changePhotoText: { color: "#FF3344", marginLeft: 5, fontWeight: "600" },
    form: { marginBottom: 30 },
    label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
    input: { borderWidth: 1, borderColor: "#eee", borderRadius: 10, padding: 12, marginBottom: 18, backgroundColor: "#fafafa" },
    saveButton: { backgroundColor: "#FF3344", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginBottom: 40 },
    saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});