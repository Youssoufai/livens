import { Stack } from 'expo-router';
import React from 'react';

export default function _layout() {
    console.log("ONBOARDING MOUNTED");
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='onboarding' />
            <Stack.Screen name='create-account' />
            <Stack.Screen name='confirm-email' />
        </Stack>
    )
}
