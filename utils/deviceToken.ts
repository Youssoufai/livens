import * as SecureStore from "expo-secure-store";
import { OneSignal } from "react-native-onesignal";

import { BASE_URL } from "../constants/url";
import { getToken } from "./secureStore";

const sleep = (ms:number) => new Promise((res) => setTimeout(res, ms));

export const initDeviceToken = async () => {
    try {

        let playerId = null;

        for (let i = 0; i < 6; i++) {
            playerId = await OneSignal.User.pushSubscription.getIdAsync();

            if (playerId) break;

            console.log("⏳ Waiting for OneSignal Player ID...");
            await sleep(1500);
        }

        if (!playerId) {
            console.log("❌ Could not get OneSignal Player ID");
            return;
        }

        console.log("🔥 OneSignal Player ID:", playerId);

        await SecureStore.setItemAsync("device_token", playerId);

        const token = await getToken("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/device-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                device_token: playerId,
            }),
        });
        if (!res.ok) {
            console.log("❌ Failed to sync Player ID");
            return;
        }
        console.log("✅ Player ID synced to backend");

    } catch (error) {
        console.log("❌ Device token error:", error);
    }
};
