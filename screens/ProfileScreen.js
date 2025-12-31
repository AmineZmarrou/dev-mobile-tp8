import { View, Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, color: theme.text, marginBottom: 12 }}>
          Profil utilisateur
        </Text>
        <View
          style={{
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
            padding: 16,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: theme.textMuted, marginBottom: 6 }}>
            Email
          </Text>
          <Text style={{ color: theme.text }}>{user?.email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
