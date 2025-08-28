export function isTokenValid(
  expirationISO: string | null | undefined,
  skewMs = 30_000
): boolean {
  if (!expirationISO) return false;
  const exp = new Date(expirationISO).getTime();
  return Date.now() + skewMs < exp;
}

export function isJwtExpValid(jwt?: string | null, skewSec = 30): boolean {
  if (!jwt) return false;
  const parts = jwt.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    if (!payload?.exp) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return nowSec + skewSec < Number(payload.exp);
  } catch {
    return false;
  }
}
