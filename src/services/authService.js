// All calls to `/api` will be forwarded by CRA to http://localhost:8080
const API_BASE = '/api';

/**
 * Register a new user and auto‐store the returned JWT.
 */
export async function register({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  // On failure, server returns JSON { error: "…"}
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Registration failed');
  }

  // On success, server returns JSON { token: "…" }
  const { token } = await res.json();
  localStorage.setItem('bp_token', token);
  return token;
}

/**
 * Log in an existing user and store the JWT.
 */
export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Login failed');
  }

  const { token } = await res.json();
  localStorage.setItem('bp_token', token);
  return token;
}

/**
 * Clear stored JWT on logout.
 */
export function logout() {
  localStorage.removeItem('bp_token');
}
