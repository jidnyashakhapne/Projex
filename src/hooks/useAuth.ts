import { useState, useCallback } from 'react';
import { LoginPayload, UserRole, User, SignupPayload } from '../types';
import { currentUser } from '../data/mockData';
import { api } from '../services/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await api.login(payload);
    setUser(response.user);
    setIsAuthenticated(true);
    return response.user;
  }, []);

  const demoLogin = useCallback(async (role: UserRole) => {
    let u: User;
    try {
      const response = await api.demoLogin(role);
      u = response.user;
    } catch {
      u = { ...currentUser, role };
    }

    setUser(u);
    setIsAuthenticated(true);
    return u;
  }, []);

  const signup = useCallback(async (payload: SignupPayload) => {
    const response = await api.signup(payload);
    setUser(response.user);
    setIsAuthenticated(true);
    return response.user;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return { user, isAuthenticated, login, demoLogin, signup, logout };
}
