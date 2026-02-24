import { router } from 'expo-router'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Onboarding3() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('@/app/assets/images/onboarding2.png')}
                style={styles.background}
                resizeMode="cover"
            >
                {/* banfg */}
                <View style={styles.overlay}>
                    <Text style={styles.title}>
                        Earn cash by{'\n'}sharing insights{'\n'}about specific{'\n'}locations.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/(onboarding)/create-account")}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => router.push("/(onboarding)/login")}
                    >
                        <Text style={styles.loginButtonText}>Login to account</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width,
        height,
        justifyContent: 'flex-end',
    },
    overlay: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    loginButton: {
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})