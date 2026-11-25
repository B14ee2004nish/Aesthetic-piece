// Edge & Node compatible HMAC-SHA256 session token utilities using Web Crypto API

export const ADMIN_COOKIE_NAME = 'ap_admin_session';

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    `${process.env.ADMIN_EMAIL || 'admin'}:${process.env.ADMIN_PASSWORD || 'aesthetic-piece-secret'}`
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(base64Url: string): Uint8Array {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const secretBytes = encoder.encode(getSessionSecret());
  return globalThis.crypto.subtle.importKey(
    'raw',
    secretBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signAdminSession(email: string): Promise<string> {
  const encoder = new TextEncoder();
  const payload = JSON.stringify({
    email,
    exp: Date.now() + SESSION_DURATION_MS,
  });
  const payloadEncoded = toBase64Url(encoder.encode(payload));
  const key = await getHmacKey();
  const signatureBuffer = await globalThis.crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payloadEncoded)
  );
  const signatureEncoded = toBase64Url(new Uint8Array(signatureBuffer));
  return `${payloadEncoded}.${signatureEncoded}`;
}

export async function verifyAdminSession(
  token: string | undefined | null
): Promise<{ email: string } | null> {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadEncoded, signatureEncoded] = parts;
  if (!payloadEncoded || !signatureEncoded) return null;

  try {
    const encoder = new TextEncoder();
    const key = await getHmacKey();
    const signatureBytes = fromBase64Url(signatureEncoded);
    const isValid = await globalThis.crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes.buffer as ArrayBuffer,
      encoder.encode(payloadEncoded)
    );

    if (!isValid) return null;

    const payloadBytes = fromBase64Url(payloadEncoded);
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes));

    if (!payload?.email || typeof payload.exp !== 'number' || payload.exp < Date.now()) {
      return null;
    }

    return { email: payload.email };
  } catch {
    return null;
  }
}
