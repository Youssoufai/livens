import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../components/Button";


export default function CreatePassword() {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>Create and confirm your new password</Text>

            {/* Create New Password */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Create new password</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Create password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showNewPassword}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                        {showNewPassword ? (
                            <EyeOff size={22} color="#666" />
                        ) : (
                            <Eye size={22} color="#666" />
                        )}
                    </TouchableOpacity>
                </View>

                <Text style={styles.helper}>
                    New password should contain a minimum of 8 characters, including one
                    letter, and one number or symbol.
                </Text>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm password</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Confirm password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showConfirmPassword}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={22} color="#666" />
                        ) : (
                            <Eye size={22} color="#666" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Submit Button */}
            <Button title="Reset Password" style={styles.button} textColor="#fff" onPress={undefined} icon={undefined} />
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
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111",
        textAlign: "center",
        marginBottom: 35,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontWeight: "500",
        color: "#333",
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 12,
        backgroundColor: "#fafafa",
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: "#000",
    },
    helper: {
        fontSize: 12,
        color: "#888",
        marginTop: 6,
        lineHeight: 18,
    },
    button: {
        backgroundColor: "#de1c1c",
        marginTop: 10,
    },
});
