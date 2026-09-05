import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from './colors';

const ThemeContext = createContext();

const STORAGE_KEY = 'app-theme-mode';
const VALID_MODES = ['light', 'dark', 'default'];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default'); // 'light' | 'dark' | 'default'
  const [systemScheme, setSystemScheme] = useState(Appearance.getColorScheme());

  // Restore the mode the user picked during onboarding (or Settings)
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (VALID_MODES.includes(saved)) setTheme(saved);
      })
      .catch(() => {});
  }, []);

  // Track the device appearance so 'default' mode follows the system
  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => setSystemScheme(colorScheme));
    return () => sub.remove();
  }, []);

  const resolvedTheme = theme === 'default'
    ? (systemScheme === 'dark' ? 'dark' : 'light')
    : theme;

  const colors = resolvedTheme === 'dark' ? darkColors : lightColors;
  const isDark = resolvedTheme === 'dark';

  const setMode = (mode) => {
    if (!VALID_MODES.includes(mode)) return;
    setTheme(mode);
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'default' : 'light';
    setMode(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, isDark, colors, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
