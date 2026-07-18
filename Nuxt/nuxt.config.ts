// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      routes: ['/', '/about'],
      ignore: ['/blog', '/blog/*']
    }
  },
  routeRules: { /*
      - Permet de définir des règles par route
    */
    '/blog': {
      ssr: false /*
        - Pour désactiver le rendu côté serveur pour une route
      */
    }
  }
})
