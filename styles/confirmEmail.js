import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    content: {
        flex: 1,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 12,
        color: '#111827',
    },
    description: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 32,
    },
    email: {
        fontWeight: '600',
        color: '#1F2937',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    codeInput: {
        width: 48,
        height: 48,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    resendContainer: {
        color: '#6B7280',
        textAlign: 'center',
    },
    resendText: {
        color: '#000',
        fontWeight: '600',
    },
    continueButton: {
        backgroundColor: '#E5E7EB',
        paddingVertical: 16,
        borderRadius: 25,
        marginBottom: 20,
    },
    continueButtonActive: {
        backgroundColor: '#EF4444',
    },
    continueButtonText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
    },
    continueButtonTextActive: {
        color: '#fff',
    },
});