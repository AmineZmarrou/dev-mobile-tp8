import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NativeStack from "./NativeStack";
import { ThemeContext } from "../context/ThemeContext";
const Drawer = createDrawerNavigator();
export default function AppDrawer() {
  const { theme } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.surface },
        headerTitleStyle: { color: theme.text },
        headerTintColor: theme.text,
        drawerStyle: { backgroundColor: theme.surface },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.textMuted,
        drawerActiveBackgroundColor: theme.background,
        sceneContainerStyle: { backgroundColor: theme.background },
      }}
    >
      <Drawer.Screen name="Mes taches" component={HomeScreen} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
      <Drawer.Screen
        name="Fonctionnalites natives"
        component={NativeStack}
      />
    </Drawer.Navigator>
  );
}
