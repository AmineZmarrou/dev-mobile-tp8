import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
export default function NativeFeaturesScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Fonctionnalites natives" />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          <Text style={styles.item}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Localisation")}>
          <Text style={styles.item}>Localisation</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
          <Text style={styles.item}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Text style={styles.item}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    fontSize: 16,
    paddingVertical: 10,
  },
});
