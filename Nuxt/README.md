### Nuxt `nuxt.com`

- npm run dev

- **Important !**
    > Le fichier `app.vue` est le fichier ou compsant principale
    > Pour les routes `pages/` - `app.vue` - `NuxtPage` : On doit faire attention au nommage des routes car il y'a une notion de priorité
    > !! faire un lien vers d'autres pages on a `NuxtLink`
    > !! ajouter des metadonnées il faut modifier le fichier de config `nuxt.config.ts`, on a aussi `useHead` et `useSeoMeta`
    > !! indiquer le chargement de la page à l'utilisateur, dans `app.vue` - `NuxtLoadingIndicator` mais dans le cas d'une application côté client on.. le `lazy` dans `useFetch` et indiquer un loader
    > !! avoir un titre globale par ex on crée un fichier `app.config.js`, pour récupérer on.. `app.vue`
    > !! le rendu côté client on peut définir une transition entre les pages, dans `nuxt.config.ts` - `pageTransition` puis `app.vue`
    > Dans `server/` on peut créer des points d'entrées `api` et ce code va fonctionné seulement côté serveur
    > Par défaut le `ssr` est activer

- **Production**
    > npm run build : Pour build `.output/`
        > node .output/server/index.mjs : Permet de lancer le rendu serveur
            > Dès qu'on charge une page il y'a un appel qui est fais côté serveur, c'est lui qui va exécuter notre code `vue.js` et faire le rendu, mais on peut activer le `prerendering` qui permet de générer les pages en amont, si on n'a des pages qui ne sont pas dynamique ça peut être intérèssant
        > npm run generate : Pour générer le rendu statique
            > On aura dans `.output` un dossier `public` qui contiendra les fichiers statiques
    > npm run preview : !! voir la version de production

    > Pour avoir les 2 types rendu ensemble on modifie la configuration `nuxt.config.ts` - `nitro` doc, ensuite `npm run build` va build en fonction de ce que on lui a dit, on aura un dossier `.output` dans lequel on aura `public` et `server`
    > On.. une autre configuration dans `nuxt.config.ts` - `routeRules` qui permet de définir des règles par route