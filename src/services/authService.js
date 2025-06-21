const API_BASE = '/api';

function getTokenKey() {
  return 'bp_token';
}

function getUsernameKey() {
  return 'bp_username';
}

/**
 * Register a new user and auto-store the returned JWT and username.
 */
export async function register({ username, email, password }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Registration failed');
  }

  const { token, username: returnedUsername } = await res.json();
  localStorage.setItem(getTokenKey(), token);
  localStorage.setItem(getUsernameKey(), returnedUsername);
  return token;
}

/**
 * Log in an existing user and store the JWT and username.
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

  const { token, username } = await res.json();
  localStorage.setItem(getTokenKey(), token);
  localStorage.setItem(getUsernameKey(), username);
  return token;
}

/**
 * Clear stored JWT and username on logout.
 */
export function logout() {
  localStorage.removeItem(getTokenKey());
  localStorage.removeItem(getUsernameKey());
}

/**
 * Helper to read the JWT for protected calls.
 */
export function getToken() {
  return localStorage.getItem(getTokenKey());
}

/**
 * Helper to read the stored username.
 */
export function getUsername() {
  return localStorage.getItem(getUsernameKey());
}