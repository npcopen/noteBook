import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.validateToken(token)
        .then(isValid => {
          if (!isValid) {
            localStorage.removeItem('token');
            setUser(null);
          } else {
            return authService.getUserInfo(token);
          }
        })
        .then(userData => {
          if (userData) {
            setUser(userData);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const { user, token } = await authService.login(username, password);
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  };

  const register = async (userData) => {
    const { user, token } = await authService.register(userData);
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await authService.logout(token);
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 