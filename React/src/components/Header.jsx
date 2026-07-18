import { useState } from "react"
import { useToggle } from "../hooks/useToggle"
import { activeClassIf } from "../utils/className"

/**
 * 
 * @param {string} page 
 */
export function Header({page}) {
    const [expended, toggleExpended] = useToggle()
    /*
        <button onClick={toggleExpended}></button> -- Bootstrap
        <div className={`${expended ? 'show' : ''}`}></div>
    */

    return <>
        <nav>
            <a href="#" className={activeClassIf(page === "home", 'nav-link')}>Home</a>
            <a href="#contact" className={activeClassIf(page === "contact", 'nav-link')}>Contact</a>
        </nav>
    </>
}

/* - Une autre manière de gérer les class active

    export function Site() {
        const [page, setPage] = useState('home')

    }

    function NavBar({currentPage, onClick}) {
        const navClass = function(page) {
            let className = 'nav-item'
            if(page === currentPage) {
                className = ' active'
            }
            return className
        }

        return <nav className="navbar">
            <ul>
                <li className={navClass('recipes')}>
                    <a href="#recipes" className="nav-link" onClick={() => onClick('recipes')}>Recipes</a>
                </li>
            </ul>
        </nav>
    }
*/