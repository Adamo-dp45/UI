import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import Alert from "../src/components/Alert.vue"

describe("<Alert>", () => {
    it("Should render the correct HTML", () => {
        const wrapper = mount(Alert, {
            props: {
                type: "danger"
            },
            slots: {
                default: "Bonjour"
            }
        })
        expect(wrapper.html()).toMatchInlineSnapshot(`
          "<transition-stub data-v-3f4a8ec2="" name="fade" appear="false" persisted="false" css="true">
            <div data-v-3f4a8ec2="" class="alert alert-danger" role="alert">Bonjour<button data-v-3f4a8ec2="" aria-label="Close">×</button></div>
          </transition-stub>"
        `) /*
            - On aura une erreur 'document is not defined', pour il faudra charger 'jsdom' - 'vite.config.js'
        */
        // toMatchInlineSnapshot : Sera automatiquement rempli par le contenu du wrapper lorsque les tests seront lancés pour la première fois, ainsi on modifie notre code on qu'on réexécute les tests on aura une erreur
    })

    it("Should emit close when closing", async () => {
        const wrapper = mount(Alert, {
            props: {
                type: "danger"
            },
            slots: {
                default: "Bonjour"
            }
        })
        await wrapper.get('[aria-label="Close"]').trigger('click') // Simuler un click
        expect(wrapper.emitted()).toHaveProperty('close') // Je m'attend à avoir un propriété close
        expect(wrapper.emitted().close).toHaveLength(1) // N'est appelé qu'une fois
    })
})