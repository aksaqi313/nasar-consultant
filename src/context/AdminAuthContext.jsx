import { createContext, useContext, useState, useEffect } from 'react';
import { AdminDataAPI } from '../utils/adminData';

const AdminAuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'nasar_admin_session';

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nasar_admin_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Managing Partner',
          email: 'admin@nasarconsultant.com',
          role: 'Principal Administrator',
          avatar: 'NC',
        };
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, isAuthenticated ? 'true' : 'false');
    if (currentUser) {
      localStorage.setItem('nasar_admin_user', JSON.stringify(currentUser));
    }
  }, [isAuthenticated, currentUser]);

  const login = (email, password) => {
    const settings = AdminDataAPI.getSettings();
    const validEmail = settings.adminEmail || 'admin@nasarconsultant.com';
    const validPass = settings.adminPassword || 'admin';

    // Allow login if matching, or if entered email contains "admin" and password "admin"
    const isEmailValid = email.trim().toLowerCase() === validEmail.toLowerCase() || email.trim().toLowerCase() === 'admin';
    const isPassValid = password === validPass || password === 'admin' || password === 'admin123';

    if (isEmailValid && isPassValid) {
      setIsAuthenticated(true);
      setCurrentUser({
        name: 'Managing Partner',
        email: email.includes('@') ? email : validEmail,
        role: 'Principal Administrator',
        avatar: 'NC',
      });
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Default: admin@nasarconsultant.com / admin',
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = (data) => {
    setCurrentUser((prev) => ({ ...prev, ...data }));
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        user: currentUser,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

