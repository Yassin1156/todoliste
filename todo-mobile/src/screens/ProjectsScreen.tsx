import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { removeToken } from "../auth/tokenStorage";
import { useAuth } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";


type Props = NativeStackScreenProps<RootStackParamList, "Projects">;

type Project = {
  id: string;
  name: string;
};

export default function ProjectsScreen({ navigation }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");



  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      Alert.alert("Fehler", "Projekte konnten nicht geladen werden");
    }
  };

  const addProject = async () => {
    if (!projectName.trim()) return;

    try {
      const res = await api.post("/projects", {
        name: projectName.trim(),
      });
      setProjects((prev) => [...prev, res.data]);
      setProjectName("");
    } catch {
      Alert.alert("Fehler", "Projekt konnte nicht erstellt werden");
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      await api.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch {
      Alert.alert("Fehler", "Projekt konnte nicht gelöscht werden");
    }
  };

const { logout } = useAuth();
  const logoutHandler = async () => {
    await removeToken();
    logout();
  };



   return (
    <View style={styles.container}>
      <Text style={styles.title}>Projekte</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Neues Projekt"
          value={projectName}
          onChangeText={setProjectName}
        />
        <Pressable style={styles.addButton} onPress={addProject}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.projectRow}
            onPress={() =>
              navigation.navigate("Todos", {
                projectId: item.id,
                projectName: item.name,
              })
            }
            onLongPress={() => deleteProject(item.id)}
          >
            <Text style={styles.projectText}>{item.name}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Keine Projekte vorhanden</Text>
        }
      />

      <Pressable style={styles.logout} onPress={logoutHandler}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
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
  projectRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  projectText: {
    color: colors.textPrimary,
    fontSize: 16,
  },
  empty: {
    color: colors.textSecondary,
    marginTop: 20,
  },
  logout: {
    marginBottom: 30,
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "500",
  },
});