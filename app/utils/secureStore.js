import * as SecureStore from "expo-secure-store";

export async function saveToken(token, key = "token") {
    let value = token;
    if (typeof token === "object") value = JSON.stringify(token);
    await SecureStore.setItemAsync(key, value);
}

export async function getToken(key = "token") {
    const raw = await SecureStore.getItemAsync(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (e) {
        return raw;
    }
}

export async function deleteToken(key = "token") {
    await SecureStore.deleteItemAsync(key);
}
