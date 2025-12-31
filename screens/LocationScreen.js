import * as Location from "expo-location";
import { View, Text, Button } from "react-native";
import { useState, useContext } from "react";
import AppBar from "../components/AppBar";
import { ThemeContext } from "../context/ThemeContext";
export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const { theme } = useContext(ThemeContext);
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AppBar title="Localisation" back />
      <View style={{ padding: 16 }}>
        <Button title="Obtenir position" color={theme.primary} onPress={getLocation} />
        {location && (
          <Text style={{ color: theme.text, marginTop: 16 }}>
            Lat: {location.latitude} | Lng: {location.longitude}
          </Text>
        )}
      </View>
    </View>
  );
}
