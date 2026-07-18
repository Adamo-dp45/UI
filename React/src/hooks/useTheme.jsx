import { createContext, useContext, useState } from "react"

// On l'utilise aussi pour les système de traduction, authentification

// export const ThemeContext = createContext('light') // Use dans Button
const ThemeContext = createContext({ // Recommandé de ne pas exporter le context en lui même mais de créer un hook pour consomer le context
    theme: 'light',
    toggleTheme: () => {}
})

export function useTheme() {
    // return useContext(ThemeContext) -- Ou
    const {theme, toggleTheme} = useContext(ThemeContext)
    return {
        isLight: theme === 'light',
        isDark: theme === 'dark',
        theme,
        toggleTheme
    }
}

// Pour ne pas rerendre les composants à chaque changement de thème
export function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return <ThemeContext.Provider value={{ // Génèra un nouvel objet à chaque fois que le context change, On peut aussi le mémoriser
        theme: theme,
        toggleTheme // Comme ça on vas pouvoir changer les thème n'importe ou sans le bouton en bas
    }}>
        <button onClick={toggleTheme}>Changer de thème</button>
        {children}
    </ThemeContext.Provider>
} // <ThemeContext.Provider value={theme}>

// Tous les éléments qui consoment le context au travers du useContext, dès que le context change ils vont être rerendu

// -- Si on choisi de remonter ce provider dans le main.jsx sur notre App, Lui il est rendu qu'une fois, l'avantage est qu'on a plus besoin de mémoriser -- //