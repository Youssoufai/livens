import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
    },
    header: {
        marginTop: 8,
        marginBottom: 8,
    },
    stepText: {
        color: '#888',
        fontSize: 13,
        marginTop: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        marginTop: 4,
    },
    label: {
        fontSize: 14,
        color: '#444',
        marginTop: 16,
        lineHeight: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    inputIcon: {
        marginRight: 6,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#000',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        height: 100,
        marginTop: 10,
        padding: 12,
        fontSize: 15,
        color: '#000',
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonDisabled: {
        backgroundColor: '#f2f2f2',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    buttonTextDisabled: {
        color: '#999',
    },
});
