import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/colors";

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


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Neue Aufgabe"
          value={todoText}
          onChangeText={setTodoText}
        />
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.todoRow}
            onPress={() => toggleTodo(item)}
            onLongPress={() => deleteTodo(item.id)}
          >
            <Text
              style={[
                styles.todoText,
                item.done && styles.todoDone,
              ]}
            >
              {item.content}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Keine Todos vorhanden</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 12,
    color: colors.textPrimary,
  },
  addButton: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: 6,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  todoRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  todoText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  todoDone: {
    textDecorationLine: "line-through",
    color: colors.textSecondary,
  },
  empty: {
    color: colors.textSecondary,
    marginTop: 20,
  },
});
