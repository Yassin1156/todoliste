import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from "react-native";
import { api } from "../api/client";
import { saveToken } from "../auth/tokenStorage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { userName, password });

      // dein Backend liefert vermutlich token oder accessToken
      const token = res.data.token ?? res.data.accessToken;
      if (token) await saveToken(token);

      Alert.alert("Login", "Erfolgreich eingeloggt!");
      // später navigieren wir hier auf Projects – aber jetzt nur Login/Registration
    } catch (error) {
      console.error("Login Fehler:", error);
      Alert.alert("Fehler", "Login fehlgeschlagen.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Benutzername"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={login} />

      <Pressable onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Noch keinen Account? Registrieren</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", gap: 12 },
  title: { fontSize: 26, fontWeight: "600", textAlign: "center", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 10 },
  link: { marginTop: 12, textAlign: "center", textDecorationLine: "underline" },
});
