import * as SecureStore from "expo-secure-store";

const KEY = "CURRENT_REQUEST_ID";

export const saveCurrentRequestId = async (id) => {
    if (typeof id !== "number") {
        console.error("❌ request_id must be a number:", id);
        return;
    }
    await SecureStore.setItemAsync(KEY, id.toString());
};

export const getCurrentRequestId = async () => {
    const value = await SecureStore.getItemAsync(KEY);
    return value ? Number(value) : null;
};

export const clearCurrentRequestId = async () => {
    await SecureStore.deleteItemAsync(KEY);
};
