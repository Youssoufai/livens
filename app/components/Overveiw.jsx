
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function Overveiw({ data }) {
    const {
        title = "Jabi Lake Mall",
        location = "Jabi Lake Mall",
        address = "Plot 235, Adewale Adetokunbo St, Abuja",
        duration = "24 hours",
        ends_in = "23:59:45",
        description = "I want to see what the cinema currently looks like.",
        user = { name: "Johnathan Godswill" },
    } = data;
    const name = user?.name || "Johnathan Godswill";
    return (

        <>
            <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 6 }}>
                {title}
            </Text>
            <Text style={{ fontSize: 14, color: "#555", marginBottom: 16 }}>
                By {name}
            </Text>

            <View style={{ flexDirection: "row", marginBottom: 12 }}>
                <Ionicons name="location-outline" size={18} color="#666" />
                <View style={{ marginLeft: 8 }}>
                    <Text style={{ fontSize: 15 }}>{location}</Text>
                    <Text style={{ fontSize: 13, color: "#777" }}>{address}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 12 }}>
                <Ionicons name="time-outline" size={18} color="#666" />
                <View style={{ marginLeft: 8 }}>
                    <Text style={{ fontSize: 15 }}>{duration}</Text>
                    <Text style={{ fontSize: 13, color: "#777" }}>
                        Ends in {ends_in}
                    </Text>
                </View>
            </View>

            <Text style={{ fontSize: 17, fontWeight: "600", marginBottom: 6 }}>
                Description
            </Text>
            <Text style={{ fontSize: 15, lineHeight: 22, color: "#444" }}>
                {description}
            </Text>
        </>
    )
}