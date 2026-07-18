import { flushPromises, mount } from "@vue/test-utils"
import { describe, it, expect, beforeEach } from "vitest"
import Header from "../src/blog/Header.vue"
import { createMemoryHistory, createRouter } from "vue-router"
import { routes } from "../src/routes"

describe("<Header>", () => {

    let router
    beforeEach(async () => {
        router = createRouter({
            history: createMemoryHistory(),
            routes: routes
        })
        router.push('/')
        await router.isReady()
    })

    it("Should render correct HTML", async () => {
        const wrapper = mount(Header, {
            global: {
                plugins: [router]
            }
        })

        expect(wrapper.html()).toMatchInlineSnapshot(`
          "<header data-v-9b6d4ded="" class="header">
            <nav data-v-9b6d4ded="">
              <ul data-v-9b6d4ded="" class="nav">
                <li data-v-9b6d4ded=""><a data-v-9b6d4ded="" aria-current="page" href="/" class="router-link-active router-link-exact-active">Accueil</a></li>
                <li data-v-9b6d4ded=""><a data-v-9b6d4ded="" href="/posts" class="">Articles</a></li>
                <li data-v-9b6d4ded=""><a data-v-9b6d4ded="" href="/contact" class="">Contact</a></li>
              </ul>
            </nav>
          </header>"
        `)

        router.push('/contact') // Ici on verra que le lien contact est actif
        await router.isReady()
        await flushPromises() // Permet d'attendre que les différentes promesses se sont resolues
        expect(wrapper.html()).toMatchInlineSnapshot(`
          "<header data-v-9b6d4ded="" class="header">
            <nav data-v-9b6d4ded="">
              <ul data-v-9b6d4ded="" class="nav">
                <li data-v-9b6d4ded=""><a data-v-9b6d4ded="" href="/" class="">Accueil</a></li>
                <li data-v-9b6d4ded=""><a data-v-9b6d4ded="" href="/posts" class="">Articles</a></li>
                <li data-v-9b6d4ded=""><a data-v-9b6d4ded="" href="/contact" class="router-link-active router-link-exact-active" aria-current="page">Contact</a></li>
              </ul>
            </nav>
          </header>"
        `)
    })
})
