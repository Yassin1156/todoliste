import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
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
      const token = res.data.token ?? res.data.accessToken;

      if (!token) {
        Alert.alert("Fehler", "Kein Token erhalten");
        return;
      }

      await saveToken(token);
      Alert.alert("Login", "Erfolgreich eingeloggt!");
      // Navigation übernimmt AppNavigator automatisch
    } catch (error) {
      Alert.alert("Fehler", "Login fehlgeschlagen");
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
      <Button
        title="Registrieren"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", gap: 12 },
  title: { fontSize: 26, fontWeight: "600", textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 12 },
});
