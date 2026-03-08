import { router } from 'expo-router'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Onboarding2() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('@/app/assets/images/onboarding1.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={styles.title}>
                        Know whats{'\n'}happening right{'\n'}now, anywhere in{'\n'}Nigeria.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/(onboarding)/redirect')}>
                        <Text style={styles.buttonText}>Next</Text>
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
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
})