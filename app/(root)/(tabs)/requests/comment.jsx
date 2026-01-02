import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AddCommentScreen() {
    const params = useLocalSearchParams();

    // ✅ FIX: read media, not images
    const media = useMemo(() => {
        try {
            return params.media ? JSON.parse(params.media) : [];
        } catch {
            return [];
        }
    }, [params.media]);

    const [comment, setComment] = useState("");

    const canProceed = comment.trim().length > 0 || media.length > 0;

    function goNext() {
        router.push({
            pathname: "/requests/submitScreen",
            params: {
                media: JSON.stringify(media),
                comment,
            },
        });
    }

    function goBack() {
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={22} color="#000" />
                </TouchableOpacity>

                <Text style={styles.stepText}>Step 2 of 3</Text>
                <Text style={styles.title}>Add your comments</Text>

                {/* ✅ REAL IMAGE PREVIEW */}
                <View style={styles.imageRow}>
                    <View style={styles.imageList}>
                        {media.length === 0 ? (
                            <View style={styles.imageBox} />
                        ) : (
                            media.map((uri, index) => (
                                <View key={index} style={styles.imageBox}>
                                    <Image source={{ uri }} style={styles.image} />
                                </View>
                            ))
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={goBack}
                    >
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.helperText}>
                    What are your thoughts on this place based on your experience?
                </Text>

                <TextInput
                    placeholder="Write comment"
                    value={comment}
                    onChangeText={setComment}
                    multiline
                    style={styles.input}
                />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={goNext}
                    disabled={!canProceed}
                    style={[
                        styles.nextButton,
                        !canProceed && styles.nextButtonDisabled,
                    ]}
                >
                    <Text
                        style={[
                            styles.nextText,
                            !canProceed && styles.nextTextDisabled,
                        ]}
                    >
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    backButton: {
        marginBottom: 10,
    },
    stepText: {
        fontSize: 13,
        color: "#777",
        marginBottom: 6,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 20,
    },
    imageRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    imageList: {
        flexDirection: "row",
    },
    imageBox: {
        width: 70,
        height: 70,
        borderRadius: 10,
        backgroundColor: "#e5e5e5",
        marginRight: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    editButton: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    editText: {
        fontSize: 14,
        fontWeight: "600",
    },
    helperText: {
        fontSize: 15,
        color: "#555",
        marginBottom: 10,
        lineHeight: 22,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        padding: 14,
        minHeight: 100,
        textAlignVertical: "top",
        fontSize: 15,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: "#f0f0f0",
    },
    nextButton: {
        backgroundColor: "#000",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
    },
    nextButtonDisabled: {
        backgroundColor: "#eee",
    },
    nextText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    nextTextDisabled: {
        color: "#aaa",
    },
});
