import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import LoginScreen from "../screens/LoginScreen";
import AppDrawer from "./AppDrawer";
const Stack = createNativeStackNavigator();
export default function AppStack() {
  const { user, loading } = useContext(AuthContext);
  const { theme, mode } = useContext(ThemeContext);
  if (loading) return null;
  const baseTheme = mode === "dark" ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.surface,
      text: theme.text,
      border: theme.border,
      notification: theme.danger,
    },
  };
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="App" component={AppDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
