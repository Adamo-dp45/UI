import { describe, it, expect } from "vitest"
import { act, render, renderHook, screen } from "@testing-library/react"
import { Alert } from "../src/components/Alert"

describe('<Alert>', () => {
    it('should render correctly', () => {
        const {container} = render(<Alert type="danger" childern="Erreur" />)
        // screen.debug() -- Nous montre le contenu du resultat
        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="alert alert-danger"
            role="alert"
          >
            Erreur
            <button>
              Fermer
            </button>
          </div>
        `)
        // expect().toMatchSnapshot() -- Permet d'afficher le rendu dans un fichier séparer
    })

    it('should close the alert on click',async () => {
        const {container} = render(<Alert type="danger" childern="Erreur" />)
        // await userEvent.click(screen.getByText('Fermer'))
        // expect(container.firstChild).toMatchInlineSnapshot(null)
    })
})

// Vu qu'il intéragi avec le 'jsdom' il va faloir penser à nétoyer les tests entre chaque exécution - vite.config.js - setupFiles