import * as SecureStore from "expo-secure-store";

const ACTIVE_USER = "afs_active_user_memail";
const TOKENS_MAP = "afs_tokens_map";

type TokenBundle = { access: string; refresh: string; expiration: string };
type TokenMap = Record<string, TokenBundle>;

async function readMap(): Promise<TokenMap> {
  const raw = await SecureStore.getItemAsync(TOKENS_MAP);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as TokenMap;
  } catch {
    return {};
  }
}

async function writeMap(map: TokenMap) {
  await SecureStore.setItemAsync(TOKENS_MAP, JSON.stringify(map));
}

export async function saveTokensForUser(email: string, bundle: TokenBundle) {
  const key = email.toLowerCase();
  const map = await readMap();
  map[key] = bundle;
  await writeMap(map);
  await SecureStore.setItemAsync(ACTIVE_USER, key);
}

export async function getTokensForUser(
  email: string
): Promise<TokenBundle | null> {
  const key = email.toLowerCase();
  const map = await readMap();
  return map[key] ?? null;
}

export async function setActiveUser(email: string | null) {
  if (!email) {
    await SecureStore.deleteItemAsync(ACTIVE_USER);
    return;
  }
  await SecureStore.setItemAsync(ACTIVE_USER, email.toLowerCase());
}

export const getActiveUserEmail = () => SecureStore.getItemAsync(ACTIVE_USER);

export async function getActiveUserTokens(): Promise<TokenBundle | null> {
  const email = await getActiveUserEmail();
  if (!email) return null;
  return getTokensForUser(email);
}

export async function removeUserTokens(email: string) {
  const key = email.toLowerCase();
  const map = await readMap();
  delete map[key];
  await writeMap(map);
  const active = await getActiveUserEmail();
  if (active === key) await setActiveUser(null);
}

export async function clearAllTokens() {
  await SecureStore.deleteItemAsync(TOKENS_MAP);
  await SecureStore.deleteItemAsync(ACTIVE_USER);
}
