import { describe, it, expect } from "vitest"
import { act, renderHook } from "@testing-library/react"
import { useIncrement } from "../src/hooks/useIncrement"

describe('useIncrement', () => {
    it("Should use the default value", () => {
        // Par défaut si on utilise un hook en dehors d'un composant, on n'aura une erreur
        const {result} = renderHook(() => useIncrement({initial: 5}))
        expect(result.current.count).toBe(5) // document is not defined - vite.config.js
    })

    it("Should increment value", () => {
        // Par défaut si on utilise un hook en dehors d'un composant, on n'aura une erreur
        const {result} = renderHook(() => useIncrement({initial: 5}))
        act(() => result.current.increment()) // Permet d'utiliser une méthode de notre hook
        expect(result.current.count).toBe(6) // document is not defined - vite.config.js
    })

    it("Should not bypass max", () => {
        // Par défaut si on utilise un hook en dehors d'un composant, on n'aura une erreur
        const {result} = renderHook(() => useIncrement({initial: 5, max: 7}))
        act(() => result.current.increment())
        act(() => result.current.increment())
        act(() => result.current.increment())
        act(() => result.current.increment())
        expect(result.current.count).toBe(7)
    })
})