import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressBar from "../../components/progress-bar";
import { BASE_URL } from "../constants/url";
import { styles } from "../styles/locationStyle";
import { getToken } from "../utils/secureStore";
export default function LocationSetup({ activeIndex, totalSteps, onNextStep }) {
    const [location, setLocation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    // ✅ Safe area insets (KEY FIX)
    const insets = useSafeAreaInsets();

    /**
     * 🔐 Send location to backend
     */
    const updateLocation = async () => {
        const trimmedAddress = location?.trim();

        if (!trimmedAddress) {
            Alert.alert("Error", "Location is required.");
            return;
        }

        // ✅ Convert commas to spaces + remove extra spaces
        const backendLocation = trimmedAddress
            .replace(/,/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        setIsLoading(true);

        try {
            const token = await getToken("token");

            // ✅ Handle missing token properly
            if (!token) {
                Alert.alert(
                    "Session expired",
                    "Please log in again to continue."
                );

                router.replace("/login");
                return;
            }

            const response = await fetch(`${BASE_URL}/update-location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    location: backendLocation, // ✅ send space-separated location
                }),
            });

            // ✅ Handle JSON or text responses safely
            let data;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                const message =
                    typeof data === "string"
                        ? data
                        : data?.message || "Failed to update location";

                throw new Error(message);
            }

            Alert.alert("Success", "Location updated successfully!");
            router.replace("/(root)/(tabs)/search")
            onNextStep?.();

        } catch (error) {
            Alert.alert(
                "Error",
                error.message || "Unable to update location. Try again."
            );
        } finally {
            setIsLoading(false);
        }
    };



    /**
     * 📍 Get current location
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

            setLocation(formattedAddress);
        } catch {
            Alert.alert(
                "Error",
                "Could not get your location. Please enter it manually."
            );
        } finally {
            setIsGettingLocation(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                            value={location}
                            onChangeText={setLocation}
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

                {/* ✅ FIXED BUTTON AREA */}
                <View
                    style={[
                        styles.buttonGroup,
                        { paddingBottom: insets.bottom + 16 },
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.button,
                            (!location.trim() || isLoading) &&
                            styles.disabledButton,
                        ]}
                        onPress={updateLocation}
                        disabled={!location.trim() || isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Confirm</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onNextStep}
                        disabled={isLoading}
                    >
                        <Text style={styles.skipButtonText}>
                            Skip for now
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


