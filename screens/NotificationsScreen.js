import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Constants from "expo-constants";
import AppBar from "../components/AppBar";

const isExpoGo = Constants.appOwnership === "expo";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    if (isExpoGo) {
      return;
    }

    let isMounted = true;

    (async () => {
      const mod = await import("expo-notifications");
      if (!isMounted) {
        return;
      }
      mod.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      setNotifications(mod);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const requestPermission = async () => {
    if (!notifications) {
      alert("Notifications are disabled in Expo Go. Use a dev build.");
      return;
    }
    const { status } = await notifications.requestPermissionsAsync();
    alert(status === "granted" ? "Permission accordee" : "Permission refusee");
  };

  const sendTestNotification = async () => {
    if (!notifications) {
      alert("Notifications are disabled in Expo Go. Use a dev build.");
      return;
    }
    await notifications.scheduleNotificationAsync({
      content: {
        title: "Notification locale",
        body: "Ceci est une notification locale de test",
      },
      trigger: null,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Notifications" back />
      <View style={styles.container}>
        <Text style={styles.title}>Gestion des notifications locales</Text>
        {isExpoGo ? (
          <Text style={styles.warning}>
            Notifications are disabled in Expo Go. Use a dev build.
          </Text>
        ) : null}
        <Button title="Demander permission" onPress={requestPermission} />
        <View style={styles.spacer} />
        <Button title="Notification immediate" onPress={sendTestNotification} />
        <View style={styles.spacer} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  warning: {
    marginBottom: 16,
    color: "#b00020",
    textAlign: "center",
  },
  spacer: {
    height: 15,
  },
});
