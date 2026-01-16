import axios from "axios";
import { ENV } from "../config/env";
import { loadToken } from "../auth/tokenStorage";

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await loadToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
