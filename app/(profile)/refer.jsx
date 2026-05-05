import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ReferAndEarn() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/300x150' }}
                    style={styles.image}
                />
                <Text style={styles.title}>Refer friends and get 15% of their earnings</Text>

                <View style={styles.referralContainer}>
                    <Text style={styles.label}>Referral code:</Text>
                    <View style={styles.codeBox}>
                        <Text style={styles.code}>FIGJO4KGEJL</Text>
                        <TouchableOpacity style={styles.copyButton}>
                            <Text style={styles.copyText}>📋</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subTitle}>Referees</Text>
                    <Text style={styles.emptyText}>You haven’t referred anyone yet.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.subTitle}>How it works</Text>

                    <View style={styles.step}>
                        <Text style={styles.stepNumber}>1.</Text>
                        <Text style={styles.stepText}>
                            <Text style={styles.bold}>Share Your Unique Link </Text>
                            Copy your custom invite link and send it to your friends via WhatsApp, SMS, or social media.
                        </Text>
                    </View>

                    <View style={styles.step}>
                        <Text style={styles.stepNumber}>2.</Text>
                        <Text style={styles.stepText}>
                            <Text style={styles.bold}>Earn When They Join & Use the App </Text>
                            Once your friend signs up and completes their first 2 tasks or requests, you’ll receive 15% of their earnings.
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    card: {
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    referralContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    codeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    code: {
        fontSize: 16,
        fontWeight: '500',
    },
    copyButton: {
        paddingHorizontal: 8,
    },
    copyText: {
        fontSize: 18,
    },
    section: {
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
    },
    step: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    stepNumber: {
        fontWeight: '700',
        marginRight: 8,
    },
    stepText: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    bold: {
        fontWeight: '600',
    },
});
