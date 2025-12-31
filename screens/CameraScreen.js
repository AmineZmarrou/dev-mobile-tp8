import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import { useRef, useContext } from "react";
import AppBar from "../components/AppBar";
import { ThemeContext } from "../context/ThemeContext";
export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { theme } = useContext(ThemeContext);
  if (!permission) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <AppBar title="Camera" back />
        <Text style={{ color: theme.text }}>Chargement...</Text>
      </View>
    );
  }
  if (!permission.granted && !permission.canAskAgain) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <AppBar title="Camera" back />
        <Text style={{ color: theme.text, marginBottom: 10 }}>
          Acces camera refuse
        </Text>
        <Button
          title="Ouvrir les parametres"
          color={theme.primary}
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <AppBar title="Camera" back />
        <Text style={{ color: theme.text, marginBottom: 10 }}>
          Acces camera requis
        </Text>
        <Button title="Autoriser" color={theme.primary} onPress={requestPermission} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AppBar title="Camera" back />
      <CameraView ref={cameraRef} style={{ flex: 1 }} />
      <View
        style={[
          styles.controls,
          { backgroundColor: theme.surface, borderTopColor: theme.border },
        ]}
      >
        <Button title="Retour" color={theme.textMuted} onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
  },
});
