import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import Onboarding2 from './onboarding2'
import Onboarding3 from './onboarding3'
const { width, height } = Dimensions.get('window')
export default function onboarding() {
    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
        >
            <View style={[styles.page, { width, height }]}>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={{ width, height }}>
                <Onboarding2 />
            </View>

            <View style={{ width, height }}>
                <Onboarding3 />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
})
