import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Button({ title, onPress, style, textColor = "#fff", icon }) {
    return (
        <TouchableOpacity style={[styles.confirmButton, style]} onPress={onPress}>
            <View style={styles.content}>
                {icon && <View style={styles.icon}>{icon}</View>}
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    confirmButton: {
        backgroundColor: "#de1c1c",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
        marginBottom: 20,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
});
