import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import { useRef } from "react";
import AppBar from "../components/AppBar";
export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  if (!permission) return <Text>Chargement...</Text>;
  if (!permission.granted && !permission.canAskAgain) {
    return (
      <View style={styles.center}>
        <AppBar title="Camera" back />
        <Text>Acces camera refuse</Text>
        <Button title="Ouvrir les parametres" onPress={() => Linking.openSettings()} />
      </View>
    );
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <AppBar title="Camera" back />
        <Text>Acces camera requis</Text>
        <Button title="Autoriser" onPress={requestPermission} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Camera" back />
      <CameraView ref={cameraRef} style={{ flex: 1 }} />
      <View style={styles.controls}>
        <Button title="Retour" color="gray" onPress={() => navigation.goBack()} />
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
    backgroundColor: "#fff",
  },
});
