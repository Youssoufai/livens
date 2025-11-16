import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function PasswordSecurity() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Push Notifications</Text>

            <TextInput
                style={styles.input}
                placeholder="Current password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="New password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
