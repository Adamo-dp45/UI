import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // La syntaxe jsx
import UseState from './hookState.jsx' // Permet de définir une valeur réactive et un set pour la changer
import Form from './Form.jsx' // Les formulaires
import Products from './Products.jsx' // Tp produits
import HookUseEffect from './hookEffect.jsx' // Permet d'observer quand une valeur change et faire un traitement
import HookUseMemo from './hookMemo.jsx' // Permet de mémoriser une valeur et de changer cette valeur que lorsqu'une certaine dépendance change
import HookUseRef from './hookRef.jsx' // Permet d'intéragir avec le html mais aussi de conserver des valeurs sans forcement changer l'état et la particularité est qu'il ne fais de rerendu lors du changement de la valeur du ref
import HookPersonal from './hookPersonal.jsx' // Hook personalisé
import HookCallback from './hookCallback.jsx' // Un raccourci de 'useMemo' écrit sans dépendance
import Portail from './utils/Teleport.jsx' // Permet de téléporter nos élément dans des endroits spécifique dans le dom
import HookReducer from './hookReducer.jsx' // Permet de représenter un état complexe qui subi des mutations importantes comme une todolist
import HookContext from './hookContext.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx' // Permet de capturer les erreurs
import Blog from './Blog.jsx' // Tp Blog
import HookSyncExternalStore from './hookSyncExternalStore.jsx'

import Flatpikr from './library/Flatpikr.jsx'
import Slide from './modules/Animation/App.jsx'
import Toast from './modules/Toast/App.jsx'
import { ToastContextProvider } from './modules/Toast/ToastContext.jsx'
// import { ConfirmGlobal } from './modules/Modal/ConfirmGlobal.jsx'
import Auth from './auth/App.jsx'

import Router from './plugins/router/App.jsx'
import Zustand from './plugins/zustand/App.jsx'
import Motion from './plugins/framer-motion/Motion.jsx'
import Query from './plugins/react-query/Query.jsx'
import HookForm from './plugins/react-hook-form/Form.jsx'
import ReloadPrompt from './Prompt.jsx'
import Robot from './robot/Robot.jsx'
import { ConfirmContextProvider } from './modules/Modal/ConfirmContext.jsx'

import Compiler from './Compiler.jsx'
/*
    - Les metadonnées : On utilisais la librairie 'React Helmet' mais maintenant on peut les utilisés directement dans notre code
    - 'use' permet de consomer une 'Promise' à l'intérieur d'un composant et de pouvoir observer son état de progression, peut être aussi utilié pour consomer un context, mais lui on peut l'utiliser suite à une condition
*/

const root = document.getElementById('root')
if(root) {
    createRoot(root).render(
        <StrictMode>
            <ConfirmContextProvider>
                {/* <ConfirmGlobal /> */}
                <ReloadPrompt />
                <HookSyncExternalStore />
                <Router />
                <Slide />
                <Flatpikr />
                <App />
                <UseState />
                <Form />
                <Products />
                <HookUseEffect />
                <HookUseMemo />
                <HookUseRef />
                <HookPersonal />
                <HookCallback />
                <Portail />
                <ErrorBoundary />
                <HookReducer />
                <HookContext />
            </ConfirmContextProvider>
        </StrictMode>
    )
}

const blog = document.querySelector('#blog')
if(blog) {
    createRoot(blog).render(
        <StrictMode>
            <Blog />
        </StrictMode>
    )
} // 'Blog' contient 'Lazy' chargement asyncronne des composants qui sont lourds

const toast = document.querySelector('#toast')
if(toast) {
    createRoot(toast).render(
        <StrictMode>
            <ToastContextProvider>
                <Toast />
            </ToastContextProvider>
        </StrictMode>
    )
}

const motion = document.getElementById('motion')
if(motion) {
    createRoot(motion).render(
        <StrictMode>
            <Motion />
        </StrictMode>
    )
}

const query = document.getElementById('query')
if(query) {
    createRoot(query).render(
        <StrictMode>
            <Query />
        </StrictMode>
    )
}

const zustand = document.getElementById('zustand')
if(zustand) {
    createRoot(zustand).render(
        <StrictMode>
            <Zustand />
        </StrictMode>
    )
}

const hookForm = document.getElementById('form')
if(hookForm) {
    createRoot(hookForm).render(
        <StrictMode>
            <HookForm />
        </StrictMode>
    )
}

const machine = document.getElementById('machine')
if(machine) {
    createRoot(machine).render(
        <StrictMode>
            <Robot title='Hello 1' />
            <Robot title='Hello 2' />
        </StrictMode>
    )
}

const auth = document.getElementById('auth')
if(auth) {
    createRoot(auth).render(
        <StrictMode>
            <Auth />
        </StrictMode>
    )
}

const compiler = document.getElementById('compiler')
if(compiler) {
    createRoot(compiler).render(
        <StrictMode>
            <Compiler />
        </StrictMode>
    )
}