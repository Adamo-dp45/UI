import { createBrowserRouter, createMemoryRouter, Link, NavLink, Outlet, RouterProvider, useNavigation, useRouteError } from 'react-router-dom'
import { Single } from './Single'
import { Blog } from './Blog'
import { Spinner } from '../../components/Spinner'
/*
    - 'Link' lien en ajax
    - 'NavLink' va fonctionner comme 'Link' avec la particularité de détecter si la page est actif et de rajouter des attributs par défaut qu'on peut personnaliser pour avoir des class spécifiques
        - Par défaut il ajoute les attributs 'aria-current' et 'class: active'

    - Router
        - 'createBrowserRouter' va utiliser l'url du navigateur
        - 'createMemoryRouter' va sauvegarder les informations en mémoire ce qui est utile pour les tests
*/
/*
    const router = createBrowserRouter([
        {
            path: '/',
            element: (<div>
                <h1>Page d'accueil</h1>
                <nav>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>)
        },
        {
            path: '/blog',
            element: (<div>
                <h1>Blog</h1>
                <nav>
                    <NavLink to="/">Accueil</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </nav>
            </div>)
        },
        {
            path: '/blog/:id',
            element: <Single />
        },
        {
            path: '/contact',
            element: (<div>
                <h1>Contactez Nous</h1>
                <nav>
                    <Link to="/">Accueil</Link>
                    <Link to="/blog">Blog</Link>
                </nav>
            </div>)
        }
    ])
*/

// Routes imbriquées --
const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />, // <div><Outlet /></div>
        errorElement: <NotFoundPage />,
        children: [
            {
                path: 'blog',
                element: <div>
                    <aside>
                        <h2>Sidebar</h2>
                    </aside>
                    <main>
                        <Outlet />
                    </main>
                </div>,
                children: [
                    {
                        path: '',
                        element: <Blog />,
                        loader: () => fetch('') // Permet de précharger les données au niveau de la route, si on lui envoi le resultat d'un fecth, il va automatiquement convertir le json
                        /*
                            loader: () => {
                                const posts = fetch('').then(r => r.json())
                                return defer({ -- Defer permet de dire tu peux charger le composant Blog sans attendre le resultat
                                    posts
                                })
                            }
                        */
                    },
                    {
                        path: ':id',
                        element: <Single />
                    }
                ]
            },
            {
                path: 'contact',
                element: <div>Contact</div>
            }
        ]
    }
])

function Root() {
    const {state} = useNavigation() // Permet d'avoir l'état de la navigation

    return <>
        <h1>Router</h1>
        <header>
            <nav>
                <NavLink to="/">Accueil</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </nav>
        </header>
        <div>
            {state === "loading" && <Spinner />}
            <Outlet />
        </div>
    </>
}

function NotFoundPage() {
    const error = useRouteError() // Permet de détecter si une page n'existe pas et aussi de capturer les erreurs survenues dans les compsants

    // Erreur syntaxe : Si on n'a une erreur et que dedans on n'a une clé error j'utilise la méthode toString pour l'afficher sinon je veux que tu affiche l'erreur original
    return <>
        <h1>Erreur 404</h1>
        <p>
            {error?.error?.toString() ?? error?.toString()}
        </p>
    </>
}

function App() {

    return <>
        <hr />
        <RouterProvider router={router} />
        <hr />
    </>
}

export default App