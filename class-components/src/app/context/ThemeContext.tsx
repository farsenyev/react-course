import {createContext, useContext, useState} from "react";

const ThemeContext = createContext(null)

interface themeContext {
    theme: string;
    change: () => void
}

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((curr) => (curr == 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme
        }}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) console.error('context error')

    return context;
}