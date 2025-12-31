import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const loadTodos = async () => {
    if (!user) return;
    const snap = await getDocs(
      query(collection(db, "todos"), where("userId", "==", user.uid))
    );
    setTodos(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };
  useEffect(() => {
    loadTodos();
  }, [user]);
  const addTodo = async () => {
    if (!newTodo.trim() || !user) return;
    await addDoc(collection(db, "todos"), {
      title: newTodo,
      userId: user.uid,
      createdAt: new Date(),
    });
    setNewTodo("");
    setModalVisible(false);
    loadTodos();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 16 }}>
        <Text
          style={{ color: theme.text, fontSize: 26, fontWeight: "bold" }}
        >
          Mes taches
        </Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={{ color: theme.primary }}>Changer theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={{ color: "red" }}>Deconnexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginVertical: 15,
            backgroundColor: theme.primary,
            padding: 12,
            borderRadius: 8,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            + Ajouter une tache
          </Text>
        </TouchableOpacity>
        <FlatList
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: theme.card,
                padding: 12,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: theme.text }}>{item.title}</Text>
            </View>
          )}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.background,
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: theme.text, fontSize: 18 }}>Nouvelle tache</Text>
            <TextInput
              placeholder="Titre de la tache"
              value={newTodo}
              onChangeText={setNewTodo}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                marginVertical: 10,
                padding: 10,
                borderRadius: 6,
                color: theme.text,
              }}
            />
            <TouchableOpacity
              onPress={addTodo}
              style={{
                backgroundColor: theme.primary,
                padding: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "#fff", textAlign: "center" }}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
