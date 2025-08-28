import ApiConfig from "@/constants/ApiConfig";
import { getActiveUserTokens } from "@/services/auth/token.storage";
import axios, { AxiosError, AxiosHeaders } from "axios";

export const http = axios.create({
  baseURL: ApiConfig.getApiBaseUrl(),
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.request.use(async (config) => {
  const headers = AxiosHeaders.from(config.headers);

  const active = await getActiveUserTokens();
  const token = active?.access;

  headers.set("Accept", "application/json");
  const isFormData =
    typeof FormData !== "undefined" && config.data instanceof FormData;
  if (!isFormData) headers.set("Content-Type", "application/json");
  else headers.delete("Content-Type");

  if (token) headers.set("Authorization", `Bearer ${token}`);

  config.headers = headers;
  return config;
});
http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<any>) => {
    const status = error.response?.status;
    const msg =
      (error.response?.data as any)?.message ||
      (error.response?.data as any)?.error ||
      error.message;
    const normalized = new Error(
      msg || `Erro de requisição${status ? ` (${status})` : ""}.`
    ) as any;
    normalized.status = status;
    normalized.data = error.response?.data;
    return Promise.reject(normalized);
  }
);
