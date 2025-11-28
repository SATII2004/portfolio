import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from '../services/apiClient';

const AuthContext = createContext(null);

const storageKey = 'portfolio_auth';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const cached = localStorage.getItem(storageKey);
    return cached ? JSON.parse(cached) : { token: null, role: null, username: null };
  });

  const persist = (data) => {
    setAuth(data);
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const clear = () => {
    localStorage.removeItem(storageKey);
    setAuth({ token: null, role: null, username: null });
  };

  const login = async (payload) => {
    const { data } = await axios.post('/auth/login', payload);
    persist(data);
    return data;
  };

  const register = async (payload) => {
    const { data } = await axios.post('/auth/register', payload);
    persist(data);
    return data;
  };

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [auth?.token]);

  const value = useMemo(
    () => ({
      ...auth,
      isAuthenticated: Boolean(auth?.token),
      login,
      register,
      logout: clear,
    }),
    [auth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

