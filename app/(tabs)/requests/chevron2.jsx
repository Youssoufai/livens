import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '@/styles/requestIndex';

export default function Chevron() {
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="chevron-back" size={24} color="#000" />
            </View>

            {/* Step Text */}
            <Text style={styles.stepText}>Step 1 of 4</Text>

            {/* Title */}
            <Text style={styles.title}>Create request</Text>

            {/* Label */}
            <Text style={styles.label}>
                Specify the location where you need updates from.
            </Text>

            {/* Location Input */}
            <View style={styles.inputContainer}>
                <Ionicons name="search-outline" size={18} color="#999" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Choose location"
                    placeholderTextColor="#999"
                    value={location}
                    onChangeText={setLocation}
                />
            </View>

            {/* Description */}
            <Text style={[styles.label, { marginTop: 20 }]}>
                Describe what respondents should focus on when capturing content for you.
            </Text>

            <TextInput
                style={styles.textArea}
                placeholder="E.x: Take a picture of the pool"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            {/* Next Button */}
            <TouchableOpacity onPress={() => { router.push("/requests/requestCondition") }} style={[styles.button, !(location && description) && styles.buttonDisabled]}>
                <Text style={[styles.buttonText, !(location && description) && styles.buttonTextDisabled]}>
                    Next
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



