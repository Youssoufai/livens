import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CheckBox({ label, checked, onPress }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.checkbox, checked && styles.checked]}>
                {checked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#de1c1c',
        borderRadius: 4,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    checked: {
        backgroundColor: '#de1c1c',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        color: '#333',
    },
});