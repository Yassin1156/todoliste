import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import TodosScreen from "../screens/TodoScreen";

import { getToken } from "../auth/tokenStorage";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

/* ================= AUTH CONTEXT ================= */

type AuthContextType = {
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthContext");
  }
  return ctx;
}

/* ================= NAVIGATOR ================= */

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function init() {
      const token = await getToken();
      setAuthenticated(!!token);
      setLoading(false);
    }
    init();
  }, []);

  const authContextValue: AuthContextType = {
    login: () => setAuthenticated(true),
    logout: () => setAuthenticated(false),
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator>
          {!authenticated ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Projects"
                component={ProjectsScreen}
                options={{ title: "Projekte" }}
              />
              <Stack.Screen
                name="Todos"
                component={TodosScreen}
                options={({ route }) => ({
                  title: route.params.projectName,
                })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
