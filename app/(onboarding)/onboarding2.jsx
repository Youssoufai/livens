import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function Onboarding2() {
    return (
        <ImageBackground
            source={require('@/assets/images/onboarding1.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>
                    Know what's{'\n'}happening right{'\n'}now, anywhere in{'\n'}Nigeria.
                </Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get started</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
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