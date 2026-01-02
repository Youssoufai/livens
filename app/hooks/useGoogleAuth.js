import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth();

export function useGoogleAuth() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com",
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.params;

            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }, [response]);

    return { promptAsync };
}
