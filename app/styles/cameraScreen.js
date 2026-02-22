import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    message: { textAlign: 'center', paddingBottom: 10, color: 'white' },
    camera: { flex: 1, width: '100%' },
    topBar: { position: 'absolute', top: 0, width: '100%', paddingTop: 40, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },
    time: { color: 'white', fontSize: 16 },
    topRight: { flexDirection: 'row', gap: 20 },
    icon: { fontSize: 20, color: 'white' },
    closeButton: { position: 'absolute', top: 40, left: 20, zIndex: 20 },
    closeText: { fontSize: 24, color: 'white', fontWeight: 'bold' },
    bottomBar: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
    toggleMode: { color: 'white', fontSize: 17, marginBottom: 25 },
    shutterBtn: { width: 80, height: 80, borderRadius: 50, backgroundColor: 'white', borderWidth: 5, borderColor: '#222' },
});
