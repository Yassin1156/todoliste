import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Todos">;

type Todo = {
  id: string;
  content: string;
  done: boolean;
};

export default function TodosScreen({ route, navigation }: Props) {
  const { projectId, projectName } = route.params;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: projectName });
    fetchTodos();
  }, [projectId]);

  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos", {
        params: { projectId },
      });
      setTodos(res.data);
    } catch {
      Alert.alert("Fehler", "Todos konnten nicht geladen werden");
    } finally {
      setLoading(false);
    }
  };

const addTodo = async () => {
  if (!todoText.trim()) return;

  try {
    const res = await api.post("/todos", {
      content: todoText.trim(),   // ⬅️ NICHT content
      projectId,
      deadline: 3432832000000, // Beispiel-Deadline in der Zukunft
    });

    setTodos((prev) => [...prev, res.data]);
    setTodoText("");
  } catch (error) {
    Alert.alert("Fehler", "Todo konnte nicht erstellt werden");
  }
};

  const toggleTodo = async (todo: Todo) => {
    try {
      const res = await api.put(`/todos/${todo.id}`, {
        done: !todo.done,
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? res.data : t))
      );
    } catch {
      Alert.alert("Fehler", "Todo konnte nicht aktualisiert werden");
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      await api.delete(`/todos/${todoId}`);
      setTodos((prev) => prev.filter((t) => t.id !== todoId));
    } catch {
      Alert.alert("Fehler", "Todo konnte nicht gelöscht werden");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Lade Todos…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Eingabe */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Neue Aufgabe"
          value={todoText}
          onChangeText={setTodoText}
        />
        <Button title="+" onPress={addTodo} />
      </View>

      {/* Todo-Liste */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <Pressable
              style={styles.checkbox}
              onPress={() => toggleTodo(item)}
            >
              <Text>{item.done ? "☑️" : "⬜️"}</Text>
            </Pressable>

            <Text
              style={[
                styles.todoText,
                item.done && styles.todoDone,
              ]}
            >
              {item.content}
            </Text>

            <Pressable onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>✖</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>Keine Todos vorhanden</Text>}
      />

      {/* Projekt wechseln */}
      <View style={styles.footer}>
        <Button
          title="Projekt wechseln"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  todoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    gap: 10,
  },
  checkbox: {
    width: 30,
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  todoDone: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  delete: {
    color: "red",
    fontSize: 16,
    paddingHorizontal: 6,
  },
  footer: {
    paddingTop: 12,
    paddingBottom: 24,
  },
});
