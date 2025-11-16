import * as SecureStore from "expo-secure-store";

export async function saveToken(token) {
    await SecureStore.setItemAsync("token", JSON.stringify(token));
}

export async function getToken() {
    return await SecureStore.getItemAsync("token");
}

export async function deleteToken() {
    await SecureStore.deleteItemAsync("token");
}
