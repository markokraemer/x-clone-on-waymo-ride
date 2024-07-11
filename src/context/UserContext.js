import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem('x49_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback((userData) => {
    const newUser = {
      ...userData,
      preferences: {
        notifications: true,
        darkMode: false,
        ...userData.preferences,
      },
    };
    setUser(newUser);
    localStorage.setItem('x49_user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('x49_user');
  }, []);

  const updateUser = useCallback((updatedUserData) => {
    setUser(prevUser => {
      const newUser = { ...prevUser, ...updatedUserData };
      localStorage.setItem('x49_user', JSON.stringify(newUser));
      return newUser;
    });
  }, []);

  const updatePreferences = useCallback((newPreferences) => {
    setUser(prevUser => {
      const updatedUser = {
        ...prevUser,
        preferences: {
          ...prevUser.preferences,
          ...newPreferences,
        },
      };
      localStorage.setItem('x49_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateUser, updatePreferences }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};