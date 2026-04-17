import { useRequest } from "@/context/requestContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RequestConditions() {
    const router = useRouter();
    const { updateRequest } = useRequest();

    const [duration, setDuration] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [allowComment, setAllowComment] = useState(false);

    const durations = ["6 hours", "12 hours", "18 hours", "24 hours"];

    const handleNext = () => {
        if (!duration) {
            Alert.alert("Select duration", "Please select a duration before proceeding.");
            return;
        }

        updateRequest({
            duration,
            allow_comment: allowComment ? "1" : "0",
        });

        router.push("/(root)/(tabs)/requests/reward");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, paddingHorizontal: 20 }}>

                    {/* Back Button */}
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={26} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Header Text */}
                    <Text style={{ color: "#888", marginTop: 20 }}>
                        Step 2 of 4
                    </Text>

                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "700",
                            marginTop: 4,
                        }}
                    >
                        Set request conditions
                    </Text>

                    <Text
                        style={{
                            color: "#666",
                            marginTop: 12,
                            lineHeight: 20,
                        }}
                    >
                        Choose a time duration for which the request must be completed.
                    </Text>

                    {/* Dropdown */}
                    <TouchableOpacity
                        onPress={() => setShowDropdown(true)}
                        style={{
                            marginTop: 20,
                            backgroundColor: "#FFF",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#DDD",
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: duration ? "#000" : "#999" }}>
                            {duration || "Select duration"}
                        </Text>

                        <Ionicons name="chevron-down" size={20} color="#777" />
                    </TouchableOpacity>

                    {/* Comments Section */}
                    {/*         <View
                        style={{
                            marginTop: 30,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View style={{ flex: 1, paddingRight: 10 }}>
                            <Text style={{ fontWeight: "600", marginBottom: 6 }}>
                                Comments
                            </Text>
                            <Text style={{ color: "#666", fontSize: 13 }}>
                                Allow respondents to write comments based on their experience.
                            </Text>
                        </View>

                        <Switch
                            value={allowComment}
                            onValueChange={setAllowComment}
                        />
                    </View> */}

                    {/* Spacer */}
                    <View style={{ flex: 1 }} />

                    {/* Next Button */}
                    <TouchableOpacity
                        onPress={handleNext}
                        disabled={!duration}
                        style={{
                            backgroundColor: duration ? "#FF3344" : "#FF3344",
                            paddingVertical: 16,
                            borderRadius: 30,
                            alignItems: "center",
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "600",
                                color: duration ? "#FFF5F5" : "#FFF5F5",
                            }}
                        >
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Dropdown Modal */}
                <Modal visible={showDropdown} transparent animationType="fade">
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.2)",
                            justifyContent: "center",
                            paddingHorizontal: 30,
                        }}
                        onPress={() => setShowDropdown(false)}
                        activeOpacity={1}
                    >
                        <View
                            style={{
                                backgroundColor: "#FFF",
                                borderRadius: 12,
                                paddingVertical: 10,
                            }}
                        >
                            {durations.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setDuration(item);
                                        setShowDropdown(false);
                                    }}
                                    style={{
                                        paddingVertical: 14,
                                        paddingHorizontal: 16,
                                        borderBottomWidth:
                                            index !== durations.length - 1 ? 1 : 0,
                                        borderColor: "#EEE",
                                    }}
                                >
                                    <Text style={{ fontSize: 16 }}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </TouchableOpacity>
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}