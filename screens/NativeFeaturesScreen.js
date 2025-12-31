import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
export default function NativeFeaturesScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AppBar title="Fonctionnalites natives" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={[
            styles.item,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={{ color: theme.text }}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Localisation")}
          style={[
            styles.item,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={{ color: theme.text }}>Localisation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Contacts")}
          style={[
            styles.item,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={{ color: theme.text }}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={[
            styles.item,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={{ color: theme.text }}>Notifications</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 10,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
});
