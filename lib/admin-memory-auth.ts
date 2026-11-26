// Pure in-memory session state (no localStorage, no sessionStorage, no cookies).
// Automatically resets on page reload or whenever leaving /admin routes.

let inMemoryAuthenticated = false;
let inMemoryAdminEmail: string | null = null;

export function grantInMemoryAdminSession(email: string): void {
  inMemoryAuthenticated = true;
  inMemoryAdminEmail = email;
}

export function clearInMemoryAdminSession(): void {
  inMemoryAuthenticated = false;
  inMemoryAdminEmail = null;
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem('isAdminAuthenticated');
      window.localStorage.removeItem('adminEmail');
      window.localStorage.removeItem('ap_preview_admin_session');
      window.sessionStorage.removeItem('isAdminAuthenticated');
      window.sessionStorage.removeItem('adminEmail');
    } catch {
      // Ignore storage errors
    }
  }
}

export function getInMemoryAdminSession(): {
  authenticated: boolean;
  email: string | null;
} {
  return {
    authenticated: inMemoryAuthenticated,
    email: inMemoryAdminEmail,
  };
}
