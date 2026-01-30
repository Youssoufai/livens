import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { saveToken } from "../utils/secureStore";

const BASE_URL = "{{url}}"; // replace with your base url

export default function LoginScreen() {
    const insets = useSafeAreaInsets();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const canLogin = email.trim() && password.trim();

    const handleLogin = async () => {
        if (!canLogin) return;

        try {
            setLoading(true);

            const response = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            // ✅ Save token (only if remember me or always — your choice)
            await saveToken(data.token);

            Alert.alert("Success", "Logged in successfully");
            // router.replace("/(tabs)");
        } catch (error) {
            Alert.alert("Login failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.container}>

                {/* Header */}
                <Text style={styles.title}>Welcome back</Text>

                {/* Email */}
                <View style={styles.field}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Password */}
                <View style={styles.field}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordInput}>
                        <TextInput
                            placeholder="Enter password"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={!showPassword}
                            style={styles.passwordText}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={
                                    showPassword
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                size={20}
                                color="#6B7280"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Remember + Forgot */}
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.remember}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                rememberMe && styles.checkboxActive,
                            ]}
                        >
                            {rememberMe && (
                                <Ionicons
                                    name="checkmark"
                                    size={12}
                                    color="#fff"
                                />
                            )}
                        </View>
                        <Text style={styles.rememberText}>
                            Remember me
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgot}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Spacer pushes button to bottom */}
                <View style={{ flex: 1 }} />

                {/* Login Button (BOTTOM) */}
                <View style={{ paddingBottom: insets.bottom + 16 }}>
                    <TouchableOpacity
                        style={[
                            styles.loginBtn,
                            (!canLogin || loading) && styles.disabledBtn,
                        ]}
                        onPress={handleLogin}
                        disabled={!canLogin || loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginText}>Log in</Text>
                        )}
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 30,
        color: "#111827",
    },
    field: {
        marginBottom: 18,
    },
    label: {
        fontSize: 13,
        marginBottom: 6,
        color: "#111827",
        fontWeight: "500",
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 15,
        color: "#111827",
    },
    passwordInput: {
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    passwordText: {
        flex: 1,
        fontSize: 15,
        color: "#111827",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },
    remember: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        width: 16,
        height: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    checkboxActive: {
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
    },
    rememberText: {
        fontSize: 13,
        color: "#374151",
    },
    forgot: {
        fontSize: 13,
        color: "#111827",
        fontWeight: "500",
    },
    loginBtn: {
        height: 52,
        borderRadius: 26,
        backgroundColor: "#EF4444",
        alignItems: "center",
        justifyContent: "center",
    },
    disabledBtn: {
        backgroundColor: "#E5E7EB",
    },
    loginText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
