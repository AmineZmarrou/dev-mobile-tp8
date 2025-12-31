import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NativeFeaturesScreen from "../screens/NativeFeaturesScreen";
import CameraScreen from "../screens/CameraScreen";
import LocationScreen from "../screens/LocationScreen";
import ContactsScreen from "../screens/ContactsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
const Stack = createNativeStackNavigator();
export default function NativeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Fonctionnalites" component={NativeFeaturesScreen} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Localisation" component={LocationScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
