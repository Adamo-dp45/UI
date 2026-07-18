import { createContext, useCallback, useContext, useRef, useState } from "react"
import { Toast } from "./Toast"
import { AnimatePresence, motion } from "framer-motion"

const defaultPush = (toast) => {}

const defaultValue = {
    // toasts: [],
    // setToasts: () => {} -- Pour éviter le rerendu
    pushToastRef: {current: defaultPush}
}

const ToastContext = createContext(defaultValue)

export function ToastContextProvider({children}) {
    // const [toasts, setToasts] = useState([]) -- Pour éviter le rerendu
    const pushToastRef = useRef(defaultPush)

    return <ToastContext.Provider value={{ pushToastRef }}> {/* value - toasts, setToasts */}
        <Toasts />
        {children}
    </ToastContext.Provider>
}

export function useToasts() {
    const {pushToastRef} = useContext(ToastContext)
    return {
        pushToast: useCallback((toast) => {
            // setToasts(v => [...v, toast])
            pushToastRef.current(toast)
        }, [pushToastRef]) // Si setToasts à changer, recrée cette fonction
    }
}

function Toasts() {
    const [toasts, setToasts] = useState([])
    const {pushToastRef} = useContext(ToastContext)
    pushToastRef.current = (props) => {
        const id = Date.now()
        const timer = setTimeout(() => {
            setToasts((v) => v.filter(t => t.id !== id))
        }, (props.duration ?? 5) * 1000) // * 1000 car on veut être en seconde
        const toast = {...props, id, timer}
        setToasts(v => [...v, toast])
    }

    const onRemove = (toast) => {
        clearTimeout(toast.timer)
        setToasts((v) => v.filter(t => t !== toast))
    }

    return <>
        <AnimatePresence>
            <div className="toast-container">
                {toasts.map((toast, k) => (
                    <motion.div
                        key={toast.id}
                        onClick={() => onRemove(toast)}
                        initial={{opacity: 0, x: -30}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 30}}
                    >
                        <Toast {...toast} /> {/* key={k} */}
                    </motion.div>
                ))}
            </div>
        </AnimatePresence>
    </>
}