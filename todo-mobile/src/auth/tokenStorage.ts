import AsyncStorage from "@react-native-async-storage/async-storage";


export async function saveToken(token: string) {
  await AsyncStorage.setItem('token', token);
}

export async function loadToken() {
  return AsyncStorage.getItem('token');
}

export async function clearToken() {
  await AsyncStorage.removeItem('token');
}
