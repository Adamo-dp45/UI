export default defineEventHandler((event) => {
    return {
        hello: "Bonjour le monde"
    }
}) /*
    - '/api/hello' rendu que côté serveur 'about.vue'
*/