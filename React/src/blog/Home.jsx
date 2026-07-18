import { useDocumentTitle } from "../hooks/useDocumentTitle"
import { useTheme } from "../hooks/useTheme.jsx"
import { useFetch } from "../hooks/useFetch"
import { Spinner } from "../components/Spinner"
import { Card } from "../components/Card"
import { useContext } from "react"

function App() {

    useDocumentTitle('Mon blog')
    const {data, loading, error} = useFetch(`https://jsonplaceholder.typicode.com/posts?_limit=20`, {}) 

    /*
        if(error) { -- On peut utiliser cette approche
            return <Spinner />
        }

        <Alert type="danger">{error.toString()}</Alert>
    */

    // const {theme, toggleTheme} = useContext(ThemeContext) -- Va me donner la valeur de themeContext
    const {theme, toggleTheme} = useTheme()

    const handleTheme = () => {
        document.body.style.backgroundColor = theme === 'light' ? '#000' : '#FFF'
        toggleTheme()
    }

    return <>
        <h1>Mon Blog</h1>
        <p>
            <button onClick={handleTheme}>Thème "{theme}"</button>
        </p>
        {loading && <Spinner />}
        {error && 'Erreur'}
        {data && <div className="row gap-2">
            {data.map((post) => (<div key={post.id} className="col-12 col-md-4">
                <Card
                    image={`https://picsum.photos/id/${post.id}/200/300`}
                    title={post.title}
                    href={`#posts:${post.id}`}
                    description={post.body}
                    buttonLabel={'Voir l\article'}
                />
            </div>))}
        </div>}
    </>
}

export default App