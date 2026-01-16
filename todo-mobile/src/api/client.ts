import axios from "axios";
import { ENV } from "../config/env";
import { getToken } from "../auth/tokenStorage";

export const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Token automatisch anhängen (AUSSER Login/Register)
api.interceptors.request.use(async (config) => {
  if (
    config.url &&
    !config.url.includes("/auth/login") &&
    !config.url.includes("/auth/register")
  ) {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
