import React, { useCallback, useEffect, useRef } from "react"
import flatpikr from "flatpickr"
// import "flatpickr/dist/flatpickr.min.css"
import "flatpickr/dist/themes/confetti.css"

export function Datepiker({value, onChange}) {
    const inputRef = useRef()
    const flatpickrRef = useRef() // Pour faire les choses dans le sens inverse, au cas ou un autre champ modifie la même valeur, et qu'on veut flatpikr le prenne en compte

    const onChangeRef = useRef(onChange) // On veut que lorsqu'un autre champ est modifier, lors du rerendu il prenne en compte
    onChangeRef.current = onChange
    const handleChange = useCallback((dates, date) => {
        onChangeRef.current(date)
    }, [])

    // On initialise flatpikr
    useEffect(() => {
        if(inputRef.current) {
            const f = flatpikr(inputRef.current, {
                /*
                onChange: (dates, date) => {
                    onChange(date)
                }
                */
               onChange: handleChange
            })
            flatpickrRef.current = f
            return () => f.destroy()
        }
    }, [inputRef.current])

    // On synchronise la valeur de flatpikr
    useEffect(() => {
        if(flatpickrRef.current) {
            flatpickrRef.current.setDate(value, false) // Provient de flatpikr, false : ne pas trigger change sinon ça va nous mettre dans une sorte de boucle
        }
    }, [value])

    /* - Lorsqu'un autre champ est modifier et qu'on veut qu'il prenne en compte le rerendu, Sol 1
        useEffect(() => {
            if(flatpickrRef.current) {
                flatpickrRef.current.set('onChange', (dates, date) => {
                    onChange(date)
                })
            }
        }, [onChange])
    */

    return <input type="text" ref={inputRef} value={value} onChange={onChange} />
}