import { Button } from "@/components/ui/button"
import { forwardRef, useEffect, useRef, useState, type ComponentType, type Dispatch, type FunctionComponent, type JSX, type MouseEvent, type PropsWithChildren, type ReactNode, type RefObject, type SetStateAction, type SubmitEvent } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoginForm } from "@/components/login-form"
import { GalleryVerticalEnd } from "lucide-react"
import { SignupForm } from "@/components/signup-form"

import { useCounter } from "./CounterProvider"
import EasyMDE from "easymde"
import "easymde/dist/easymde.min.css"

/*
    - Types
        - On pourrait tenter de prendre en param un 'children' mais pas nécéssaire grâce au 'PropsWithChildren' va nous donner un objet qui contient en plus 'children'
        - On n'a une autre manière d'utiliser les 'types' qui est le 'FunctionComponent' qui prend en paramètre les 'Props' et on n'a plus besoind de préciser le type au niveau de la fonction
        - Pour le 'forwardRef' voir image

    - Pour typé les contextes on n'a 'CounterProvider.tsx'
*/
type PropsChild = PropsWithChildren<{
    start?: number, // '?:' optionel
    title?: ReactNode, // N'importe quoi qui peut être considéré comme un noeud react et vas accepter tous ce qu'on peut avoir en children
    titleTag?: keyof JSX.IntrinsicElements | ComponentType /*
        - Une interface qui contient en clé l'élément et les différentes propriétés qui sont acceptés sur elle et va pouvoir accepter des chaîne de caractère comme 'h1'
        - 'ComponentType' pour accepter un composant, on peut même forcer le type '..e<PropsWithChildren>' un composant qui attend des enfants
    */
}>
/*
    type Props = {
        start?: number -- '?:' optionel
    }
*/
const Count: FunctionComponent<PropsChild> = ({start = 0, children, title = 'Compteur', titleTag: Title = 'h1'}) => {
    const [n, setN] = useState<number>(start) /*
        - On n'est pas obligé de définir le type avec 'useState' mais peut prendre un type générique '..e<number>'
    */
    const incre = () => setN(n + 1)

    // const {n, incr} = useCounter() -- Le context et pour l'utiliser entourer ce composant du provider

    return (
        <>
            <Title>Numéro {n}</Title>
            <p>
                <button onClick={incre}>Incrémenter</button>
                {title}
                {children}
            </p>
        </>
    )
}

function Counter({start = 0, children}: PropsChild) { // Ou.. ': {start: number}'
    const ref = useRef<HTMLButtonElement>(null) // 'null' vu qu'on n'est obligé de spécifier une valeur initial, pour passer la ref à une fonction.. 'transform'

    const refArea = useRef<HTMLTextAreaElement>(null)

    useEffect(() => { /*
        - Va garantir que le dom est monté    
    */
        if(refArea.current == null) {
            return
        }

        const editor = new EasyMDE({
            element: refArea.current
        })

        return () => { // Pour détruire l'instance quand le composant est démonté
            editor.toTextArea()
            editor.cleanup()
        }
    }, [])

    return (
        <>
            <p>
                <Button ref={ref} onClick={onClick}>Incrémenter console {start}</Button> {children}
            </p>
            <Title>Ok</Title>
            <textarea ref={refArea} />
            {/*
                <Count title={<em>Mon titre</em>} titleTag={Title}>  -- Ou.. 'titleTag="h1"'
                    Hello
                </Count>
            */}
        </>
    )
}

function Title({children}: PropsWithChildren) {
    return <h1>{children}</h1>
}

function onClick(e: MouseEvent) { /*
    - Vu que react décore les évènements natif du navigateur il faut importer le 'MouseEvent' de react
    - 'SubmitEvent' ou 'FormEvent' pour le formulaire
*/
    e.preventDefault()
    console.log('click')
}
/*
    - function transform(setter: Dispatch<SetStateAction<number>>) {} -- Si on veut définir le type d'un setter ce qui est utile si on veut gérer le cas ou on n'a un callback à l'intérieur ou on peut faire '(n: number) => void'
    - function transform(ref: RefObject<HTMLButtonElement>) {} -- Pour indiquer qu'on attend une référence ou '{current: HTMLButtonElement}'
*/
function App() {
    const { setTheme } = useTheme()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Build Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl">
                            <Counter />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="flex min-h-svh flex-col items-center justify-center">
                                <Button>Click me</Button>
                            </div>
                        </div>
                        <div className="bg-muted/50 aspect-video rounded-xl">
                            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                                <div className="w-full max-w-sm">
                                    <LoginForm />
                                </div>
                            </div>
                        </div>
                        <div className="bg-muted/50 aspect-video rounded-xl">
                            <div className="grid min-h-svh lg:grid-cols-2">
                                <div className="flex flex-col gap-4 p-6 md:p-10">
                                    <div className="flex justify-center gap-2 md:justify-start">
                                        <a href="#" className="flex items-center gap-2 font-medium">
                                            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                                                <GalleryVerticalEnd className="size-4" />
                                            </div>
                                            Acme Inc.
                                        </a>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center">
                                        <div className="w-full max-w-xs">
                                            <SignupForm />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-muted relative hidden lg:block">
                                    <img
                                        src="/placeholder.svg"
                                        alt="Image"
                                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default App