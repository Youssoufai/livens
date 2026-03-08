import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";
import { WebView } from "react-native-webview";

export default function PaymentWebviewScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { url, onSuccessRedirect } = params;

    const handleWebViewNavigationStateChange = (navState) => {
        const { url: currentUrl } = navState;

        // Paystack usually appends ?status=success on success
        if (currentUrl.includes("status=success")) {
            Alert.alert("Payment Successful", "Your wallet has been funded.");
            router.replace(onSuccessRedirect || "/(root)/(tabs)/profile");
        }

        if (currentUrl.includes("status=failed")) {
            Alert.alert("Payment Failed", "Your transaction could not be completed.");
            router.back();
        }
    };

    return <WebView source={{ uri: url }} onNavigationStateChange={handleWebViewNavigationStateChange} />;
}