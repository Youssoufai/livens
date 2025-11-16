import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../../../styles/rewardStyle";

export default function RewardScreen() {
    const router = useRouter();

    const [selectedReward, setSelectedReward] = useState("1000");

    const rewards = [
        { id: "1000", amount: "₦1,000" },
        { id: "2500", amount: "₦2,500" },
        { id: "custom", amount: "Custom" },
    ];

    const handleNext = () => {
        // Navigate to confirm screen
        router.push({
            pathname: "/requests/confirm",
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.stepText}>Step 3 of 4</Text>
                <Text style={styles.title}>Add reward</Text>

                {rewards.map((reward) => (
                    <TouchableOpacity
                        key={reward.id}
                        style={[
                            styles.rewardBox,
                            selectedReward === reward.id && styles.rewardBoxSelected,
                        ]}
                        onPress={() => setSelectedReward(reward.id)}
                    >
                        <Text style={styles.rewardAmount}>{reward.amount}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
