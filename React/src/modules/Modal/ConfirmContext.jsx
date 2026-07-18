import { createContext, useCallback, useContext, useRef, useState } from "react"
import { ConfirmDialog } from "./ConfirmDialog"

const defaultFunction = {
    current: () => Promise.resolve(true)
}

const defaultValue = {
    confirmRef: defaultFunction
}

const ConfirmContext = createContext(defaultValue)

export function ConfirmContextProvider({children}) {
    const confirmRef = useRef(defaultFunction)

    return <ConfirmContext.Provider value={confirmRef}>
        {children}
        <ConfirmDialogWithContext />
    </ConfirmContext.Provider>
}

function ConfirmDialogWithContext() {
    const [open, setOpen] = useState(false)
    const [props, setProps] = useState()
    const resolveRef = useRef(() => {})
    const {confirmRef} = useContext(ConfirmContext)
    if(confirmRef) { // --
        confirmRef.current = (props) => {
            new Promise((resolve) => {
                setProps(props)
                setOpen(true)
                resolveRef.current = resolve
            })
        }
    }

    return (<ConfirmDialog
        onConfirm={() => {
            resolveRef.current(true)
            setOpen(false)
        }}
        onCancel={() => {
            resolveRef.current(false)
            setOpen(false)
        }}
        open={open}
        {...props}
    >
    </ConfirmDialog>)
}

export function useConfirm() {
    const {confirmRef} = useContext(ConfirmContext)
    return {
        confirm: useCallback((p) => {
            return confirmRef.current(p)
        }, [confirmRef])
    }
}