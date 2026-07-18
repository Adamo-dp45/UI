import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt', /*
      - 'prompt' va proposer à l'utilisateur une nouvelle version de notre librairie, dans ce on doit allez sur la doc et copier le fichier de prompt en prendre aussi leur css et est recommandé
      - 'autoUpdate' va faire une mise à jour auto de notre progressive webapp dès qu'il détecte de nouveau changement quand on vas actualisé la page
    */
    // injectRegister: false,
    workbox: { // 'workbox' analyse les fichiers de build, une fois que vite à build le projet il va regarder à l'intérieur de ce dossier et ces sur ces fichiers là qu'il va utiliser le 'globPatterns' pour mettre en cache les choses
      globPatterns: ['**/*{js,css,html,ico,png,svg}'], // On définie les fichiers à mettre en cache
      runtimeCaching: [{
        urlPattern: '/^https:\/\/grafikart\.fr\/.*/i', // Va attraper tous ce qui provient de grafikart.fr
        handler: 'CacheFirst', // Permet de spécifier qu'est ce qu'on veut faire
        /*
          - 'CacheFirst' si on a une version en cache on l'utilise
          - 'CacheOnly' pour vérifier le cache
          - 'NetworkFirst' pour vérifier si on a accès au reseau pour pouvoir récupérer le fichier et si oui on recupère dépuis le réseau
          - 'StaleWhileRevalidate' on utilise le cache et pendant qu'on a le cache on fais une requête pour récupérer les informations
        */
        options: { // Options sur la mise en cache
          cacheName: 'grafikart', // Nom du dossier de stockage
          expiration: {
            maxEntries: 10, // Combien d'entrée on accepte dans ce cache
            maxAgeSeconds: 60 // 60 seconds
          },
          cacheableResponse: { // Permet de spécifier quelle type de reponse on autorise
            statuses: [0, 200] // Tous les status qui sont entre 0 et 200
          }
        }
      }]
      // cleanupOutdatedCaches: true,
      // clientsClaim: true,
    }

    // -- Pour les nouveaux projets pwa on vera ces options, voir doc Pwa
    /*
      pwaAssets: {
        disabled: false,
        config: true,
      },
      manifest: {
        name: 'Pwa',
        short_name: 'Pwa',
        description: 'Pwa',
        theme_color: '#ffffff',
      },
    */
  })],
  build: {
    minify: false // Pour la minification
  },
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    dir: 'test' // Le chemin du dossier de test
  }
})
