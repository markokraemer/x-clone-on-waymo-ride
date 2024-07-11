import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('x49_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
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
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('x49_user');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('x49_user', JSON.stringify(updatedUserData));
  };

  const updatePreferences = (newPreferences) => {
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...newPreferences,
      },
    };
    setUser(updatedUser);
    localStorage.setItem('x49_user', JSON.stringify(updatedUser));
  };

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