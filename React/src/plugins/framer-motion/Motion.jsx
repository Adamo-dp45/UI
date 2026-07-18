import { AnimatePresence, motion } from "framer-motion"
import { useToggle } from "../../hooks/useToggle"
import { forwardRef } from "react"

const boxVariante = { // Va permettre de représenter les différentes état de notre div
    visible: {x: 0, rotate: 0},
    hidden: {x: 100, rotate: 45}
}

const wrapperVariants = {
    visible: {opacity: 1, transition: {when: "beforeChildren"}}, // transition : Fais cette transition avant celle des enfants
    hidden: {opacity: 0, transition: {when: "afterChildren"}, staggerChildren: .2} // transition : Fais cette transition seulement quand les enfants ont fini de s'animer
    // staggerChildren : Chaque enfant vas s'animer l'un après l'autre avec un delai de 200ms
}

function App() {

    const [open, toggle] = useToggle(true)
    const items = open ? [1, 2, 3, 4] : [3, 1, 4, 2]

    /*
        'whileHover' au survol
        'whileTap' au clic ou maintien du clic

        - Dans 'Animation' Imbriquées on verra qu'il fera les deux animations en simultanée
            - type 'tween' animation linéaire basé sur l'accélération et la décéleration
            - type 'spring' animation de ressort et rebond
            - type 'inertia' animation en fonction du velocity et l'utilisateur

        - layout anime le deplacement des bloc, layoutId="image" dans le cas ou on n'a deux pages ou images mais que l'un ou l'autre s'affiche selon le clic si on leur donne aux deux le même layoutId il y'aura une transition

        - 'AnimatePresence' prend en enfant des éléments qui peuvent afficher ou supprimer du dom, 'exit' spécifie l'animation de sortie, mode 'popLayout' lorsque l'élément est supprimer il va directement changer la structure même si l'animation n'est pas terminé
    */

    return <>
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}

            whileHover={{scale: 0.8}}
            whileTap={{scale: 1.1}}
        >
            Animation opacité
        </motion.div>
        <motion.div initial={{x: 100}} animate={{x: 0}}>Animation transformation</motion.div>
        <motion.div animate={{x: open ? 0 : 100, opacity: open ? 1 : 0, rotateX: open ? 0 : 45}}>Animation au click</motion.div>

        <motion.div variants={boxVariante} animate={open ? 'visible' : 'hidden'}>Animation box variante</motion.div>
        <MotionBox initial={{x: 100}} animate={{x: 0}}>MotionBox</MotionBox>

        <motion.div variants={wrapperVariants} animate={open ? 'visible' : 'hidden'}>
            <MotionBox variants={boxVariante}>Animation Imbriquées</MotionBox>
            <MotionBox variants={boxVariante}>Animation Imbriquées</MotionBox>
        </motion.div>

        <motion.div variants={wrapperVariants} animate={open ? 'visible' : 'hidden'}>
            <MotionBox
                variants={boxVariante}
                transition={{duration: .5, type: 'tween', ease: 'easeIn'}}
            >Animation transition piloté directement linéaire</MotionBox>
            <MotionBox
                variants={boxVariante}
                transition={{type: 'spring'}}
            >Animation transition piloté directement ressort</MotionBox>
            <MotionBox
                variants={boxVariante}
                transition={{type: 'inertia', velocity: 100}}
            >Animation transition piloté directement bouge à la vitesse du velocity</MotionBox>
        </motion.div>

        <motion.div variants={wrapperVariants} animate={open ? 'visible' : 'hidden'}>
            {items.map((item) => (
                <MotionBox layout key={item}>{item}</MotionBox>
            ))}
        </motion.div>

        <AnimatePresence>
            {open && <MotionBox variants={boxVariante} animate="visible" initial="hidden" exit="hidden">Présence</MotionBox>}
        </AnimatePresence>

        <AnimatePresence mode="popLayout">
            {open && <MotionBox variants={boxVariante} animate="visible" initial="hidden" exit="hidden">Présence</MotionBox>}
        </AnimatePresence>

        <button onClick={toggle}>Bouger le block</button>
    </>
}

// -- On vas animer un composant
const Box =  forwardRef(({children}, ref) => { // On peut le faire sans le forwardRef
    return <div ref={ref}>{children}</div>
})
const MotionBox = motion(Box) // Va transformer notre composant en composant animable

export default App