import { useHashNavigation } from "./hooks/useHashNavigation"
import { ThemeContextProvider } from "./hooks/useTheme.jsx"
import Home from "./blog/Home.jsx"
import Contact from "./blog/Contact.jsx"
import Single from "./blog/Single.jsx"
import NotFound from "./blog/NotFound.jsx"
import { Header } from "./components/Header.jsx"
import { lazy, Suspense, useContext, useState } from "react"

function App() {
    const {page, param} = useHashNavigation()
    const pageContent = getPageContent(page, param)

    return <>
        <p>
            Page "{page}"
        </p>
        <Header page={page} />
        <ThemeContextProvider>
        {pageContent}
        </ThemeContextProvider>
    </>
}
/*
    const [theme, setTheme] = useState('light')
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    <button onClick={toggleTheme}>Changer de thème</button>
    <ThemeContext.Provider value={theme}>{pageContent}</ThemeContext.Provider>

    - Quand on entoure des éléments avec <ThemeContext.Provider value={theme}>, tous les enfants auront la valeur du theme, mais l'inconveniant est que tous mes composants seront rerendu
    - Entourer pageContent d'un ErrorBoundary pour le cas ou le serveur repond avec une erreur et pour ne pas que toute l'application plante

    - {page === 'home' && <Home />}
*/
function getPageContent(page, param) {
    if(page === 'home') {
        return <Home />
    }
    if(page === 'posts') {
        const SingleLazy = lazy(() => import('./blog/Single.jsx'))
        return <Suspense fallback={<h1>Chargement du composant en cours...</h1>}>
            <Single postId={param} />
        </Suspense>
    }
    if(page === 'contact') {
        return <Contact />
    }
    return <NotFound page={page} />
}

export default App