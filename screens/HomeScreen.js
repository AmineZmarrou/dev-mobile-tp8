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
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  const { theme, toggleTheme, mode } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
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
  const saveTodo = async () => {
    if (!newTodo.trim() || !user) return;
    if (editingTodo) {
      await updateDoc(doc(db, "todos", editingTodo.id), { title: newTodo });
    } else {
      await addDoc(collection(db, "todos"), {
        title: newTodo,
        userId: user.uid,
        createdAt: new Date(),
      });
    }
    setNewTodo("");
    setEditingTodo(null);
    setModalVisible(false);
    loadTodos();
  };
  const startAddTodo = () => {
    setNewTodo("");
    setEditingTodo(null);
    setModalVisible(true);
  };
  const startEditTodo = todo => {
    setNewTodo(todo.title);
    setEditingTodo(todo);
    setModalVisible(true);
  };
  const deleteTodo = async todoId => {
    if (!user) return;
    await deleteDoc(doc(db, "todos", todoId));
    loadTodos();
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: theme.text, fontSize: 26, fontWeight: "bold" }}>
            Mes taches
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={toggleTheme}
              style={{
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.surface,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: theme.text }}>
                {mode === "light" ? "Mode sombre" : "Mode clair"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              style={{
                borderWidth: 1,
                borderColor: theme.danger,
                backgroundColor: theme.surface,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: theme.danger }}>Deconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            marginVertical: 15,
            backgroundColor: theme.primary,
            padding: 12,
            borderRadius: 8,
          }}
          onPress={startAddTodo}
        >
          <Text style={{ color: theme.primaryText, textAlign: "center" }}>
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
                borderWidth: 1,
                borderColor: theme.border,
                padding: 12,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Text style={{ color: theme.text, marginBottom: 8 }}>
                {item.title}
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  onPress={() => startEditTodo(item)}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: theme.primary,
                    backgroundColor: theme.surface,
                  }}
                >
                  <Text style={{ color: theme.primary }}>Modifier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteTodo(item.id)}
                  style={{
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 6,
                    backgroundColor: theme.danger,
                  }}
                >
                  <Text style={{ color: "#fff" }}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.overlay,
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.surface,
              padding: 20,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <Text style={{ color: theme.text, fontSize: 18 }}>
              {editingTodo ? "Modifier la tache" : "Nouvelle tache"}
            </Text>
            <TextInput
              placeholder="Titre de la tache"
              placeholderTextColor={theme.textMuted}
              value={newTodo}
              onChangeText={setNewTodo}
              style={{
                borderWidth: 1,
                borderColor: theme.border,
                marginVertical: 10,
                padding: 10,
                borderRadius: 6,
                backgroundColor: theme.inputBackground,
                color: theme.text,
              }}
            />
            <TouchableOpacity
              onPress={saveTodo}
              style={{
                backgroundColor: theme.primary,
                padding: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: theme.primaryText, textAlign: "center" }}>
                {editingTodo ? "Enregistrer" : "Ajouter"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: theme.textMuted,
                }}
              >
                Annuler
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
