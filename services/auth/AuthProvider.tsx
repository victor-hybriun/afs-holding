import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login } from "./auth.service";
import {
  getActiveUserEmail,
  getActiveUserTokens,
  getTokensForUser,
  saveTokensForUser,
  setActiveUser,
} from "./token.storage";
import { isTokenValid } from "./token.utils";

type AuthContextType = {
  authenticated: boolean;
  loading: boolean;
  error: string | null;
  activeEmail: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  switchUser: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const email = await getActiveUserEmail();
        setActiveEmail(email ?? null);

        const bundle = await getActiveUserTokens();
        if (bundle && isTokenValid(bundle.expiration)) {
          setAuthenticated(true);
        } else {
          await setActiveUser(null);
          setAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const key = email.toLowerCase();
      const existing = await getTokensForUser(key);
      if (existing && isTokenValid(existing.expiration)) {
        await setActiveUser(key);
        setActiveEmail(key);
        setAuthenticated(true);
        return;
      }
      const res = await login({ email, password });
      if (!res?.success || !res?.obj?.jwtToken) {
        throw new Error(res?.message || "Credenciais inválidas.");
      }
      const { jwtToken, refreshToken, expiration } = res.obj;
      await saveTokensForUser(key, {
        access: jwtToken,
        refresh: refreshToken,
        expiration,
      });
      await setActiveUser(key);
      setActiveEmail(key);
      setAuthenticated(true);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao autenticar.");
      setAuthenticated(false);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await setActiveUser(null);
    setActiveEmail(null);
    setAuthenticated(false);
  };

  const switchUser = async (email: string) => {
    const bundle = await getTokensForUser(email);
    if (bundle && isTokenValid(bundle.expiration)) {
      await setActiveUser(email);
      setActiveEmail(email);
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      setActiveUser(null);
      setActiveEmail(null);
      throw new Error("Sessão expirada para este usuário. Faça login.");
    }
  };

  const value = useMemo(
    () => ({
      authenticated,
      loading,
      error,
      activeEmail,
      signIn,
      signOut,
      switchUser,
    }),
    [authenticated, loading, error, activeEmail]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
