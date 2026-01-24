import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { api } from "../api/client";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { colors } from "../theme/colors";

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
      <View style={styles.card}>
        <Text style={styles.title}>Registration</Text>

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

        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Registrieren</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.link}>
            Schon einen Account?{" "}
            <Text style={styles.linkStrong}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    padding: 14,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: colors.buttonPrimaryText,
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 14,
  },
  linkStrong: {
    color: colors.link,
    fontWeight: "500",
  },
});
