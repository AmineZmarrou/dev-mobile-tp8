import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
export default function AppBar({ title, back }) {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView edges={["top"]} style={[styles.safe, { backgroundColor: theme.surface }]}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.surface, borderBottomColor: theme.border },
        ]}
      >
        {back ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backText, { color: theme.primary }]}>
              Retour
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <View style={styles.backSpacer} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 6,
  },
  backText: {
  },
  backSpacer: {
    width: 60,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
