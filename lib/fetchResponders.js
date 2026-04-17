import { BASE_URL } from "../constants/url";
import { getToken } from "../utils/secureStore";

export const fetchResponders = async (requestId) => {
    if (!requestId) return [];

    try {
        const token = await getToken("token");

        const res = await fetch(
            `${BASE_URL}/get-temp-responses/${requestId}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token.replace(/"/g, "")}`,
                },
            }
        );

        const result = await res.json();

        return result?.data || [];

    } catch (error) {
        console.log("Failed to fetch responders:", error);
        return [];
    }
};
