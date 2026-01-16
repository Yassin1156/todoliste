import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { api } from "../api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("/auth/register", { userName, password });
      Alert.alert("Erfolg", "Registrierung abgeschlossen");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Fehler", "Registrierung fehlgeschlagen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrieren</Text>

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

      <Button title="Registrieren" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", gap: 12 },
  title: { fontSize: 26, fontWeight: "600", textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 8, padding: 12 },
});
