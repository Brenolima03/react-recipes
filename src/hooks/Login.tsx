import { jwtDecode } from "jwt-decode";
import { URL_BASE } from '../config';

type TokenPayload = {
  role: string
  exp: number
  sub: string
}

export async function login(username: string, password: string):
Promise<boolean> {
  try {
    const response = await fetch(`${URL_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: username, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Login failed');
    }

    const responseData = await response.json();
    const token = responseData.token;

    if (token) {
      localStorage.setItem('authToken', token);

      const decoded = jwtDecode<TokenPayload>(token);
      localStorage.setItem('userRole', decoded.role);

      return true;
    } else {
      throw new Error('Authentication token missing');
    }

  } catch (err: any) {
    console.error('Login error:', err);
    return false;
  }
}

export function isLoggedIn(): boolean {
  return localStorage.getItem('authToken') !== null;
}

export function isUserAdmin(): boolean {
  return localStorage.getItem('userRole') === 'ADMIN';
}

export function logout(): void {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
}
