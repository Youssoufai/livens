import React from 'react';
import { StyleSheet, View } from 'react-native';


export default function ProgressBar({ activeIndex, totalSteps }) {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.step,
                        index <= activeIndex ? styles.activeStep : styles.inactiveStep,
                        index === 0 && styles.firstStep,
                        index === totalSteps - 1 && styles.lastStep,
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 3,
        backgroundColor: '#f0f0f0',
        marginBottom: 24,
    },
    step: {
        flex: 1,
    },
    activeStep: {
        backgroundColor: 'red',
    },
    inactiveStep: {
        backgroundColor: '#f0f0f0',
    },
    firstStep: {
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2,
    },
    lastStep: {
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
    },
});