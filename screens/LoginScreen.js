import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { AuthRequest, ResponseType } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { ThemeContext } from "../context/ThemeContext";
WebBrowser.maybeCompleteAuthSession();
const EXPO_CLIENT_ID =

  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const ANDROID_CLIENT_ID =
   EXPO_CLIENT_ID;
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const isExpoGo = Constants.appOwnership === "expo";

export default function LoginScreen() {
  const { theme, toggleTheme, mode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: isExpoGo ? EXPO_CLIENT_ID : undefined,
    androidClientId: isExpoGo ? undefined : ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    responseType: "id_token",
    scopes: ["openid", "profile", "email"],
    usePKCE: false,
    selectAccount: true,
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(() =>
        setError("Erreur Google Sign-In")
      );
    }
  }, [response]);
  const login = async () => {
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };
  const register = async () => {
    setError("");
    setInfo("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Compte deja existant ou mot de passe faible");
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async () => {
    setError("");
    setInfo("");
    if (!email.trim()) {
      setError("Entrez votre email pour reinitialiser le mot de passe");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfo("Email de reinitialisation envoye");
    } catch {
      setError("Erreur lors de l'envoi de l'email");
    } finally {
      setLoading(false);
    }
  };
  const signInWithGoogleProxy = async () => {
    setError("");
    setLoading(true);
    try {
      const proxyRedirectUri = "https://auth.expo.io/@aminezmarrou/tp8-react-native";
      const returnUrl = AuthSession.makeRedirectUri();
      const nonce = Math.random().toString(36).slice(2);
      const request = new AuthRequest({
        clientId: EXPO_CLIENT_ID,
        responseType: ResponseType.IdToken,
        redirectUri: proxyRedirectUri,
        scopes: ["openid", "profile", "email"],
        extraParams: { nonce },
        prompt: "select_account",
        usePKCE: false,
      });
      const authUrl = await request.makeAuthUrlAsync(Google.discovery);
      const startUrl = `${proxyRedirectUri}/start?authUrl=${encodeURIComponent(
        authUrl
      )}&returnUrl=${encodeURIComponent(returnUrl)}`;
      const result = await WebBrowser.openAuthSessionAsync(startUrl, returnUrl);
      if (result.type !== "success") {
        setError("Connexion Google annulee");
        return;
      }
      const parsed = request.parseReturnUrl(result.url);
      if (parsed.type !== "success") {
        setError("Erreur Google Sign-In");
        return;
      }
      const idToken = parsed.params.id_token;
      if (!idToken) {
        setError("Erreur Google Sign-In");
        return;
      }
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err ? err.message : "Erreur Google Sign-In";
      setError(String(message));
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Connexion
      </Text>
      {error !== "" && (
        <Text
          style={{
            color: theme.danger,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      )}
      {info !== "" && (
        <Text
          style={{
            color: theme.textMuted,
            marginBottom: 10,
            textAlign: "center",
          }}
        >
          {info}
        </Text>
      )}
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.textMuted}
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          backgroundColor: theme.inputBackground,
          color: theme.text,
        }}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor={theme.textMuted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          borderRadius: 8,
          padding: 12,
          marginBottom: 20,
          backgroundColor: theme.inputBackground,
          color: theme.text,
        }}
      />
      {loading ? (
        <ActivityIndicator color={theme.primary} />
      ) : (
        <>
          <TouchableOpacity
            onPress={login}
            style={{
              backgroundColor: theme.primary,
              padding: 14,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: theme.primaryText, textAlign: "center" }}>
              Se connecter
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={register}
            style={{
              borderWidth: 1,
              borderColor: theme.primary,
              padding: 14,
              borderRadius: 8,
              marginBottom: 20,
              backgroundColor: theme.surface,
            }}
          >
            <Text style={{ color: theme.primary, textAlign: "center" }}>
              Creer un compte
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={resetPassword} style={{ marginBottom: 20 }}>
            <Text style={{ color: theme.textMuted, textAlign: "center" }}>
              Mot de passe oublie ?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isExpoGo ? false : !request}
            onPress={() => (isExpoGo ? signInWithGoogleProxy() : promptAsync())}
            style={{
              backgroundColor: "#DB4437",
              padding: 14,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Continuer avec Google
            </Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          marginTop: 30,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: theme.border,
          backgroundColor: theme.surface,
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 999,
        }}
      >
        <Text style={{ textAlign: "center", color: theme.text }}>
          {mode === "light" ? "Mode sombre" : "Mode clair"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
