import React from 'react';
import { Button, View } from 'react-native';
import { usePaystack } from 'react-native-paystack-webview';
export default function Payment() {
    const { popup } = usePaystack();
    const handlePayment = () => {
        popup.newTransaction({
            amount: 5000, // Amount in kobo
            email: 'yusufmuhammadbashir2005@gmail.com',
            reference: `TXN-${Date.now()}`,
            onSuccess: (response) => {
                console.log('Payment Successful:', response);
            }
        });
    };

    return (
        <View>
            <Button title="Pay Now" onPress={handlePayment} />
        </View>
    );
}
