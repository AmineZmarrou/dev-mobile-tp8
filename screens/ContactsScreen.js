import * as Contacts from "expo-contacts";
import { View, Text, Button, FlatList } from "react-native";
import { useState, useContext } from "react";
import AppBar from "../components/AppBar";
import { ThemeContext } from "../context/ThemeContext";
export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const { theme } = useContext(ThemeContext);
  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") return;
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name],
    });
    setContacts(data);
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AppBar title="Contacts" back />
      <View style={{ padding: 16 }}>
        <Button title="Charger contacts" color={theme.primary} onPress={loadContacts} />
      </View>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Text style={{ color: theme.text, paddingVertical: 8 }}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
}
