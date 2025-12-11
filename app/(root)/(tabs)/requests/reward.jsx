import { useRequest } from "@/app/context/requestContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RewardScreen() {
    const router = useRouter();
    const { request, updateRequest } = useRequest();

    const [selectedReward, setSelectedReward] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [noReward, setNoReward] = useState(false);

    useEffect(() => {
        if (!request) return;

        if (request.reward === 0) {
            setNoReward(true);
            setSelectedReward(null);
        } else if (request.reward) {
            if (request.reward === "custom") {
                setSelectedReward("custom");
                setCustomAmount(String(request.reward || ""));
            } else {
                setSelectedReward(String(request.reward));
            }
        }
    }, [request]);

    const rewards = [
        { id: "1000", amount: "₦1,000", label: "Popular for simple tasks" },
        { id: "2500", amount: "₦2,500", label: "Attracts fast responses" },
        { id: "custom", amount: "Custom", label: "Set your own price" },
    ];

    const handleNext = () => {
        if (noReward) {
            updateRequest({ ...request, reward: 0 });
            router.push("/(root)/(tabs)/requests/confirm");
            return;
        }

        if (!selectedReward) {
            alert("Please select a reward or choose no reward.");
            return;
        }

        if (selectedReward === "custom") {
            const amount = Number(customAmount);
            if (!amount || amount < 500) return alert("Minimum custom reward is ₦500");

            updateRequest({ ...request, reward: amount });
        } else {
            updateRequest({ ...request, reward: Number(selectedReward) });
        }

        router.push("/(root)/(tabs)/requests/confirm");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.stepText}>Step 3 of 4</Text>
                <Text style={styles.title}>Add reward</Text>

                {rewards.map((r) => {
                    const isSelected = selectedReward === r.id;

                    return (
                        <TouchableOpacity
                            key={r.id}
                            style={[styles.rewardCard, isSelected && styles.rewardCardSelected]}
                            onPress={() => {
                                setSelectedReward(r.id);
                                setNoReward(false);
                            }}
                        >
                            <View style={styles.cardRow}>
                                <View>
                                    <Text style={styles.rewardAmount}>{r.amount}</Text>
                                    <Text style={styles.rewardDescription}>{r.label}</Text>
                                </View>

                                <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                                    {isSelected && <View style={styles.radioInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

                {selectedReward === "custom" && (
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.inputLabel}>Enter amount</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="2000"
                            value={customAmount}
                            onChangeText={setCustomAmount}
                        />
                    </View>
                )}

                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => {
                        setNoReward(!noReward);
                        setSelectedReward(null);
                        setCustomAmount("");
                    }}
                >
                    <View style={[styles.checkbox, noReward && styles.checkboxChecked]} />
                    <Text style={styles.checkboxText}>Post without reward</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.nextButton, (!selectedReward && !noReward) && styles.nextButtonDisabled]}
                    onPress={handleNext}
                    disabled={!selectedReward && !noReward}
                >
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, paddingBottom: 60 },
    backButton: { marginBottom: 10 },
    stepText: { color: "#777" },
    title: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
    rewardCard: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 16,
        marginBottom: 14,
        backgroundColor: "#fff",
    },
    rewardCardSelected: {
        borderColor: "#E60023",
        backgroundColor: "#FFF5F5",
    },
    cardRow: { flexDirection: "row", justifyContent: "space-between" },
    rewardAmount: { fontSize: 18, fontWeight: "600" },
    rewardDescription: { fontSize: 13, color: "#666" },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#aaa",
        justifyContent: "center",
        alignItems: "center",
    },
    radioOuterActive: { borderColor: "#E60023" },
    radioInner: { width: 12, height: 12, backgroundColor: "#E60023", borderRadius: 20 },
    inputLabel: { marginBottom: 6, fontWeight: "500" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    checkboxContainer: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
    checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: "#999", borderRadius: 4, marginRight: 10 },
    checkboxChecked: { backgroundColor: "#E60023", borderColor: "#E60023" },
    checkboxText: { fontSize: 14 },
    nextButton: {
        backgroundColor: "#E60023",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    nextButtonDisabled: { backgroundColor: "#ccc" },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
