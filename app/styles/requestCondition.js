import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
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
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 8,
    },
    picker: {
        height: 44,
        fontSize: 15,
        color: '#000',
    },
    radioContainer: {
        marginTop: 10,
    },
    bottomButtonContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
