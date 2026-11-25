import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface StoredAdminAccount {
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

const ADMIN_FILE_PATH = path.join(process.cwd(), 'data', 'admin-account.json');

function readAdminFile(): StoredAdminAccount | null {
  try {
    if (!fs.existsSync(ADMIN_FILE_PATH)) {
      return null;
    }
    const raw = fs.readFileSync(ADMIN_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<StoredAdminAccount>;
    if (
      typeof parsed.email === 'string' &&
      typeof parsed.passwordHash === 'string' &&
      typeof parsed.salt === 'string'
    ) {
      return {
        email: parsed.email,
        passwordHash: parsed.passwordHash,
        salt: parsed.salt,
        createdAt: parsed.createdAt || new Date().toISOString(),
      };
    }
    return null;
  } catch {
    return null;
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function safeEqualHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Returns true if either a signed-up admin account exists in data/admin-account.json
 * or fallback ADMIN_EMAIL + ADMIN_PASSWORD environment variables are configured.
 */
export function hasAdminAccount(): boolean {
  if (readAdminFile()) return true;
  return Boolean(process.env.ADMIN_EMAIL?.trim() && process.env.ADMIN_PASSWORD);
}

/**
 * Saves the single administrator account locally in data/admin-account.json
 * using a salted scrypt hash. Throws if an account already exists.
 */
export function createSingleAdminAccount(email: string, password: string): StoredAdminAccount {
  if (hasAdminAccount()) {
    throw new Error('An administrator account is already registered.');
  }

  const normalizedEmail = email.trim().toLowerCase();
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const account: StoredAdminAccount = {
    email: normalizedEmail,
    passwordHash,
    salt,
    createdAt: new Date().toISOString(),
  };

  const dir = path.dirname(ADMIN_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(ADMIN_FILE_PATH, JSON.stringify(account, null, 2), 'utf-8');
  return account;
}

/**
 * Verifies submitted credentials against the stored single-admin JSON file
 * (or fallback .env credentials if no JSON file has been created).
 */
export function verifyAdminCredentials(
  email: string,
  password: string
): { valid: boolean; email?: string; configured: boolean } {
  const stored = readAdminFile();
  const normalizedInput = email.trim().toLowerCase();

  if (stored) {
    const emailMatches = normalizedInput === stored.email.toLowerCase();
    const candidateHash = hashPassword(password, stored.salt);
    const passwordMatches = safeEqualHex(candidateHash, stored.passwordHash);
    if (emailMatches && passwordMatches) {
      return { valid: true, email: stored.email, configured: true };
    }
    return { valid: false, configured: true };
  }

  const envEmail = process.env.ADMIN_EMAIL?.trim();
  const envPassword = process.env.ADMIN_PASSWORD;

  if (envEmail && envPassword) {
    const emailMatches = normalizedInput === envEmail.toLowerCase();
    const passwordMatches = password === envPassword;
    if (emailMatches && passwordMatches) {
      return { valid: true, email: envEmail, configured: true };
    }
    return { valid: false, configured: true };
  }

  return { valid: false, configured: false };
}
