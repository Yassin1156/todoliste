import {
  View,
  Text,
  TextInput,
  Button,
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


type Props = NativeStackScreenProps<RootStackParamList, "Projects">;

type Project = {
  id: string;
  name: string;
};

export default function ProjectsScreen({ navigation }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      Alert.alert("Fehler", "Projekte konnten nicht geladen werden");
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Lade Projekte…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Inhalt */}
      <View style={styles.content}>
        <Text style={styles.title}>Deine Projekte</Text>

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Neues Projekt"
            value={projectName}
            onChangeText={setProjectName}
          />
          <Button title="+" onPress={addProject} />
        </View>

        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.projectRow}>
              <Text
                style={styles.projectName}
                onPress={() =>
                  navigation.navigate("Todos", {
                    projectId: item.id,
                    projectName: item.name,
                  })
                }
              >
                {item.name}
              </Text>
              <Button
                title="X"
                color="red"
                onPress={() => deleteProject(item.id)}
              />
            </View>
          )}
          ListEmptyComponent={<Text>Keine Projekte vorhanden</Text>}
        />
      </View>

      {/* Logout etwas höher */}
      <View style={styles.logoutContainer}>
        <Button title="Logout" color="#cc0000" onPress={logoutHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
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
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  projectName: {
    fontSize: 16,
  },
  logoutContainer: {
    paddingTop: 12,
    paddingBottom: 24, // ⬅️ hebt den Button sichtbar an
  },
});
