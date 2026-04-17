import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function NoResults() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>No search results found.</Text>
            <Button title="Back to Search" onPress={() => router.back()} />
        </View>
    );
}
