import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Onboarding() {
    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to the next screen after 2 seconds
            router.replace('/(onboarding)/onboarding2');
            // Assuming you have navigation set up, replace the following line with your navigation logic
            // e.g., navigation.replace('next-screen');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require("@/app/assets/images/logo.png")}
                style={styles.pin}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    pin: {
        width: 60,     // adjust to match your design
        height: 60,
    },
});
