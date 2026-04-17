import { getToken } from '@/app/utils/secureStore'; // We'll use this to persist requestId
import { useRequest } from '@/context/requestContext';
import { styles } from '@/styles/cameraScreen';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
export default function CameraScreen() {
    const cameraRef = useRef(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [images, setImages] = useState([]);
    const { requestId, saveRequestId } = useRequest();

    // Load persisted requestId if context is empty
    useEffect(() => {
        async function loadRequestId() {
            if (!requestId) {
                const storedId = await getToken("CURRENT_REQUEST_ID");

                if (storedId) {
                    const parsedId = JSON.parse(storedId);
                    saveRequestId(parsedId);

                    console.log("Loaded Request ID:", parsedId);
                }
            }
        }

        loadRequestId();
    }, [requestId]);

    async function takePhoto() {
        if (!cameraRef.current || !cameraReady) return;

        const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
            base64: false,
            exif: true,
        });

        const newImages = [...images, photo.uri];
        setImages(newImages);

        if (!requestId) {
            alert("Request ID is missing. Please go back and try again.");
            return;
        }

        router.push({
            pathname: "/requests/comment",
            params: {
                media: JSON.stringify(newImages), // ✅ consistent key
            },
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

