import { useState } from "react";

const detectColorScheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme) return theme as 'dark' | 'light';

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const theme = detectColorScheme();
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
  });

  const toggleTheme = () => {
    const themeToSet = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', themeToSet);
    document.documentElement.setAttribute('data-theme', themeToSet);
    setTheme(themeToSet)
  }

  return { theme, toggleTheme, setTheme } as const;
}
