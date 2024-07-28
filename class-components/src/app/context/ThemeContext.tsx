import React, {createContext, ReactNode, useContext, useState} from 'react';

interface ThemeContextType {
    toggleTheme: () => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps>  = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((curr) => (curr == 'dark' ? 'light' : 'dark'));
  };

    const value = {
        theme,
        toggleTheme
    };

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) console.error('context error');

  return context;
};
