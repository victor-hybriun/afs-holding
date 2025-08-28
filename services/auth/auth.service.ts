import ApiConfig from "@/constants/ApiConfig";
import { http } from "@/lib/http";
import { LoginPayload, LoginResponse } from "./auth.types";

export async function login(payload: LoginPayload) {
  const { data } = await http.post<LoginResponse>(
    ApiConfig.auth.login(),
    payload
  );
  if (!data?.success || !data?.obj?.jwtToken) {
    const err = new Error(data?.message || "Falha no login.") as any;
    err.statusCode = data?.statusCode;
    throw err;
  }
  return data;
}
