import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { api } from "../api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const addAccount = async () => {
    try {
      const res = await api.post("/auth/register", { userName, password });
      console.log("Erfolgreich registriert:", res.data);

      // entspricht navigate("/") in Web:
      navigation.navigate("Login");
    } catch (error: any) {
      console.log("===== AXIOS ERROR =====");
      console.log("message:", error?.message);
      console.log("code:", error?.code);
      console.log("status:", error?.response?.status);
      console.log("data:", error?.response?.data);
      console.log(
        "url:",
        (error?.config?.baseURL ?? "") + (error?.config?.url ?? "")
      );
      console.log("headers:", error?.config?.headers);
      console.log("=======================");

      Alert.alert(
        "Register Error",
        error?.response?.data?.error ?? error?.message ?? "Unbekannter Fehler"
      );
    } finally {
      setUserName("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>

      <Text style={styles.label}>Benutzername:</Text>
      <TextInput
        style={styles.input}
        placeholder="Bitte den Benutzernamen eingeben"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Passwort:</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Registrieren" onPress={addAccount} />

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Schon einen Account? Dann hier einloggen
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", gap: 12 },
  title: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 12,
  },
  label: { fontSize: 14, opacity: 0.8 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 10 },
  link: { marginTop: 12, textAlign: "center", textDecorationLine: "underline" },
});
