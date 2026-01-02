import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import ProgressBar from "../components/progressBar";
import { BASE_URL } from "../constants/url";
import { getToken } from "../utils/secureStore";

export default function LocationSetup({ activeIndex, totalSteps, onNextStep }) {
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    /**
     * 🔐 Send location to backend
     * Backend expects: { location: string }
     */
    const updateLocation = async () => {
        if (!address.trim()) {
            Alert.alert("Error", "Location is required.");
            return;
        }

        try {
            setIsLoading(true);

            const token = await getToken("token");
            if (!token) {
                Alert.alert(
                    "Session expired",
                    "Please log in again to continue."
                );
                return;
            }

            const payload = {
                location: address.trim(),
            };

            console.log("Sending payload:", payload);

            const response = await fetch(`${BASE_URL}/update-location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.text();
            console.log("Response:", response.status, data);

            if (!response.ok) {
                throw new Error(data || "Failed to update location");
            }

            Alert.alert("Success", "Location updated successfully!");
            onNextStep?.();
        } catch (error) {
            console.error("Location update error:", error);
            Alert.alert(
                "Error",
                error.message || "Unable to update location. Try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * 📍 Get current location (NO auto-submit)
     */
    const getCurrentLocation = async () => {
        try {
            setIsGettingLocation(true);

            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                Alert.alert(
                    "Permission denied",
                    "Location permission is required."
                );
                return;
            }

            const { coords } = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const geocode = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });

            if (!geocode.length) {
                throw new Error("Unable to resolve address");
            }

            const a = geocode[0];

            const formattedAddress = [
                a.street,
                a.city,
                a.region,
                a.country,
            ]
                .filter(Boolean)
                .join(", ");

            setAddress(formattedAddress);
        } catch (error) {
            console.error("Get location error:", error);
            Alert.alert(
                "Error",
                "Could not get your location. Please enter it manually."
            );
        } finally {
            setIsGettingLocation(false);
        }
    };

    return (
        <View style={styles.container}>
            <ProgressBar
                activeIndex={activeIndex}
                totalSteps={totalSteps}
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Last step! Where do you live?
                </Text>
                <Text style={styles.description}>
                    We’ll recommend requests with the best offers for you.
                </Text>

                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search"
                        size={18}
                        color="#999"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        placeholder="Enter your address"
                        placeholderTextColor="#999"
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>

                <TouchableOpacity
                    style={styles.locationButton}
                    onPress={getCurrentLocation}
                    disabled={isGettingLocation}
                >
                    {isGettingLocation ? (
                        <ActivityIndicator
                            color="#EF4444"
                            style={{ marginRight: 8 }}
                        />
                    ) : (
                        <Ionicons
                            name="location-outline"
                            size={18}
                            color="#EF4444"
                        />
                    )}
                    <Text style={styles.locationText}>
                        {isGettingLocation
                            ? "Getting location..."
                            : "Use current location"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        (!address.trim() || isLoading) &&
                        styles.disabledButton,
                    ]}
                    onPress={updateLocation}
                    disabled={!address.trim() || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Confirm</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={onNextStep}
                    disabled={isLoading}
                >
                    <Text style={styles.skipButtonText}>
                        Skip for now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    content: {
        flex: 1,
        paddingTop: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827",
    },
    description: {
        fontSize: 14,
        color: "#6B7280",
        marginTop: 6,
        marginBottom: 30,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 50,
    },
    searchIcon: { marginRight: 8 },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#111827",
    },
    locationButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16,
    },
    locationText: {
        color: "#EF4444",
        fontWeight: "500",
        marginLeft: 6,
    },
    buttonGroup: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#EF4444",
        paddingVertical: 16,
        borderRadius: 25,
        marginBottom: 20,
    },
    disabledButton: {
        backgroundColor: "#E5E7EB",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
    },
    skipButtonText: {
        color: "#6B7280",
        fontSize: 14,
        textAlign: "center",
    },
});
