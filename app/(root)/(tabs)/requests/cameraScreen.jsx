import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
    const cameraRef = useRef(null);
    const [cameraReady, setCameraReady] = useState(false); // ✅ Added
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [images, setImages] = useState([]);

    async function takePhoto() {
        if (!cameraRef.current || !cameraReady) return;

        const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
            base64: false,
            exif: true,
        });

        console.log("Photo captured:", photo);

        // Save image to local state
        const newImages = [...images, photo.uri];
        setImages(newImages);

        // Navigate to capture review screen
        router.push({
            pathname: "/requests/captureScreen",
            params: { media: JSON.stringify(newImages) }
        });
    }


    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>

            {/* Top Bar */}
            <View style={styles.topBar}>
                <Text style={styles.time}>9:41</Text>
                <View style={styles.topRight}>
                    <Text style={styles.icon}>⚡</Text>
                    <TouchableOpacity onPress={toggleCameraFacing}>
                        <Text style={styles.icon}>🔁</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
                onCameraReady={() => setCameraReady(true)}
            />

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <Text style={styles.toggleMode}>Photo    Video</Text>
                <TouchableOpacity
                    onPress={takePhoto}
                    style={styles.shutterBtn}
                    disabled={!cameraReady}
                />
            </View>

            {/* Cancel Button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: 'white',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingTop: 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10,
    },
    time: {
        color: 'white',
        fontSize: 16,
    },
    topRight: {
        flexDirection: 'row',
        gap: 20,
    },
    icon: {
        fontSize: 20,
        color: 'white',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 20,
    },
    closeText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    toggleMode: {
        color: 'white',
        fontSize: 17,
        marginBottom: 25,
    },
    shutterBtn: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: '#222',
    },
});
