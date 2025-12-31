import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AppBar({ title, back }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.container}>
        {back ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Retour</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.backSpacer} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  backButton: {
    padding: 6,
  },
  backText: {
    color: "#2f80ed",
  },
  backSpacer: {
    width: 60,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
