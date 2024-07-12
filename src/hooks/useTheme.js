import { useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

const useTheme = () => {
  const { theme, setTheme, systemTheme } = useNextTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return {
    theme,
    setTheme,
    systemTheme,
    toggleTheme,
  };
};

export default useTheme;