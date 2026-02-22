import { BASE_URL } from "../constants/url";
import { getToken } from "./secureStore";

export const sendNotification = async () => {
    const token = await getToken("token");

    const response = await fetch(`${BASE_URL}/send-notification`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const text = await response.text();

    console.log("🔔 Notification RAW response:");
    console.log("Status:", response.status);
    console.log("Body:", text);

    if (!response.ok) {
        throw new Error("Notification request failed");
    }

    if (!text) return null;

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
};
