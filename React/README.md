### React `react.dev`

- Extension navigateur `React Dev Tools`
    > Dans paramètre
        > Highlight updates when components render : Permet d'activer le cliontement pour les composants qui sont rerendu
        > Append components stacks to console warnings and errors : Permet d'avoir plus d'informations en cas d'erreur
    > Dans profiler
        > Record why each component rendered while .. : Permet de savoir le pourquoi un composant à été rerendu dans la partie profiler
    > L'onglet profiler permet d'observer les performences : On enregistre et on fais notre action ensuite on l'arrête

- Pour faire du rendu côté serveur `SSR`
    > npm i react-dom, -D esbuild, -D nodemon, koa



coss.ui similaire à shacn et basé sur base.ui crée par les fondateurs de radix.ui mais sont en beta


react.email : Pour react et next




- **Important !**
    > La plutpart des attributs html seront du camelCase mis à part les `aria-` et `data-`, toutes les balises doivent être fermé ou autofermante, le html est automatiquement échapper
    > `React` et `ReactDOM` : La différence est que react permet de représenter les composants qui vont renvoyer des noeuds jsx et reactdom permet de bracher les composants react a son dom
    > On ne peut pas faire de mutation javascript dans le cardre de react, on ne peut pas mettre un hook dans une condition ou boucle
    > Dès qu'on rend un composant parent tous les composants enfants sont rerendu sauf si on utilise la mémorisation avec `memo` qui permet de créer un composant mémorisé qui ne sera rerendu que lorsque ses propriétés changent mais peut ne pas être suffisant si le composant prend en param une fonction qui change au rerendu du parent donc on doit utiliser un `useCallback` sur la fonction pour créer une version qui ne change pas entre chaque rerendu

- **Compiler** - Le principe est d'avoir un code qui va être généré en sortie plus optimisé pour permettre aux développeurs ne plus utilisés les `useMemo`, `useCallback`.. et de mémoriser les composants pour optimiser les rendus
    > Pour l'activer on doit modifier la configuration `vite.config.js` en activant le plugin `babel-plugin-react-compiler` ou le faire lors de la création d'un nouveau projet `JavaScript + React Compiler`, ensuite on pourra utiliser notre code sans le principe de mémorisation
    > Ce système a un impact assez important sur le poids du fichier car il va faire des conditions et des boucles, pour le désactiver sur un compoant on utilise `use no memo` à l'intérieur, on peut faire en sorte que le `compiler` ne mémorise pas par défaut et ensuite utilisé `use memo` dans nos composants pour indiquer ce qu'il doit mémoriser, doc

**Package**
- React Router `reactrouter.com`, `reach.tech/router` : Un routeur pour react
    > npm install react-router-dom
        > On doit d'abord faire que toutes nos url mènent à un seule fichier `index.html` ensuite le router va prendre le relai `src/plugins/router`
    > npm install @reach/router
- Hooks `usehooks.com`, `github.com/streamich/react-use` : Un site pour des hooks personnalisés
    > npm i @uidotdev/usehooks
    > npm i react-use
    > useHooks ts : !! en typescript
- Store gloable `zustand-demo.pmnd.rs`, `redux.js.org`, `jotai.org/docs` : Permet d'avoir une valeur qui va être partager entre plusieurs composants et quand cette valeur change tous les composants sont rerendu
    > npm i zustand
    > npm install redux
    > npm i jotai
- Tanstack `tanstack.com`: Permet de gérer la syncronisation de nos données avec le serveur, va être comme un store global qui raffraichi nos données quand c'est nécéssaire
    > npm install @tanstack/react-query
- Animation `motion.dev`, `react-spring.dev`, `react-transition-group`
    > npm install motion
    > npm i @react-spring/web
    > npm i react-transition-group
    > npm install react-flip-toolkit : Une animation flip
- React Hook Form `react-hook-form.com` : Permet de gérer les formulaires
    > npm install react-hook-form
- Prop Types : Permet de valider les propriétés reçu par un composant et en cas d'erreur il sera affiché en console
    > npm install --save prop-types
- Eslint React `eslint-react.xyz`
    > npm install --save-dev globals eslint @eslint/js @eslint-react/eslint-plugin
    > npm install --save-dev typescript-eslint @eslint-react/eslint-plugin : !! avec typescript
- Babel react `react.dev/learn/react-compiler/installation`, `babeljs.io/docs/babel-preset-react`
    > npm install -D babel-plugin-react-compiler@latest
    > npm install --save-dev @babel/preset-react
    > On ajoute le *"presets": ["@babel/preset-react"]* à la configuration de babel
- Remotion `remotion.dev` : Permet de créer des vidéos à partir de react

**Framework**
- Next `nextjs.org` : Un framework react avec rendu côté serveur `SSR` Server Side Rendering, `SSG` Static Site Generation et api routes
    > npx create-next-app@latest
    > La structure
        > `page.js` : L'index
    > Quand on fais `npm run build`, va nous expliquer ce qu'il a compilé et le type de rendu qu'il a utilisé, il va créer un dossier `.next` et si on veut exporter notre projet `npx next export` - [nextjs.org/docs/app/building-your-application/deploying/static-exports], va créer un dossier `out`
- Remix `remix.run` : Un framework react
    > npx create-remix@latest
- Gatsby `gatsbyjs.com` : !! qui fais du rendu static html et le client va se rajouter dessus pour faire de la logique
    > npm install -g gatsby-cli
- Blitz.js `blitzjs.com` : Un framework basé sur next.js, `Rails-like` pour react et simplifie le développement fullstack
    > yarn global add blitz

- Praect `preactjs.com` : Une alternative plus légère à react
    > npm install @preact/preset-vite --save-dev
    > On modifie ensuite `vite.config.js` pour ajouter le plugin `@preact/preset-vite` ou avec vite

**Tests**
- npm install --save-dev @testing-library/react @testing-library/dom jsdom vitest
- npm run test : Pour lancer les tests
- npm install -D @testing-library/user-event

**Bibliothèques de composants**
- radix-ui.com, ariakit.org, base-ui.com, headlessui.com : Composant sans style
    > npm install @radix-ui/themes
        > import '@radix-ui/themes/styles.css'
    > npm install @ariakit/react
    > npm i @base-ui-components/react
    > npm install @headlessui/react@latest
        > npm install @headlessui/tailwindcss : !! si tailwind
- Shadcn `ui.shadcn.com` : La particularité est qu'il va importer le code du composant dans notre application ce qui permet une personnalisation du composant plus poussé, fonctionne avec `tailwindcss`, `typescript` et `radixui` ou `baseui`
    > Pour l'installation avec `vite`, doc
    > Les packages
        > `tweakcn.com` permet de générer ou utiliser des thèmes préconçu pour tailwind dans shadcn
        > `github.com/birobirobiro/awesome-shadcn-ui` un dépôt qui liste tous les packages intérèssant pour shadcn
        > `originui.com` permet d'utiliser d'autres composants en plus de ceux de shadcn
        > `21st.dev` un site collaboratif de composants shadcn comme universe
        > `shadcn-vue.com` permet d'utiliser les même composants mais avec vue
        > `creative-tim.com` une collection d'interface utilisateur pour shadcn
- chakra-ui.com
    > npm i @chakra-ui/react @emotion/react
- primereact.org
- mantine.dev
- reactspectrum.blob.core.windows.net
    > npm install react-aria-components
- react-spectrum.adobe.com : Un design de system complet développé par Adobe
    > yarn add @adobe/react-spectrum
- ant.design
    > npm install antd --save
- shoelace.style : Un framework basé sur web component
    > npm install @shoelace-style/shoelace shoelace.style
- mui.com : Pour google material design
    > npm install @mui/material @emotion/react @emotion/styled

- reactbits.dev : Pour des composants animés


**Plugin Vite PWA** - Permet de faire en sorte que nos application crée avec vite se comporte comme des pwa
- Existant : `npm i -D vite-plugin-pwa` et modifier `vite.config.js`
    > npm run build : On vas voir qu'il a crée plus de fichiers comme `sw.js` qui va service de Service worker
    > npm run preview : Pour voir la version build, on vas remarqué que qaund on vas couper notre serveur la page continuera à fonctionner, car il a été mis en cache par le service worker, on peut le vider dans `l'inspecteur - Cache Storage`

- Pour prendre en compte les mises à jour, dans `vite.config.js` - `registerType` si on a mis `prompt`
    > On vas dans la documentation de vite pwa - framework - react et on copie le code du prompt, après cours lorsqu'il y aura une mise à jour il va me demander si je veut l'appliquer et le composant prompt doit être à la racine de notre projet

- *Quand le serveur est couper les assets(png, svg ..) ne fonctionne pas, dans vite.config.js - workbox - globPatterns* - *Charger les ressoucres distants (cdn, images ..), dans vite.config.js - workbox - runtimeCaching* - *Pour plus d'infos, doc de workbox build pour voir comment fonctionne le runtimeCaching*

- Nouveau : `npm create @vite-pwa/pwa`
    `PWA Name` : Nom pour notre pwa
    `PWA Short Name`: Lorsqu'on installe l'application sur un téléphone, permet d'avoir des descriptions
    `Theme color` : Couleur utilisée pour le thème, suivant les système d'exploitation, permet de changer la couleur de la barre mais aussi du fond de l'icon
    `Select a strategy` :
        `generateSW` : Génère un fichier sw.js, option par défaut
        `injectManifest` : Utile quand on déjà un fichier sw.js, alors on ajoutera dans lignes dans fichiers, voir doc pwa
    `Select a behavior` :
        `Prompt for update` : L'utilisateur choisi de mettre à jour
        `Auto update` : Dès lors que la page est actualisée
    `Enable periodic SW updates` : On peut choisir d'avoir des mises à jour périodiques, on va mettre *No*, mais par exemple ça peut véifier à un interval de temps s'il n'y a pas de mises à jour du service worker pendant que l'utilisateur est en train de naviguer
    `Show offline ready prompt` : Est ce qu'on montre le prompt quand on n'est prêt à fonctionner offline, on n'a mis *No*
    `Generate PWA Assets Icons on the fly` : Est ce qu'on générer les assets d'icon à la volé, Intérèssant si notre application est installable, va permettre de génerer toutes les icones qui peuvent servir au différentes système d'exploitation


## Issues

- L'erreur `Can perform a React state update on an unmounted component..` apparaît lorsqu'on fais un changement d'état sur un composant qui a été retiré, ça arrive souvent quand on fais des requêtes réseaux en chargant un article, on n'attend pas le retour et qu'on quitte la page - voir `public/img`
    > Sol 1 : On évite de mettre à jour l'état du composant s'il a été démonté en utilisant un `useRef`, on a crée un `useSafeState` qui est un `useState` et permet d'être appelé même quand le composant est démonté
    > Sol 2 : On utilise un `AbortController` au niveau de `fetch` qui permet d'annuler une requête









sonner.emilkowal.ski : le meileur toats, shadcn l'utilise aussi
react-hot-toast.com : Un des meilleurs toats react
21st.dev : Un collection d'interface faite avec shadcn
tanstackquery : système de cache query
yup, zod, joi, valibot : Pour la validation des champs
react hook form, tanstack/react-form
next.js pour le backend
    - Better-Auth
    - playwright, cypress : pour les tests
react-email : Pour formater un email avec des composants react
https://github.com/chentsulin/awesome-react-renderer : Liste tous ce qu'on peut faire avec react





Le SWC (Speedy Web Compiler) est un compilateur ultra-rapide écrit en Rust. Lors de l'installation d'un projet React (notamment avec Vite ou Next.js), il sert d'alternative moderne à Babel pour transformer votre code JavaScript/TypeScript et JSX en code lisible par les navigateurs. 

Voici l'essentiel à savoir :
Vitesse extrême : Il est environ 20 fois plus rapide que Babel sur un seul cœur et jusqu'à 70 fois plus rapide sur plusieurs cœurs.
Utilisation par défaut : Il est le compilateur standard de Next.js (depuis la v12) et une option recommandée lors de la création d'un projet avec le build tool Vite (option React + SWC).
Bénéfices : Il accélère considérablement le temps de démarrage du serveur de développement et le temps de build final de votre application.
Compatibilité : Bien que très performant, il peut ne pas supporter certains plugins Babel très spécifiques ou anciens, bien que la plupart des fonctionnalités standards de React soient couvertes.





Attention onClick={handleClick} pas de () sinon la fonction sera exécuter au chargement de la page
/* - prop-types
    function Double({n}) {}
    Double.propTypes = {
        n: PropTypes.number.isRequired
    }
*/





### Typescript & React `@types/react` - Tailwind

- npm install next-themes : Pour le dark mode
    > ui.shadcn.com/docs/dark-mode/next

- 
    > Dans la configuration `tsconfig.json` ici `tsconfig.app.json` la seule chose spécifique à `React` est la partie `"jsx": "react-jsx"`
    > Pour initialiser une librairie `js` externe on doit utiliser `useEffect` pour que le `dom` soit monté avant
    > Si le type d'une librairie n'est pas inclus on peut l'installer
        > npm install --save-dev @types/easymde
- 








### Option 3 — fetch propre avec un client générique (recommandé pour la plupart des projets)

Créez un wrapper autour de `fetch` qui gère les conventions API Platform :

```ts
// lib/apiClient.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost/api';

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Accept':       'application/ld+json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new ApiError(res.status, error['hydra:description'] ?? 'Erreur inconnue');
  }

  return res.json();
}

// Récupérer une collection
export async function fetchCollection<T>(path: string): Promise<{ items: T[]; total: number }> {
  const data = await apiFetch<any>(path);
  return {
    items: data['hydra:member'],
    total: data['hydra:totalItems'],
  };
}

// Récupérer une ressource unique
export async function fetchOne<T>(path: string): Promise<T> {
  return apiFetch<T>(path);
}

// Créer
export async function create<T>(path: string, body: Partial<T>): Promise<T> {
  return apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

// Mettre à jour (PATCH est le verbe recommandé avec API Platform 3)
export async function update<T>(iri: string, body: Partial<T>): Promise<T> {
  return apiFetch<T>(iri, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/merge-patch+json' },
  });
}

// Supprimer
export async function remove(iri: string): Promise<void> {
  await apiFetch<void>(iri, { method: 'DELETE' });
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
```

Un détail important : pour les **PATCH**, API Platform 3 attend le content-type `application/merge-patch+json`, pas `application/ld+json`.

---

## Gérer les IRI comme identifiants

API Platform utilise des **IRI** (ex. `/api/products/5`) comme identifiants, pas des entiers bruts. En pratique :

```ts
// Extraire l'id numérique depuis l'IRI si besoin
const getId = (iri: string) => iri.split('/').pop();

// Utiliser l'IRI directement pour les relations
await create('/api/orders', {
  product: '/api/products/5',   // ← IRI, pas l'entier 5
  quantity: 2,
});
```








Bonne question ! Les **Custom Elements** (Web Components) ont quelques subtilités avec TypeScript/TSX. Voici comment les utiliser.

---

### 1. Définir ton Custom Element

```ts
// assets/elements/MyElement.ts
class MyElement extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<p>Hello depuis un Web Component</p>`
    }

    // Attributs observés
    static get observedAttributes() {
        return ['name', 'color']
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(`${name} changed: ${oldValue} → ${newValue}`)
    }
}

customElements.define('my-element', MyElement)
```

---

### 2. Déclarer le type pour TSX

Sans cette étape, TypeScript va crier car il ne connaît pas `<my-element>` :

```ts
// assets/types/custom-elements.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        'my-element': React.DetailedHTMLProps
            React.HTMLAttributes<HTMLElement> & {
                name?: string   // 👈 tes attributs custom
                color?: string
            },
            HTMLElement
        >
    }
}
```

---

### 3. L'utiliser dans un fichier TSX

```tsx
// assets/react/controllers/MyComponent.tsx
import '../../elements/MyElement' // 👈 importer pour enregistrer le custom element

export default function MyComponent() {
    return (
        <div>
            {/* ✅ TypeScript connaît maintenant <my-element> */}
            <my-element name="John" color="blue" />
        </div>
    )
}
```

---

### 4. Interagir avec le Custom Element via `useRef`

```tsx
import { useEffect, useRef } from 'react'
import '../../elements/MyElement'

export default function MyComponent() {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        // Accéder aux méthodes du custom element
        const el = ref.current as HTMLElement & { myMethod: () => void }
        el.myMethod?.()
    }, [])

    return <my-element ref={ref} name="John" />
}
```

---

### 5. Passer des objets/fonctions avec `useRef` (limitation des attributs)

Les attributs HTML ne supportent que les **strings**. Pour passer des objets ou callbacks, utilise une ref :

```tsx
import { useEffect, useRef } from 'react'

export default function MyComponent() {
    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) return

        // 👇 Passer des données complexes via propriétés JS
        const el = ref.current as any
        el.data = { name: 'John', items: [1, 2, 3] }
        el.onAction = (e: CustomEvent) => console.log(e.detail)
    }, [])

    return <my-element ref={ref} />
}
```

---

### Résumé

| Besoin | Solution |
|---|---|
| Éviter les erreurs TS | Déclarer dans `JSX.IntrinsicElements` |
| Passer des strings | Attributs HTML classiques |
| Passer des objets/fonctions | `ref.current.maPropriété` via `useEffect` |
| Accéder aux méthodes | Cast `ref.current as HTMLElement & { ... }` |

Le fichier `custom-elements.d.ts` est la clé — sans lui TypeScript ne reconnaît pas tes balises custom.









Voici les choses importantes et spécifiques à TSX que tu dois connaître :

---

### 1. Les génériques dans TSX

Le `<T>` seul est ambigu avec JSX, il faut une virgule ou une contrainte :

```tsx
// ❌ TypeScript confond avec une balise JSX
const identity = <T>(value: T) => value

// ✅ Ajouter une virgule
const identity = <T,>(value: T) => value

// ✅ Ou contraindre le type
const identity = <T extends unknown>(value: T) => value
```

---

### 2. Typer les props correctement

```tsx
// ✅ Avec interface
interface ButtonProps {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'  // union type
    children?: React.ReactNode          // tout ce que React peut rendre
    style?: React.CSSProperties         // objet style inline
}

// ✅ Avec type (préférable pour les props)
type ButtonProps = {
    label: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> // 👈 hériter des attributs HTML natifs
```

---

### 3. Typer les événements

```tsx
// ❌ Trop générique
const handleChange = (e: Event) => {}

// ✅ Types précis selon l'élément
const handleClick  = (e: React.MouseEvent<HTMLButtonElement>) => {}
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault() }
const handleKeyUp  = (e: React.KeyboardEvent<HTMLInputElement>) => {}
```

---

### 4. Typer `useState`

```tsx
// TypeScript infère automatiquement quand c'est possible
const [count, setCount] = useState(0)          // number inféré
const [name, setName]   = useState('')         // string inféré

// Typer explicitement quand nécessaire
const [user, setUser] = useState<User | null>(null)
const [items, setItems] = useState<string[]>([])
```

---

### 5. Typer `useReducer`

```tsx
type State = { count: number; error: string | null }
type Action =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'setError'; payload: string }

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment': return { ...state, count: state.count + 1 }
        case 'setError':  return { ...state, error: action.payload }
        default: return state
    }
}

const [state, dispatch] = useReducer(reducer, { count: 0, error: null })
```

---

### 6. Typer `useContext`

```tsx
interface ThemeContextType {
    theme: 'light' | 'dark'
    toggle: () => void
}

// ✅ Valeur par défaut typée
const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggle: () => {}
})

// Dans un composant
const { theme, toggle } = useContext(ThemeContext)
```

---

### 7. Typer les `children`

```tsx
// ReactNode = tout ce que React peut rendre (string, JSX, array, null...)
type Props = {
    children: React.ReactNode       // le plus permissif ✅
    children: React.ReactElement    // uniquement du JSX
    children: string                // uniquement du texte
    children: React.ReactElement[]  // tableau de JSX
}
```

---

### 8. Les assertions de type dans le JSX

```tsx
// ❌ Impossible dans TSX — conflit avec la balise fermante
const el = <div>{value as string}</div> // ✅ OK dans le JSX
const x = <string>value                 // ❌ Jamais dans TSX

// ✅ Toujours utiliser 'as' dans TSX
const x = value as string
```

---

### 9. `forwardRef` typé

```tsx
interface InputProps {
    label: string
    placeholder?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, placeholder }, ref) => (
        <div>
            <label>{label}</label>
            <input ref={ref} placeholder={placeholder} />
        </div>
    )
)
```

---

### 10. Composants génériques

```tsx
// Un composant qui accepte n'importe quel type de liste
interface ListProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
    keyExtractor: (item: T) => string
}

function List<T,>({ items, renderItem, keyExtractor }: ListProps<T>) {
    return (
        <ul>
            {items.map(item => (
                <li key={keyExtractor(item)}>{renderItem(item)}</li>
            ))}
        </ul>
    )
}

// Utilisation — TypeScript infère T automatiquement
<List
    items={[{ id: 1, name: 'John' }]}
    renderItem={item => <span>{item.name}</span>}
    keyExtractor={item => String(item.id)}
/>
```

---

### Résumé des pièges spécifiques à TSX

| Piège | Solution |
|---|---|
| Générique `<T>` ambigu | Ajouter `<T,>` ou `<T extends unknown>` |
| `as` vs cast `<Type>` | Toujours `as` dans TSX |
| Event mal typé | Utiliser `React.ChangeEvent`, `React.MouseEvent`... |
| `children` trop strict | Préférer `React.ReactNode` |
| `ref` non forwardé | Utiliser `forwardRef<ElType, PropsType>` |










Bonne question ! Voici tout ce qu'il faut savoir pour typer du code JavaScript externe dans TSX.

---

### 1. Les `@types` — La base

La majorité des libs populaires ont des types officiels :

```bash
npm install --save-dev @types/jquery
npm install --save-dev @types/lodash
npm install --save-dev @types/gsap
```

Certaines libs incluent leurs types directement :

```bash
npm install framer-motion    # ✅ types inclus
npm install zustand          # ✅ types inclus
npm install easymde          # ❌ faut @types/easymde
```

---

### 2. Quand il n'y a pas de `@types`

#### Option A — Déclarer le module manuellement

```ts
// assets/types/declarations.d.ts

// Déclaration minimale — tout est 'any'
declare module 'ma-lib-sans-types'

// Déclaration partielle — typer ce dont tu as besoin
declare module 'ma-lib-sans-types' {
    interface Options {
        element: HTMLElement
        theme?: 'light' | 'dark'
    }

    class MyLib {
        constructor(options: Options)
        destroy(): void
        getValue(): string
    }

    export default MyLib
}
```

#### Option B — Typer à la volée avec `as`

```tsx
import MyLib from 'ma-lib-sans-types'

const instance = new (MyLib as any)({ element: ref.current })
```

---

### 3. Variables globales (window, jQuery, etc.)

```ts
// assets/types/globals.d.ts

// Étendre window
declare global {
    interface Window {
        MyPlugin: {
            init: (el: HTMLElement) => void
            version: string
        }
        gtag: (...args: any[]) => void  // Google Analytics
    }
}

export {} // 👈 obligatoire pour que TS traite ce fichier comme un module
```

```tsx
// Utilisation dans un composant
useEffect(() => {
    window.MyPlugin.init(ref.current!)
    window.gtag('event', 'page_view')
}, [])
```

---

### 4. Librairies chargées via CDN (sans import)

```ts
// assets/types/globals.d.ts
declare const Stripe: {
    (key: string): StripeInstance
}

interface StripeInstance {
    elements: () => StripeElements
    confirmPayment: (options: object) => Promise<void>
}
```

```tsx
useEffect(() => {
    // Stripe est chargé via <script> dans base.html.twig
    const stripe = Stripe('pk_test_...')
}, [])
```

---

### 5. Fichiers non-JS (images, CSS, SVG)

TypeScript ne connaît pas ces imports par défaut :

```ts
// assets/types/declarations.d.ts
declare module '*.svg' {
    const content: string
    export default content
}

declare module '*.png' {
    const content: string
    export default content
}

declare module '*.css' {
    const content: Record<string, string>
    export default content
}
```

```tsx
import logo from '../images/logo.svg'  // ✅ plus d'erreur TS

export default function Header() {
    return <img src={logo} alt="Logo" />
}
```

---

### 6. Librairies avec types partiels — les étendre

```ts
// assets/types/easymde.d.ts
import 'easymde'

declare module 'easymde' {
    interface Options {
        myCustomOption?: boolean  // 👈 ajouter une option manquante
    }
}
```

---

### 7. Organiser ses fichiers de types

```
assets/
├── types/
│   ├── globals.d.ts       # window, variables globales
│   ├── declarations.d.ts  # modules sans @types
│   └── media.d.ts         # svg, png, css...
```

Et référencer dans `tsconfig.json` :

```json
{
  "compilerOptions": {
    "typeRoots": ["./assets/types", "./node_modules/@types"]
  },
  "include": [
    "assets/**/*",
    "assets/types/**/*.d.ts"
  ]
}
```

---

### Résumé

| Situation | Solution |
|---|---|
| Lib populaire | `npm i @types/ma-lib` |
| Lib sans types | `declare module` dans un `.d.ts` |
| Variable globale | `declare global { interface Window {} }` |
| CDN sans import | `declare const MaLib: { ... }` |
| Import SVG/PNG | `declare module '*.svg'` |
| Types incomplets | Étendre le module avec `declare module` |










Non, il reste encore des choses importantes ! Voici ce qu'on n'a pas encore couvert :

---

### 1. Les Hooks custom typés

```tsx
// Typer le retour explicitement
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [state, setState] = useState<T>(() => {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : initialValue
    })

    const setValue = (value: T) => {
        localStorage.setItem(key, JSON.stringify(value))
        setState(value)
    }

    return [state, setValue]
}

// Utilisation — T est inféré automatiquement
const [name, setName] = useLocalStorage('name', '')
const [user, setUser] = useLocalStorage<User | null>('user', null)
```

---

### 2. Les discriminated unions pour les props

```tsx
// ❌ Props ambiguës
type ButtonProps = {
    href?: string
    onClick?: () => void
}

// ✅ Soit un lien, soit un bouton — jamais les deux
type ButtonProps =
    | { as: 'a'; href: string; onClick?: never }
    | { as: 'button'; onClick: () => void; href?: never }

function Button({ as, ...props }: ButtonProps) {
    if (as === 'a') return <a {...props} />
    return <button {...props} />
}
```

---

### 3. Les Higher Order Components (HOC) typés

```tsx
// HOC qui ajoute des props
function withAuth<T extends { user: User }>(
    Component: React.ComponentType<T>
) {
    return function AuthenticatedComponent(props: Omit<T, 'user'>) {
        const user = useCurrentUser()
        return <Component {...(props as T)} user={user} />
    }
}

// Utilisation
const ProtectedPage = withAuth(MyPage)
```

---

### 4. `useCallback` et `useMemo` typés

```tsx
// useCallback — TypeScript infère depuis la fonction
const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget)
}, [])

// useMemo — typer explicitement si l'inférence échoue
const filtered = useMemo<User[]>(() => {
    return users.filter(u => u.active)
}, [users])
```

---

### 5. Les Portals typés

```tsx
import { createPortal } from 'react-dom'

function Modal({ children }: { children: React.ReactNode }) {
    const el = document.getElementById('modal-root')
    if (!el) return null

    return createPortal(
        <div className="modal">{children}</div>,
        el  // 👈 TypeScript vérifie que c'est bien un HTMLElement
    )
}
```

---

### 6. Lazy loading et Suspense

```tsx
import { lazy, Suspense } from 'react'

// ✅ Le type est inféré automatiquement
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <HeavyComponent />
        </Suspense>
    )
}
```

---

### 7. Error Boundaries

Les Error Boundaries **doivent être des classes** — pas de hooks pour ça :

```tsx
interface Props {
    fallback: React.ReactNode
    children: React.ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false, error: null }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error(error, info)
    }

    render() {
        if (this.state.hasError) return this.props.fallback
        return this.props.children
    }
}
```

---

### 8. Les patterns d'optimisation typés

```tsx
// React.memo avec props typées
const MyComponent = React.memo(function MyComponent({ name }: { name: string }) {
    return <div>{name}</div>
})

// Comparaison personnalisée
const MyComponent = React.memo(
    ({ user }: { user: User }) => <div>{user.name}</div>,
    (prev, next) => prev.user.id === next.user.id  // ✅ TypeScript vérifie les types
)
```

---

### 9. Les types utilitaires React

```tsx
// Extraire les props d'un composant existant
type ButtonProps = React.ComponentProps<'button'>
type MyComponentProps = React.ComponentProps<typeof MyComponent>

// Récupérer le type de ref d'un élément
type InputRef = React.ElementRef<'input'>  // HTMLInputElement

// Rendre toutes les props optionnelles
type PartialProps = Partial<React.ComponentProps<typeof MyComponent>>
```

---

### 10. Strict mode et `null` safety

```tsx
// ✅ Non-null assertion quand tu es sûr
const el = document.getElementById('root')!

// ✅ Optional chaining dans le JSX
<div>{user?.profile?.avatar}</div>

// ✅ Nullish coalescing pour les valeurs par défaut
<div>{user?.name ?? 'Anonyme'}</div>
```

---

### Récap de tout ce qu'on a couvert

| Sujet | Couvert |
|---|---|
| Générique `<T,>` | ✅ |
| Typer les props/events | ✅ |
| `useRef` + libs externes | ✅ |
| Custom Elements | ✅ |
| Libs sans `@types` | ✅ |
| Hooks custom typés | ✅ |
| Discriminated unions | ✅ |
| HOC typés | ✅ |
| Error Boundaries | ✅ |
| Lazy / Suspense | ✅ |
| Types utilitaires React | ✅ |

La seule chose qu'on n'a pas abordée en profondeur est la gestion d'état global typée (**Zustand**, **Redux Toolkit**) si tu comptes utiliser un store — dis-moi si tu veux qu'on couvre ça !










### Zustand avec TypeScript/TSX

---

### 1. Installation

```bash
npm install zustand
```

---

### 2. Créer un store simple

```ts
// assets/stores/useCounterStore.ts
import { create } from 'zustand'

interface CounterState {
    // État
    count: number
    error: string | null

    // Actions
    increment: () => void
    decrement: () => void
    reset: () => void
    setError: (error: string) => void
}

const useCounterStore = create<CounterState>((set) => ({
    // État initial
    count: 0,
    error: null,

    // Actions
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
    setError: (error) => set({ error }),
}))

export default useCounterStore
```

---

### 3. Utiliser dans un composant TSX

```tsx
// assets/react/controllers/Counter.tsx
import useCounterStore from '../../stores/useCounterStore'

export default function Counter() {
    // ✅ Sélectionner uniquement ce dont on a besoin
    // Evite les re-renders inutiles
    const count     = useCounterStore((state) => state.count)
    const increment = useCounterStore((state) => state.increment)
    const decrement = useCounterStore((state) => state.decrement)
    const reset     = useCounterStore((state) => state.reset)

    return (
        <div>
            <p>Count : {count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    )
}
```

---

### 4. Store avec des objets complexes

```ts
// assets/stores/useUserStore.ts
import { create } from 'zustand'

interface User {
    id: number
    name: string
    email: string
}

interface UserState {
    users: User[]
    selectedUser: User | null
    isLoading: boolean

    setUsers: (users: User[]) => void
    selectUser: (user: User) => void
    addUser: (user: User) => void
    removeUser: (id: number) => void
    updateUser: (id: number, data: Partial<User>) => void
}

const useUserStore = create<UserState>((set) => ({
    users: [],
    selectedUser: null,
    isLoading: false,

    setUsers: (users) => set({ users }),
    selectUser: (user) => set({ selectedUser: user }),

    addUser: (user) => set((state) => ({
        users: [...state.users, user]
    })),

    removeUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id)
    })),

    updateUser: (id, data) => set((state) => ({
        users: state.users.map((u) => u.id === id ? { ...u, ...data } : u)
    })),
}))

export default useUserStore
```

---

### 5. Store avec des appels API (async)

```ts
// assets/stores/usePostStore.ts
import { create } from 'zustand'

interface Post {
    id: number
    title: string
    body: string
}

interface PostState {
    posts: Post[]
    isLoading: boolean
    error: string | null

    fetchPosts: () => Promise<void>
    createPost: (data: Omit<Post, 'id'>) => Promise<void>
    deletePost: (id: number) => Promise<void>
}

const usePostStore = create<PostState>((set) => ({
    posts: [],
    isLoading: false,
    error: null,

    fetchPosts: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await fetch('/api/posts')
            const posts: Post[] = await res.json()
            set({ posts, isLoading: false })
        } catch (e) {
            set({ error: 'Erreur lors du chargement', isLoading: false })
        }
    },

    createPost: async (data) => {
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const post: Post = await res.json()
            set((state) => ({ posts: [...state.posts, post] }))
        } catch (e) {
            set({ error: 'Erreur lors de la création' })
        }
    },

    deletePost: async (id) => {
        try {
            await fetch(`/api/posts/${id}`, { method: 'DELETE' })
            set((state) => ({
                posts: state.posts.filter((p) => p.id !== id)
            }))
        } catch (e) {
            set({ error: 'Erreur lors de la suppression' })
        }
    },
}))

export default usePostStore
```

---

### 6. Middleware — `persist` pour sauvegarder dans localStorage

```ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ThemeState {
    theme: 'light' | 'dark'
    toggleTheme: () => void
}

const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'light',
            toggleTheme: () => set((state) => ({
                theme: state.theme === 'light' ? 'dark' : 'light'
            })),
        }),
        {
            name: 'theme-storage',                        // clé localStorage
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useThemeStore
```

---

### 7. Middleware — `devtools` pour le debug

```ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useCounterStore = create<CounterState>()(
    devtools(
        (set) => ({
            count: 0,
            increment: () => set(
                (state) => ({ count: state.count + 1 }),
                false,           // remplacer ou merger l'état
                'increment'      // 👈 nom de l'action dans Redux DevTools
            ),
        }),
        { name: 'CounterStore' } // 👈 nom du store dans DevTools
    )
)
```

---

### 8. Combiner plusieurs middlewares

```ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const useStore = create<MyState>()(
    devtools(
        persist(
            (set) => ({ ... }),
            { name: 'my-store' }
        ),
        { name: 'MyStore' }
    )
)
```

---

### 9. Sélecteurs — éviter les re-renders inutiles

```tsx
import { useShallow } from 'zustand/react/shallow'

function MyComponent() {
    // ❌ Re-render à chaque changement du store
    const store = useUserStore()

    // ✅ Re-render uniquement si users ou isLoading changent
    const { users, isLoading } = useUserStore(
        useShallow((state) => ({
            users: state.users,
            isLoading: state.isLoading
        }))
    )
}
```

---

### 10. Accéder au store hors d'un composant

```ts
// Dans un service, un helper, etc.
import usePostStore from '../stores/usePostStore'

// Lire l'état
const posts = usePostStore.getState().posts

// Modifier l'état
usePostStore.setState({ isLoading: true })

// S'abonner aux changements
const unsubscribe = usePostStore.subscribe(
    (state) => console.log('posts changed:', state.posts)
)
```

---

### Résumé

| Besoin | Solution |
|---|---|
| Store simple | `create<Type>()` |
| Appels API | Actions `async` dans le store |
| Persistance | Middleware `persist` |
| Debug | Middleware `devtools` + Redux DevTools |
| Éviter re-renders | `useShallow` ou sélecteurs individuels |
| Hors composant | `useStore.getState()` / `setState()` |
