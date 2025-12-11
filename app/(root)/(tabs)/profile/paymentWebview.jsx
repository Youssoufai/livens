import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function PaymentWebview() {
    const { url } = useLocalSearchParams();

    if (!url) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No payment URL provided</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView source={{ uri: url }} />
        </SafeAreaView>
    );
}
