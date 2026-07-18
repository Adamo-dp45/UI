### Css 
- steps(5, start ou end) : L'animation n'est plus fluid mais se fait dans le nombre d'étapes qu'on mais à l'intérieur

/*
    - Lorsqu'on déclare une variable dans '@theme'
        - '--color-primary' donne accès à des class comme 'bg-primary', 'text-primary',' border-primary'
        - '--spacing-card' : !! 'p-card', 'm-card', 'gap-card'

    - Le '@apply' sert à utiliser des class tailwind dans une class css
    - On a des fonctions comme '--spacing(4)', '--alpha(var(--color-red-50) / 50%)'
    - Les média query - sm: 640px, md: 768px, lg: 1024px, xl: 1280px
*/
@theme {
    --color-dusk: #FFF; /* -- Va rajouter une nouvelle couleur, si on n'a déjà une pallette de couleur on peut supprimer celle utilisées par tailwind et aussi pour d'autres règles
        - --color-*: initial ensuite nos variables
    */
}

@utility stack-* { /* Permet de créer une class utilitaire tailwind et ne sera mis dans le css que si elle est utilisé
    - Ou utiliser le ou 'space-..' de tailwind
    - La différence avec une class simple est que tailwind le rend compatible avec ses variantes donc dans le html on peut faire 'hover:demo'
*/
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * --value(integer)); /*
        - '--spacing' provient de tailwind
        - '--value..' la valeur de l'étoile 'st.-*'
    */

    /* @variant dark {} -- On peut utiliser les variantes ici, on a 'md', 'hover'.. et on peut en créer */
}

.stack > * + * { /*
    - Tous les éléments qui sont directement adjacent à un élément qui est un enfant directe de .stack
*/
    margin-top: 2rem
}



.avatar {
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-weight: 700;
    letter-spacing: .02em;
    background: linear-gradient(135deg, var(--primary), var(--primary-foreground));
}

.avatar-sm {
    width: 28px;
    height: 28px;
    font-size: 10.5px;
}

.avatar-md {
    width: 32px;
    height: 32px;
    font-size: 11.5px;
}

.avatar-lg {
    width: 38px;
    height: 38px;
    font-size: 13px;
    box-shadow: 0 2px 8px var(--muted-foreground);
}


.tag {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 99px;
    white-space: nowrap;
}

.tag-primary {
    background: var(--primary);
    color: var(--muted-foreground);
}

.tag-sky {
    background: var(--color-sky-light);
    color: var(--color-sky);
}

.tag-violet {
    background: var(--color-violet-light);
    color: var(--color-violet);
}

.tag-green {
    background: var(--color-green-light);
    color: var(--color-green);
}

.tag-red {
    background: var(--color-red-light);
    color: var(--color-red);
}


@keyframes spin { to { transform: rotate(360deg); } }

    .spinners {
      display: inline-block;
      border-radius: 9999px;
      border-style: solid;
      border-color: transparent;
      border-top-color: currentColor;
      animation: spin 0.75s linear infinite;
      flex-shrink: 0;
    }
    /* Sizes */
    .spinner-xs  { width: 0.75rem; height: 0.75rem; border-width: 1.5px; }
    .spinner-sm  { width: 1rem;    height: 1rem;    border-width: 2px; }
    .spinner-md  { width: 1.5rem;  height: 1.5rem;  border-width: 2px; }
    .spinner-lg  { width: 2rem;    height: 2rem;    border-width: 2.5px; }
    .spinner-xl  { width: 2.5rem;  height: 2.5rem;  border-width: 3px; }


.icon {
    width: 1em; /*
        - 'em' pour dépendre de la taille du texte
    */
    height: 1em;
    display: inline-block;
    vertical-align: -0.125em; /*
        - Pour un alignement optique avec le texte
    */
    fill: none; /*
        - Si les 'svg' utilisent 'stroke'
    */
    stroke: currentColor;
    flex-shrink: 0;
}

.icon-sm {
    width: 1rem;
    height: 1rem;
}

.icon-md {
    width: 1.25rem;
    height: 1.25rem;
}

.icon-lg {
    width: 1.5rem;
    height: 1.5rem;
}

.icon-xl {
    width: 2rem;
    height: 2rem;
}

/*
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: .375rem;
        white-space: nowrap;
        border-radius: var(--radius-xl);
        font-size: .875rem;
        font-weight: 500;
        line-height: 1;
        transition: background .15s, opacity .15s, box-shadow .15s, color .15s;
        cursor: pointer;
        border: none;
        outline: none;
        text-decoration: none;
    }

    .btn:focus-visible {
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 20%, transparent);
    }

    .btn:disabled {
        pointer-events: none;
        opacity: .5;
    }

    .btn-sm {
        height: 2rem;
        padding: 0 .75rem;
        font-size: .8125rem;
    }

    .btn-md {
        height: 2.25rem;
        padding: 0 1rem;
    }

    .btn-lg {
        height: 2.5rem;
        padding: 0 1.5rem;
        font-size: .9375rem;
    }

    .btn-icon {
        height: 2.25rem;
        width: 2.25rem;
        padding: 0;
    }

    .btn-default {
        background: var(--primary);
        color: var(--primary-foreground);
    }

    .btn-default:hover {
        opacity: .9;
    }

    .btn {
        background: var(--secondary);
        color: var(--secondary-foreground);
    }

    .btn-secondary:hover {
        background: color-mix(in srgb, var(--secondary) 80%, var(--foreground) 20%);
    }

    .btn-outline {
        background: transparent;
        color: var(--foreground);
        border: 1px solid var(--input);
        box-shadow: 0 1px 2px rgba(0,0,0,.04);
    }

    .btn-outline:hover {
        background: var(--accent);
    }

    .btn-ghost {
        background: transparent;
        color: var(--foreground);
    }

    .btn-ghost:hover {
        background: var(--accent);
    }

    .btn-destructive {
        background: var(--destructive);
        color: var(--destructive-foreground);
    }

    .btn-destructive:hover {
        opacity: .9;
    }

    .btn-link {
        background: transparent;
        color: var(--foreground);
        text-decoration: underline;
        text-underline-offset: 3px;
        padding: 0;
        height: auto;
    }

    .btn-link:hover {
        opacity: .8;
    }
*/

4. Nettoyer tes SVG (ULTRA important)

Avant d’ajouter dans le sprite :

🔥 À supprimer :
width / height
fill fixes
stroke inutiles
style=""
metadata, defs inutiles
🧰 Outil recommandé :

👉 SVGO (indispensable)





- - 

#fdf9ef Couleur de fond du site, #23422a Couleur principale, #566342 Couleur secondaire, #424842 Texte principal, 
#0000001c Ombre de l'entete, #f1eee3 Fond section sombre, #fdf9efd0 Overlay hero, #ffffffd1 Hover bouton blanc, #ffffff10 Fond input newsletter, #acd0af Texte newsletter, #acd0afb1 Placeholder newsletter, #dddad0 Fond bloc citation, #DDDAD0 Fond footer, #566342c2 Texte secondaire attenue

#F6F1E8 Couleur de fond du site, #5F5A53 Couleur de texte principale, #1C1917 Couleur des titres et liens, #BF5B36 Couleur d'accent (survols, labels), #944226 Accent fonce pour le hover du bouton, #D9CFC0 Couleur des bordures, #FFFDF8 Couleur des surfaces/cartes, #BF5B3640 Contour de focus semi-transparent, #3823140F Couleur d'ombre des cartes

 "./**/*.php" pour les sous dossiers



Le line-height est divisé par rapport à la taille du texte en question


Quand c'est lié à la taille de la police on utilise le rem et quand c'est un espacement entre 2 textes

Normalize - npm install normalize.css https://necolas.github.io/normalize.css/
        > reset css : Pour reset tous les attributions du naviagteur


https://mozilladevelopers.github.io/playground/css-grid/03-firefox-devtools





rem quand on veut fixer une valeur par rappot à la taille de police générale de notre app

Jpeg jpg pour photos
png graphique, apla de couleur ou dégradé simple
svg pour les icons
tfoot td collspan rowspan
62.5% 1rem = 10px, 1.6rem = 16px










**PostCss** - Permet de transformer du css
- npm install postcss --save-dev
    > npx postcss style.css -o style.build.css : Pour exécuter postcss en ligne de commande
- Configuration - `postcss.config.js`
- npm install autoprefixer --save-dev : Le plugin autoprefixer ou utiliser celui en interne de postcss
- Plugins
    > npm install cssnano postcss-nested postcss-import --save-dev : Les ajouter dans `postcss.config.js`, `cssnano` pour minifier le css, `postcss-nested` pour gérer des variables, mixins, boucles
    > `postcss-preset-env` - Permet d’utiliser des fonctionnalités css modernes avant qu’elles ne soient prises en charge par tous les navigateurs un peu comme `Babel` le fait pour JavaScript
        > Inclus aussi `Autoprefixer` automatiquement, plus besoin de l’installer séparément si on utilise ce preset
        > npm install postcss-preset-env --save-dev : 





Voici quelques librairies populaires qui permettent de rassembler / gérer / extraire les media queries en CSS/JS :

postcss‑extract‑media‑query : un plugin PostCSS pour extraire toutes les règles @media d’un fichier CSS et les émettre comme fichiers séparés. 

media‑query‑plugin (par SassNinja) : un plugin pour Webpack permettant d’extraire des media queries spécifiques et de les charger de façon asynchrone. 

css‑mediaquery (par Eric F.) : une librairie JS qui permet de parser une requête média CSS et de tester si elle matche un jeu de valeurs. 


Si tu peux préciser dans quel contexte ("rassembler les media queries" signifie-t-il extraire/réunir/optimiser pour production ? en CSS ou JS ?) je peux te trouver la librairie la plus adaptée pour ton projet.






Parfait — dans Symfony + WebpackEncore, la solution la plus utilisée pour rassembler / combiner / regrouper les media queries est :

✅ postcss-combine-media-query

C’est un plugin PostCSS qui fusionne automatiquement toutes les media queries identiques pour réduire le CSS final.

Exemple :

@media (max-width: 768px) { .a { color: red; } }
@media (max-width: 768px) { .b { color: blue; } }

➡️ devient automatiquement :

@media (max-width: 768px) {
  .a { color: red; }
  .b { color: blue; }
}


---

🔧 Installation

Dans ton projet Symfony avec WebpackEncore :

npm install postcss-combine-media-query --save-dev


---

⚙️ Configuration avec WebpackEncore

Dans postcss.config.js (à la racine de ton projet) :

module.exports = {
    plugins: {
        'postcss-combine-media-query': {}
    }
};

WebpackEncore détecte automatiquement PostCSS si ton fichier existe.


---

📦 Alternative encore meilleure (tri + regroupement)

postcss-sort-media-queries

Permet de :
✔ trier les media queries
✔ fusionner celles identiques
✔ optimiser mobile-first ou desktop-first

Installation :

npm install postcss-sort-media-queries --save-dev

postcss.config.js :

module.exports = {
    plugins: {
        'postcss-sort-media-queries': {
            sort: 'mobile-first'
        }
    }
};


---

🎯 Conclusion

Besoin Librairie recommandée

Juste fusionner / regrouper les media queries postcss-combine-media-query
Trier + regrouper + optimiser postcss-sort-media-queries



---

Si tu veux, je peux te générer :
✅ un fichier webpack.config.js complet
✅ un exemple Sass/SCSS optimisé
✅ une configuration mobile-first ou desktop-first

Dis-moi ce que tu préfères !








Parfait !
Voici les trois options complètes : WebpackEncore + PostCSS + SCSS optimisé.


---

✅ 1. Configuration complète WebpackEncore (webpack.config.js)

À placer dans :
webpack.config.js

const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/app.js')

    // Active SASS/SCSS
    .enableSassLoader()

    // Active PostCSS
    .enablePostCssLoader()

    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();


---

✅ 2. Configuration PostCSS (postcss.config.js)

👉 avec regroupement + tri des media queries (le plus optimisé)

Créer ce fichier à la racine :

module.exports = {
    plugins: {
        'postcss-sort-media-queries': {
            sort: 'mobile-first' // ou 'desktop-first'
        }
    }
};

Pour n’utiliser que le regroupement :

module.exports = {
    plugins: {
        'postcss-combine-media-query': {}
    }
};


---

🧱 Installation des dépendances

Selon l’option choisie :

Option 1 (tri + regroupement)

npm install postcss-sort-media-queries --save-dev

Option 2 (juste regroupement)

npm install postcss-combine-media-query --save-dev


---

🎨 3. Exemple complet en SCSS (mobile-first)

Ton fichier :
assets/styles/app.scss

body {
  background: #f5f5f5;
}

/* Mobile first */
.card {
  padding: 10px;
  background: white;

  @media (min-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 1024px) {
    padding: 30px;
  }
}

.button {
  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
}


---

📦 Résultat après optimisation

PostCSS regroupera automatiquement :

@media (min-width: 768px) {
  .card { padding: 20px; }
  .button { font-size: 18px; }
}

@media (min-width: 1024px) {
  .card { padding: 30px; }
  .button { font-size: 20px; }
}


---

🔥 Tu veux encore mieux ?

Je peux aussi te donner :

une architecture SCSS propre (7–1 architecture)

une version desktop-first

une intégration Tailwind avec Symfony + Encore

la config WebpackEncore + PurgeCSS


Souhaites-tu que je t’installe aussi une architecture SCSS professionnelle ?









Tu peux utiliser PostCSS sans Webpack, sans Vite, sans Gulp, sans bundler — uniquement avec Node.js + la CLI de PostCSS.
Voici la méthode officielle et la plus simple.


---

✅ 1) Installer PostCSS et les plugins nécessaires

Exemple avec postcss et postcss-cli + un plugin (ex : combine media queries) :

npm install postcss postcss-cli postcss-combine-media-query --save-dev



---

✅ 2) Créer un fichier de configuration : postcss.config.js

À la racine du projet :

module.exports = {
  plugins: {
    "postcss-combine-media-query": {}
  }
};

Tu peux y ajouter tous les plugins que tu veux.


---

✅ 3) Créer un fichier CSS source

Ex : src/style.css

.card {
  color: red;
}

@media (max-width: 768px) {
  .card {
    color: blue;
  }
}

@media (max-width: 768px) {
  .button {
    font-size: 20px;
  }
}


---

✅ 4) Compiler avec la CLI PostCSS

Commande manuelle :

npx postcss src/style.css -o dist/style.css

La sortie sera générée sans aucun bundler.


---

▶️ Résultat (dist/style.css)

.card {
  color: red;
}

@media (max-width: 768px) {
  .card {
    color: blue;
  }
  .button {
    font-size: 20px;
  }
}

(Merci au plugin postcss-combine-media-query.)


---

🧩 5) Ajouter une commande NPM pour simplifier

Dans ton package.json :

{
  "scripts": {
    "css": "postcss src/style.css -o dist/style.css --verbose --map"
  }
}

Pour compiler :

npm run css


---

🔥 Bonus : surveiller les fichiers (mode watch)

npx postcss src/style.css -o dist/style.css --watch


---

🔥 Bonus : utiliser PostCSS avec plusieurs fichiers

PostCSS ne gère pas le “glob” nativement, mais tu peux utiliser :

npx postcss "src/**/*.css" --dir dist/


---

🔥 Bonus : utiliser PostCSS avec du SCSS (sans Webpack)

Il suffit d’ajouter un préprocesseur :

npm install postcss-scss postcss-nested --save-dev

Puis :

postcss.config.js :

module.exports = {
  syntax: "postcss-scss",
  plugins: {
    "postcss-nested": {},
    "postcss-combine-media-query": {}
  }
};


---

🎯 Résumé

Tu veux Solution

Utiliser PostCSS sans aucun bundler postcss-cli
Gérer SCSS / nested postcss-scss + plugins
Compresser / optimiser cssnano
Regrouper media queries postcss-combine-media-query ou postcss-sort-media-queries
Automatiser scripts NPM



---

Si tu veux, je peux te générer :
✅ une structure PostCSS complète (production + dev)
✅ un template avec SCSS-like, nesting, variables CSS
✅ un système qui compile automatiquement tout un dossier

Tu veux une architecture PostCSS professionnelle complète ?











https://postcss.org/docs/postcss-plugins











Voici une configuration PostCSS complète, professionnelle, 100% autonome, sans Sass, sans Webpack, sans Vite, sans bundler.
Juste PostCSS seul, avec architecture, scripts, optimisation, plugins essentiels.


---

✅ 1. Structure de projet recommandée

project/
│
├── src/
│   └── styles.css         # votre CSS source
│
├── dist/
│   └── styles.css         # CSS final optimisé
│
├── postcss.config.js
├── package.json
└── .browserslistrc


---

✅ 2. Installer PostCSS + CLI + Plugins

npm install postcss postcss-cli autoprefixer cssnano postcss-combine-media-query postcss-nested postcss-import --save-dev

Plugins inclus :

postcss-import → gérer les imports CSS (@import)

postcss-nested → écrire du CSS avec une syntaxe proche de SCSS

autoprefixer → support navigateurs

cssnano → minifier le build production

postcss-combine-media-query → regrouper les media queries



---

✅ 3. Configuration complète – postcss.config.js

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    "autoprefixer": {},

    // Regroupement des media queries
    "postcss-combine-media-query": {},

    // Minification en production seulement
    ...(isProduction ? { "cssnano": {} } : {})
  }
};

✔ Détection auto dev / prod
✔ Plugins activés selon l'environnement


---

✅ 4. Exemple de CSS source (src/styles.css)

@import "./components/card.css";

body {
  margin: 0;
  padding: 0;
}

/* Nesting (comme SCSS) */
.container {
  display: flex;

  .item {
    padding: 20px;

    @media (max-width: 768px) {
      padding: 10px;
    }

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
}


---

⚙️ 5. Scripts NPM (package.json)

Dans votre package.json :

{
  "scripts": {
    "postcss:dev": "postcss src/styles.css -o dist/styles.css",
    "postcss:prod": "NODE_ENV=production postcss src/styles.css -o dist/styles.css",
    "dev": "npm run postcss:dev",
    "build": "npm run postcss:prod",
    "watch": "postcss src/styles.css -o dist/styles.css --watch"
  }
}


---

▶️ 6. Utilisation

Développement (non minifié, rapide)

npm run dev

Production (minifié + autoprefixer + regroupement)

npm run build

Mode automatique

npm run watch


---

🧩 7. Browserslist (pour autoprefixer)

Créer le fichier .browserslistrc :

> 0.3%
last 2 versions
not dead


---

📦 8. Résultat final après PostCSS

Les media queries sont regroupées automatiquement 🚀

Avant :

.item {
  padding: 20px;
}

@media (max-width: 768px) {
  .item { padding: 10px; }
}

@media (max-width: 768px) {
  .item { font-size: 14px; }
}

Après PostCSS :

.item {
  padding: 20px;
}

@media (max-width: 768px) {
  .item {
    padding: 10px;
    font-size: 14px;
  }
}


---

🎯 Ta configuration PostCSS seule est maintenant complète, moderne, et production-ready.

Si tu veux je peux aussi te préparer :
🔥 une version avec purge CSS (optimisation extrême)
🔥 une version Tailwind + PostCSS
🔥 une organisation du CSS en modules façon SCSS

Quel setup veux-tu ensuite ?











    form {
        width: 100%;
        height: 100%;
        padding: 50px 30px;
        text-align: center;
    }

    h1 {
        font-size: 25px;
        font-weight: 600;
        text-transform: uppercase;
        border-bottom: .5px solid var(--border);
        padding-bottom: 10px;
    }

    .box {
        position: relative;
        width: 100%;
        height: 50px;
        margin: 30px 0;
    }

    .box input {
        width: 100%;
        height: 100%;
        background: transparent;
        border: 2px solid var(--border);
        border-radius: 5px;
        font-size: 18px;
        color: var(--text-color);
        padding: 0 45px;
    }

    .box i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        font-size: 18px;
        color: var(--text-color);
        pointer-events: none; // Indique qu'on ne peut pas le pointer avec la souris
    }

    .forgot {
        margin: -15px 0 30px;
        text-align: right;
    }

    .forgot a {
        text-decoration: none;
        font-size: 16px;
    }

    .forgot a:hover {
        text-decoration: underline;
    }

    button {
        width: 100%;
        height: 50px;
        background-color: var(--primary);
        color: #FFFFFF;
        font-size: 18px;
        font-weight: 500;
        outline: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .signup_link {
        margin-top: 50px;
        font-size: 16px;
    }

    .signup_link a {
        text-decoration: none;
        font-weight: bold;
    }

    .box .toggle_btn {
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: red;
        right: 10px;
        bottom: 10px;
        cursor: pointer;
    }

    .toggle_btn .beam {
        position: absolute;
        width: 340px;
        height: 0; // 125px au clic
        background-color: yellow;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        clip-path: polygon(0 0, 0 100%, 100% 50%);
        mix-blend-mode: difference;
        transform-origin: 100% 50%;
        pointer-events: none;
        overflow: hidden;
        transition: .2s ease-out;
    }

body.dark .beam {
    height: 125px;
}



        <form action="">

            <h1>Connexion</h1>
            <div class="box">
                <input type="text">
                <i>i</i>
            </div>
            <div class="box">
                <input type="password" class="password">
                <i>i</i>
                <div class="toggle_btn">
                    <div class="toggle_icon">
                        <svg>

                        </svg>
                    </div>
                    <div class="beam"></div>
                </div>
            </div>
            <div class="forgot">
                <a href="">Mot de passe oublié !</a>
            </div>
            <button>Se connecter</button>
            <div class="signup_link">
                <p>Vous n'avez pas de compte ? <a href="">S'inscrire</a></p>
            </div>
    
        </form>



<script>
    const toggleBtn = document.querySelector('.toggle-btn')
    const body = document.querySelector('body')
    const passwordInput = document.querySelector('.password')

    toggleBtn.addEventListener('click', e => {
        console.log('OKKK')
        body.classList.toggle('.dark')
        if(passwordInput.type === 'password') {
            passwordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
        }
    })
</script>









/* --- Container --- */
.container, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl, .container-fluid {
    width: 100%;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .container-sm {
        max-width: 540px;
    }
}

@media (min-width: 768px) {
    .container-md, .container-sm {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .container-lg, .container-md, .container-sm {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .container-xl, .container-lg, .container-md, .container-sm {
        max-width: 1140px;
    }
}

@media (min-width: 1400px) {
    .container-xxl, .container-xl, .container-lg, .container-md, .container-sm {
        max-width: 1320px;
    }
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -0.75rem; /* Pour annuler la gouttière des colonnes */
    margin-left: -0.75rem;  /* Pour annuler la gouttière des colonnes */
}

.row > * {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
}

.col {
    flex: 1 0 0%;
    padding-right: 0.75rem; /* Gouttière entre les colonnes */
    padding-left: 0.75rem; /* Gouttière entre les colonnes */
    max-width: 100%;
}

.col-auto {
    flex: 0 0 auto;
    width: auto;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
    max-width: 100%;
}

.col-1 { flex: 0 0 8.33333%; max-width: 8.33333%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-2 { flex: 0 0 16.66667%; max-width: 16.66667%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-3 { flex: 0 0 25%; max-width: 25%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-4 { flex: 0 0 33.33333%; max-width: 33.33333%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-5 { flex: 0 0 41.66667%; max-width: 41.66667%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-6 { flex: 0 0 50%; max-width: 50%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-7 { flex: 0 0 58.33333%; max-width: 58.33333%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-8 { flex: 0 0 66.66667%; max-width: 66.66667%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-9 { flex: 0 0 75%; max-width: 75%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-10 { flex: 0 0 83.33333%; max-width: 83.33333%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-11 { flex: 0 0 91.66667%; max-width: 91.66667%;  padding-right: 0.75rem;
    padding-left: 0.75rem;}
.col-12 { flex: 0 0 100%; max-width: 100%;  padding-right: 0.75rem;
    padding-left: 0.75rem;} 

@media (min-width: 576px) {
    .col-sm { flex: 1 0 0%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-auto { flex: 0 0 auto; width: auto; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-1 { flex: 0 0 8.33333%; max-width: 8.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;} 
    .col-sm-2 { flex: 0 0 16.66667%; max-width: 16.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-3 { flex: 0 0 25%; max-width: 25%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-4 { flex: 0 0 33.33333%; max-width: 33.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-5 { flex: 0 0 41.66667%; max-width: 41.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-6 { flex: 0 0 50%; max-width: 50%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-7 { flex: 0 0 58.33333%; max-width: 58.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-8 { flex: 0 0 66.66667%; max-width: 66.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-9 { flex: 0 0 75%; max-width: 75%; }
    .col-sm-10 { flex: 0 0 83.33333%; max-width: 83.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-11 { flex: 0 0 91.66667%; max-width: 91.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-sm-12 { flex: 0 0 100%; max-width: 100%; }
}
@media (min-width: 768px) {
    .col-md { flex: 1 0 0%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-auto { flex: 0 0 auto; width: auto; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-1 { flex: 0 0 8.33333%; max-width: 8.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-2 { flex: 0 0 16.66667%; max-width: 16.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-3 { flex: 0 0 25%; max-width: 25%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-4 { flex: 0 0 33.66667%; max-width: 33.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-5 { flex: 0 0 41.66667%; max-width: 41.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-6 { flex: 0 0 50%; max-width: 50%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-7 { flex: 0 0 58.33333%; max-width: 58.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-8 { flex: 0 0 66.66667%; max-width: 66.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-9 { flex: 0 0 75%; max-width: 75%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-10 { flex: 0 0 83.33333%; max-width: 83.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-11 { flex: 0 0 91.66667%; max-width: 91.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-md-12 { flex: 0 0 100%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
}
@media (min-width: 992px) {
    .col-lg { flex: 1 0 0%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-auto { flex: 0 0 auto; width: auto; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-1 { flex: 0 0 8.33333%; max-width: 8.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-2 { flex: 0 0 16.66667%; max-width: 16.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-3 { flex: 0 0 25%; max-width: 25%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-4 { flex: 0 0 33.33333%; max-width: 33.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-5 { flex: 0 0 41.66667%; max-width: 41.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-6 { flex: 0 0 50%; max-width: 50%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-7 { flex: 0 0 58.33333%; max-width: 58.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-8 { flex: 0 0 66.66667%; max-width: 66.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-9 { flex: 0 0 75%; max-width: 75%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-10 { flex: 0 0 83.33333%; max-width: 83.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-11 { flex: 0 0 91.66667%; max-width: 91.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-lg-12 { flex: 0 0 100%; max-width: 100%; }
}
@media (min-width: 1200px) {
    .col-xl { flex: 1 0 0%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-auto { flex: 0 0 auto; width: auto; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-1 { flex: 0 0 8.33333%; max-width: 8.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-2 { flex: 0 0 16.66667%; max-width: 16.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-3 { flex: 0 0 25%; max-width: 25%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-4 { flex: 0 0 33.33333%; max-width: 33.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-5 { flex: 0 0 41.66667%; max-width: 41.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-6 { flex: 0 0 50%; max-width: 50%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-7 { flex: 0 0 58.33333%; max-width: 58.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-8 { flex: 0 0 66.66667%; max-width: 66.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-9 { flex: 0 0 75%; max-width: 75%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-10 { flex: 0 0 83.33333%; max-width: 83.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-11 { flex: 0 0 91.66667%; max-width: 91.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xl-12 { flex: 0 0 100%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
}
@media (min-width: 1400px) {
    .col-xxl { flex: 1 0 0%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-auto { flex: 0 0 auto; width: auto; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-1 { flex: 0 0 8.33333%; max-width: 8.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-2 { flex: 0 0 16.66667%; max-width: 16.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-3 { flex: 0 0 25%; max-width: 25%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-4 { flex: 0 0 33.33333%; max-width: 33.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-5 { flex: 0 0 41.66667%; max-width: 41.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-6 { flex: 0 0 50%; max-width: 50%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-7 { flex: 0 0 58.33333%; max-width: 58.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-8 { flex: 0 0 66.66667%; max-width: 66.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-9 { flex: 0 0 75%; max-width: 75%; }
    .col-xxl-10 { flex: 0 0 83.33333%; max-width: 83.33333%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-11 { flex: 0 0 91.66667%; max-width: 91.66667%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
    .col-xxl-12 { flex: 0 0 100%; max-width: 100%;  padding-right: 0.75rem;
        padding-left: 0.75rem;}
}

/* --- Pill --- */
.pill {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 50rem; /* Rendre l'élément rond */
    font-size: 0.875rem;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
}

.pill-green {
    background-color: #28a745;
    color: #fff;
}

.pill-green:hover {
    background-color: #218838;
}

.pill-red {
    background-color: #dc3545;
    color: #fff;
}

.pill-red:hover {
    background-color: #c82333;
}

.pill-yellow {
    background-color: #ffc107;
    color: #212529;
}

.pill-yellow:hover {
    background-color: #e0a800;
}

.pill-grey {
    background-color: #6c757d;
    color: #fff;
}

.pill-grey:hover {
    background-color: #5a6268;
}

.pill-darkgrey {
    background-color: #343a40;
    color: #fff;
}

.pill-darkgrey:hover {
    background-color: #23272b;
}

.pill-small {
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
}

.pill-large {
    padding: 0.5rem 1rem;
    font-size: 1rem;
}

/* --- Bootstrap --- */

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    text-decoration: none;
    border-radius: 0.25rem;
    cursor: pointer;
    border: 1px solid transparent;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    background-color: #007bff;
    color: #fff;
    vertical-align: middle;
}

.btn-primary {
    background-color: #007bff;
    color: #fff;
    border: 1px solid #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn:disabled, .btn[disabled] {
    background-color: #d6d6d6;
    color: #a1a1a1;
    border-color: #d6d6d6;
    cursor: not-allowed;
}

.btn-big {
    padding: 1rem 1.5rem;
    font-size: 1.25rem;
}

.btn-small {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
}

.btn-danger {
    background-color: #dc3545;
    color: #fff;
    border: 1px solid #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #c82333;
}

.btn-success {
    background-color: #28a745;
    color: #fff;
    border: 1px solid #28a745;
}

.btn-success:hover {
    background-color: #218838;
    border-color: #218838;
}

.btn-warning {
    background-color: #ffc107;
    color: #212529;
    border: 1px solid #ffc107;
}

.btn-warning:hover {
    background-color: #e0a800;
    border-color: #e0a800;
}

.btn-info {
    background-color: #17a2b8;
    color: #fff;
    border: 1px solid #17a2b8;
}

.btn-info:hover {
    background-color: #138496;
    border-color: #138496;
}

.btn-light {
    background-color: #f8f9fa;
    color: #212529;
    border: 1px solid #f8f9fa;
}

.btn-light:hover {
    background-color: #e2e6ea;
    border-color: #dae0e5;
}

.btn-dark {
    background-color: #343a40;
    color: #fff;
    border: 1px solid #343a40;
}

.btn-dark:hover {
    background-color: #23272b;
    border-color: #1d2124;
}

.btn-outline-primary {
    color: #0d6efd;
    border-color: #0d6efd;
}

.btn-outline-primary:hover {
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.btn-outline-secondary {
    color: #6c757d;
    border-color: #6c757d;
}

.btn-outline-secondary:hover {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}

.btn-outline-light {
    color: #f8f9fa;
    border-color: #f8f9fa;
}

.btn-outline-light:hover {
    color: #000;
    background-color: #f8f9fa;
    border-color: #f8f9fa;
}

.alert {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.alert-info {
    background-color: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
}

.alert-success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.alert-danger {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.border {
    border: 1px solid #dee2e6 !important;
    margin-top: 10px;
}

.border-primary {
    border-color: #0d6efd !important;
}

.border-secondary {
    border-color: #6c757d !important;
}

.border-success {
    border-color: #198754 !important;
}

.border-danger {
    border-color: #dc3545 !important;
}

.border-warning {
    border-color: #ffc107 !important; /* Bordure jaune */
}

.border-info {
    border-color: #0dcaf0 !important; /* Bordure cyan */
}

.border-light {
    border-color: #f8f9fa !important; /* Bordure claire */
}

.border-dark {
    border-color: #212529 !important; /* Bordure noire */
}

.border-white {
    border-color: #fff !important; /* Bordure blanche */
}

/* Bordures spécifiques */
.border-top {
    border-top: 1px solid #dee2e6 !important; /* Bordure en haut */
}

.border-end {
    border-right: 1px solid #dee2e6 !important; /* Bordure à droite */
}

.border-bottom {
    border-bottom: 1px solid #dee2e6 !important; /* Bordure en bas */
}

.border-start {
    border-left: 1px solid #dee2e6 !important; /* Bordure à gauche */
}

.border-0 {
    border: 0 !important; /* Supprime la bordure */
}

.rounded-1 { border-radius: 0.2rem; }
.rounded-2 { border-radius: 0.3rem; }
.rounded-3 { border-radius: 0.4rem; }
.rounded-4 { border-radius: 0.5rem; }
.rounded-5 { border-radius: 1rem; }
.rounded-circle { border-radius: 50%; }
.rounded-pill { border-radius: 50rem; }

.rounded-top {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
}

.rounded-end {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
}

.rounded-bottom {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
}

.rounded-start {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
}

/* Close */
.close {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    color: #000;
    text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
    opacity: .5;
    cursor: pointer;
    background: transparent;
    border: none;
}

.close:hover {
    opacity: .75;
}

.close:focus {
    outline: none;
    box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .5);
}

/* Focus */
:focus {
    outline: none; /* Supprime l'outline par défaut */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Anneau de focus */
}

/* Style de base pour les tables */
.table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}

/* En-tête de table avec couleur de fond */
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}

/* Table avec lignes alternées */
.table-striped tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
}

/* Table avec bordures */
.table-bordered {
    border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
    border: 1px solid #dee2e6;
}

/* Table avec effet au survol */
.table-hover tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.075);
}

/* Table compacte (petite) */
.table-sm th,
.table-sm td {
    padding: 0.3rem;
}

/* Table responsive */
.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.table-responsive > .table-bordered {
    border: 0;
}

/* Style de base pour les blockquotes */
blockquote {
    font-size: 1.25rem;
    font-weight: 300;
    color: #6c757d;
}

blockquote p {
    margin-bottom: 0.5rem;
}

blockquote::before {
    content: open-quote;
    font-size: 3rem;
    line-height: 0;
    vertical-align: -0.4em;
    color: #d6d8db;
}

blockquote::after {
    content: close-quote;
    font-size: 3rem;
    line-height: 0;
    vertical-align: -0.4em;
    color: #d6d8db;
}

/* Style pour le footer d’un blockquote (auteur) */
.blockquote-footer {
    display: block;
    font-size: 0.875rem;
    color: #6c757d;
}

.blockquote-footer::before {
    content: "— ";
}


/* Conteneur de la figure */
.figure {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem 1rem 0;
}

/* Image dans la figure */
.figure-img {
    margin-bottom: 0.5rem;
    line-height: 1;
    border-radius: 0.25rem;
}

/* Légende de la figure */
.figure-caption {
    font-size: 0.875rem;
    color: #6c757d;
    text-align: center;
}


/* Images fluides */
.img-fluid {
    max-width: 100%;
    height: auto;
}

/* Style pour les vignettes */
.img-thumbnail {
    padding: 0.25rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    max-width: 100%;
    height: auto;
}


/* Card */
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .375rem;
}

.card-header {
    padding: 1rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, .03);
    border-bottom: 1px solid rgba(0, 0, 0, .125);
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
}

.card-title {
    margin-bottom: .75rem;
}

.card-subtitle {
    margin-top: 0;
    margin-bottom: .5rem;
}

.card-text {
    margin-top: 0;
    margin-bottom: 1rem;
}

.card-link {
    font-size: 1rem;
    color: #0d6efd;
    text-decoration: none;
}

.card-link:hover {
    text-decoration: underline;
}

.card-img-top {
    width: 100%;
    height: auto;
    border-top-left-radius: .375rem;
    border-top-right-radius: .375rem;
}

.card-img-bottom {
    width: 100%;
    height: auto;
    border-bottom-left-radius: .375rem;
    border-bottom-right-radius: .375rem;
}

.card-footer {
    padding: 1rem 1.25rem;
    background-color: rgba(0, 0, 0, .03);
    border-top: 1px solid rgba(0, 0, 0, .125);
}


/* Input-group */
/* Structure de base pour les groupes d'entrée */
.input-group {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
}

.input-group > .form-control,
.input-group > .form-select {
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
    margin-bottom: 0;
}

/* Styles pour les éléments ajoutés au début ou à la fin */
.input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

/* Supprime la bordure entre les éléments du groupe */
.input-group > .form-control:not(:last-child),
.input-group > .form-select:not(:last-child),
.input-group > .input-group-text:not(:last-child),
.input-group > .btn:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
  
.input-group > .form-control:not(:first-child),
.input-group > .form-select:not(:first-child),
.input-group > .input-group-text:not(:first-child),
.input-group > .btn:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

/* Petit format pour les éléments du groupe */
.input-group-sm > .form-control,
.input-group-sm > .form-select,
.input-group-sm > .input-group-text {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
}

/* Grand format pour les éléments du groupe */
.input-group-lg > .form-control,
.input-group-lg > .form-select,
.input-group-lg > .input-group-text {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: 0.3rem;
}


/* Form */
.form-group {
    margin-bottom: 1rem;
}

.form-label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: #212529; /* Couleur de base pour le texte */
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-control-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.2rem;
}

.form-control-lg {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    border-radius: 0.3rem;
}

.form-control[type="file"] {
    overflow: hidden;
}

.form-control:disabled,
.form-control[readonly] {
   background-color: #e9ecef;
   opacity: 1;
}

.form-text {
    display: block;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #6c757d;
}

.form-check {
    position: relative;
    display: block;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
}

.form-check-input {
    position: absolute;
    margin-top: 0.3rem;
    margin-left: -1.5rem;
}

.form-check-input[type="radio"] {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #ced4da;
}

.form-check-input[type="checkbox"] {
    width: 1.25em;
    height: 1.25em;
    border-radius: 0.25em;
    background-color: #fff;
    border: 1px solid #ced4da;
}

.form-check-input:checked {
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.form-check-label {
    margin-bottom: 0;
}

.form-select {
    display: block;
    width: 100%;
    padding: 0.375rem 1.75rem 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4L2 0zm0 5L0 3h4l-2 2z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    appearance: none; /* Supprime le style par défaut des naviagteurs*/
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-select:focus {
    border-color: #80bdff;
    outline: 0;
    /* box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); */
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-inline .form-group {
    display: inline-block;
    margin-bottom: 0;
    vertical-align: middle;
}

@media (max-width: 576px) {
    .form-inline .form-group {
        display: block;
        width: 100%;
    }
}

textarea.form-control {
    height: auto;
}

.form-label.required::after {
    content: '*';
    color: #dc3545;
    margin-left: 0.25rem;
}

/* Ombre par défaut */
.shadow {
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, 0.075) !important;
}

/* Petite ombre */
.shadow-sm {
    box-shadow: 0 .0625rem .125rem rgba(0, 0, 0, 0.075) !important;
}

/* Grande ombre */
.shadow-lg {
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

/* Pas d'ombre */
.shadow-none {
    box-shadow: none !important;
}

/* Pagination de base */
.pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.375rem;
}

/* Liens de pagination */
.page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #0d6efd;
    background-color: #fff;
    border: 1px solid #dee2e6;
}

.page-link:hover {
    color: #0a58ca;
    background-color: #e9ecef;
    border-color: #dee2e6;
}

/* Active */
.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}

/* Désactivé */
.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}

/* Tailles : Petit */
.pagination-sm .page-link {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
}

/* Tailles : Grand */
.pagination-lg .page-link {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
    border-radius: 0.5rem;
}

.flex { display: flex; }

.flex-end {
    display: flex;
    justify-content: flex-end;
}

.flex-start {
    display: flex;
    justify-content: flex-start;
}

/* Conteneur de la barre d'onglets */
ul.tabs-bar {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
    border-bottom: 2px solid #ddd;
    justify-content: flex-start;
}

/* Onglet individuel */
ul.tabs-bar > li {
    margin-right: 1rem; /* Espacement horizontal entre les onglets */
}

/* Lien d'onglet */
ul.tabs-bar > li > a {
    display: inline-block;
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    text-decoration: none;
    color: #007bff;
    background-color: transparent;
    border: 1px solid transparent; /* Bordure transparente pour les liens non actifs */
    border-radius: 0.25rem 0.25rem 0 0; /* Coins arrondis en haut de l'onglet */
    transition: background-color 0.3s, border-color 0.3s, color 0.3s; /* Transition pour les effets de survol et d'activation */
}

/* Onglet actif (l'onglet sélectionné) */
ul.tabs-bar > li.active > a {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

/* Onglet survolé */
ul.tabs-bar > li > a:hover {
    background-color: #f1f1f1;
    border-color: #ddd;
    color: #0056b3;
}

/* Onglet désactivé (lorsque l'onglet n'est pas sélectionnable) */
ul.tabs-bar > li.disabled > a {
    color: #6c757d;
    pointer-events: none;
    background-color: #f8f9fa;
    border-color: #ddd;
}

/* Onglet avec petite taille */
ul.tabs-bar.small > li > a {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

/* Onglet avec grande taille */
ul.tabs-bar.large > li > a {
    padding: 1rem 1.5rem;
    font-size: 1.25rem;
}

/* Pour le premier onglet (coins arrondis à gauche) */
ul.tabs-bar > li:first-child > a {
    border-radius: 0.25rem 0 0 0.25rem; /* Coins arrondis à gauche */
}

/* Pour le dernier onglet (coins arrondis à droite) */
ul.tabs-bar > li:last-child > a {
    border-radius: 0 0.25rem 0.25rem 0; /* Coins arrondis à droite */
}


/* Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

/* Conteneur de grille avec 2 colonnes */
.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

/* Style pour les éléments à l'intérieur de la grille */
.grid > div, .grid-2 > div {
    padding: 0.5rem;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
}

/* Champ qui occupe toute la largeur */
.full-width {
    grid-column: span 2; /* Étend le champ sur les deux colonnes */
}

/* Formulaire à une seule colonne */
.single-column {
    display: block; /* Passe à une seule colonne */
}

.text-center {
    text-align: center;
}

.text-right {
    text-align: right;
}

.mt-1 { margin-top: 1rem; }
.mt-2 { margin-top: 2rem; }
.mb-1 { margin-bottom: 1rem; }
.mb-2 { margin-bottom: 2rem; }
.pt-1 { padding-top: 1rem; }
.pt-2 { padding-top: 2rem; }
.pb-1 { padding-bottom: 1rem; }
.pb-2 { padding-bottom: 2rem; }

button:focus,
input:focus,
textarea:focus,
select:focus {
    outline: none; /* Supprime l'outline par défaut */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Couleur personnalisée de l'anneau de focus */
}

/* Styles spécifiques pour les éléments de formulaire */
input:focus,
textarea:focus,
select:focus {
    border-color: #80bdff; /* Couleur de la bordure lorsqu'en focus */
    outline: none; /* Supprime l'outline */
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Couleur de l'anneau de focus */
}

/* Listes */
.list-group {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    margin-top: 5px;
}

.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
    transition: background-color .15s ease-in-out;
    color: #495057;
    text-decoration: none;
}

.list-group-item:hover {
    background-color: rgba(0, 0, 0, .05);
}

.list-group-item.active {
    z-index: 2;
    color: #fff;
    background-color: #0d6efd;
    border-color: #0d6efd;
}

.list-group-item.active:hover {
    background-color: #0b5ed7;
}

.list-group-item.disabled {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
}

.list-group-flush {
    border-radius: 0;
}

.list-group-flush .list-group-item {
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, .125);
}

.list-group-item-heading {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.list-group-item-text {
    margin-bottom: 0;
}

.unordered-list,
.ordered-list {
    max-width: 600px; /* Largeur maximale pour les listes */
    margin: 20px auto; /* Centrer les listes */
    padding: 0;
    list-style-position: inside; /* Positionner les puces à l'intérieur */
}

.unordered-list li,
.ordered-list li {
    padding: 10px; /* Espacement interne */
    background-color: #fff; /* Couleur de fond */
    border: 1px solid #ddd; /* Bordure */
    margin: 5px 0; /* Espacement entre les éléments */
    border-radius: 4px; /* Coins arrondis */
    transition: background-color 0.3s; /* Transition pour le survol */
}

.unordered-list li:hover,
.ordered-list li:hover {
    background-color: #f1f1f1; /* Couleur de fond au survol */
}

.list-group {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 20px auto;
    padding: 0;
    list-style: none;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
}

.list-group-item {
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.list-group-item:last-child {
    border-bottom: none; /* Remove the border for the last item */
}

.list-group-item:hover {
    background-color: #f0f0f0;
}

.list-group-item.selected {
    background-color: #007bff;
    color: white;
}
/* ----- */
.rebond {
    width: 150px;
    height: 150px;
    background-color: rgb(255, 196, 254);
    position: relative;
}

.balle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: black;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    animation: rebond 2s alternate infinite cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.sol {
    background-color: green;
    height: 5px;
    position: absolute;
    width: 100%;
    bottom: 0;
}

@keyframes rebond {
    from {
        bottom: 80%;
    }
    90% {
        transform: translateX(-50%) rotateX(0);
    }
    to {
        bottom: -3px;
        transform: translateX(-50%) rotateX(60deg);
    }
}

.inner {
    width: 400px;
    background: #4070f4;
    padding: 1em;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    clip-path: circle(8% at 90% 20%);
}

.inner:hover {
    clip-path: circle(75%);
    background: #0b8c4c;
}

.inner span {
    position: relative;
    float: right;
    color: #fff;
    font-weight: 700;
    margin-right: 6%;
    transition: color 0.5s;
}

.inner:hover span {
    color: transparent;
}

.inner h1 {
    color: #fff;
    margin: 0;
}

.inner p {
    color: #fff;
    font-size: 0.8em;
}

.wrapper {
    position: relative;
    height: 200px;
    width: 200px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wrapper .img {
    position: absolute;
    width: 150px;
    height: 150px;
    background: url(../src/images/img.png);
    background-size: cover;
    border-radius: 50%;
    filter: brightness(1.5) contrast(1.5);
}

.wrapper .text {
    position: absolute;
    width: 100%;
    height: 100%;
    animation: rotate 10s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.wrapper .text span {
    position: absolute;
    left: 50%;
    font-size: 1.2em;
    font-weight: bold;
    transform-origin: 0 100px;
}

:root {
    --first-color: hsl(230, 100%, 50%);
    --second-color: hsl(150, 100%, 38%);
    --title-color: hsl(230, 24%, 12%);
    --text-color: hsl(230, 4%, 60%);
    --gray-color: hsl(230, 24%, 88%);
    --border-color: hsl(230, 4%, 92%);
    --body-color: hsl(230, 100%, 98%);
    --container-color: hsl(0, 0%, 100%);
    --h2-font-size: 1.25rem;
    --normal-font-size: 1rem;
}

ul {
    list-style: none;
}

:root {
    --first-color: hsl(225, 72%, 55%);
    --container-color: hsl(225, 75%, 97%);
}

.dropdown {
    position: relative;
    width: max-content;
    transform: translateY(-5rem); /* -- */
}

.dropdown__button, 
.dropdown__item {
    display: flex;
    align-items: center;
    column-gap: .5rem;
}

.dropdown__button {
    border: none;
    outline: none;
    background-color: var(--container-color);
    padding: 1.25rem;
    border-radius: .75rem;
    cursor: pointer;
}

.dropdown__icon, 
.dropdown__icons {
    font-size: 1.25rem;
    color: var(--first-color);
}

.dropdown__name {
    font-weight: 500;
}

.dropdown__icons {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
}

.dropdown__arrow, 
.dropdown__close {
    position: absolute;
    transition: opacity .1s, transform .4s;
}

.dropdown__close {
    opacity: 0;
}

.dropdown__menu {
    background-color: var(--container-color);
    padding: 1rem 1.25rem;
    border-radius: .75rem;
    display: grid;
    row-gap: 1.5rem;
    position: absolute;
    width: 100%;
    left: 0;
    top: 4.5rem;

    transform: scale(.1);
    transform-origin: 10rem -2rem;
    pointer-events: none;
    transition: opacity .4s, transform .4s;
    opacity: 0;
}

.dropdown__item {
    cursor: pointer;
    transition: color .3s;
}

.dropdown__item:hover {
    color: var(--first-color);
}

/* ----Rotate & hide icon---- */
.show-dropdown .dropdown__close {
    opacity: 1;
    transform: rotate(-180deg);
}

.show-dropdown .dropdown__arrow {
    opacity: 0;
    transform: rotate(-180deg);
}

/* ----Show dropdown menu---- */
.show-dropdown .dropdown__menu {
    opacity: 1;
    transform: scale(1);
    pointer-events: initial;
}















.bullet {
    display: block;
    width: 6px;
    border-radius: 6px;
    height: 6px;
    margin-left: auto;
    margin-right: auto;
    background: #23db72;
    animation: flash 1s infinite;
}

@keyframes flash {
    to {
        opacity: 0;
    }
    from {
        opacity: 1;
    }
}

.bullet-danger {
    background: #fb4635;
}

.bullet-warning {
    background: yellow;
}

.bullet-primary {
    background: blue;
}

.layout-sidebar {
    --gap: 5;
    width: 100%;
    padding-left: calc(50% - var(--container-width) / 2);
    padding-right: calc(50% - var(--container-width) / 2);
    display: grid;
    gap: calc(var(--gap) * var(--space));
    grid-template-columns: 1fr;

    & > * {
      min-width: 0;
    }

    @media only screen and (min-width: 1100px) {
        grid-template-columns: 1fr 300px;
    }
}

.flex {
    display: flex !important;
    align-items: center;
    justify-content: space-between;

    & > * {
        min-width: 0;
    }
}

.flex-end { justify-content: flex-end; }
.flex-start { justify-content: flex-start; }
.flex-end { justify-content: flex-end; }
.flex-center { justify-content: center; }
.flex-none { flex: none; }
.stretch { align-items: stretch; }

.text-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
}

.relative {
    position: relative;
}

.absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
}

.sticky {
    position: sticky;
    top: 25px;
}

.hidden {
    display: none;
}

.avatar {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #CCC;
    background-color: #f0f0f0;
    transition: transform 0.3s ease, border-color 0.3s ease;
    position: relative;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-small {
    width: 50px;
    height: 50px;
}

.avatar-large {
    width: 150px;
    height: 150px;
}

.pill {
    flex: none;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    position: relative;
    padding: space(1) space(2);
    color: var(--contrast);
    font-size: .875rem;
    font-weight: bold;
    z-index: 1;
    overflow: hidden;
    border-radius: 20px;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: currentColor;
        opacity: 0.1;
        transition: opacity .3s;
        z-index: -1;
    }
}

a.pill:hover::after {
    opacity: .2;
}

.pill svg {
    width: 16px;
    height: 16px;
    margin-right: space(1);
}

.pill.small {
    font-size: .75rem;
    height: 18px;
    padding: 0 5px;
    font-weight: normal;
    line-height: 18px;
    border-radius: 3px;

    .icon {
        transform: none;
        margin-right: space(.5);
        display: block;
        width: 12px;
        height: 12px;
    }
}

.pill-green { color: var(--green); }
.pill-yellow { color: var(--yellow); }
.pill-red { color: var(--red); }

.pill-darkgrey {
    color: #FFF;

    &::after {
        opacity: 1;
        background-color: #9fb3c8;
    }
}

.triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    /* border-right: 10px solid #FF0000; */
    border-bottom: 10px solid transparent ;
    border-left: 10px solid #0000FF;
}

ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
}

li::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #0000FF;
    margin: 0 10px;
}

.diagonal {
    display: inline-block;
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
    color: #FFF;
    background-color: #000;
    margin: 20px 12px;
    position: relative;
}

.diagonal::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: -16px; /* Ici je l'ai sorti de mon block */
    width: 0;
    height: 0;
    background-color: #0000FF;
    border-top: 25px solid #000;
    border-right: 16px solid transparent;
}

.diagonal::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -16px;
    width: 0;
    height: 0;
    background-color: #0000FF;
    border-bottom: 25px solid #000;
    border-left: 16px solid transparent;
}

.fixe {
    background-color: #007bff;
    height: 3px;
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
}

.guirlande {
    pointer-events: none;
    z-index: 10;
    width: 100%;
    height: 150px;
    position: absolute;
    top: 150px;
    left: 0;
}

.guirlande1 {
    height: 120px;
    background: url(../src/images/guirlande1.png) repeat-x 300% top;
    top: -23px;
}

.guirlande2 {
    background: url(../src/images/guirlande2.png) repeat-x 70% top;
    top: -71px;
}

.guirlande3 {
    background: url(../src/images/guirlande3.png) repeat-x 10% top;
    top:-50px;
}





Pour sortir la pipette on appuie sur i sur figma














        <!-- Il faut éviter de l'utiliser si on n'a des éléments en arrière plan -->
    <div id="guirland1" class="guirland guirlande1"></div>
    <div id="guirland2" class="guirland guirlande2"></div>
    <div id="guirland3" class="guirland guirlande3"></div>
    <div class="fixe">Fixe</div>

    <div class="bullet bullet-danger"></div>

    <hr>
    <div class="animate-flash">Flash</div>
    <div class="bullet bullet-danger"></div>
    <div class="bullet bullet-warning"></div>
    <div class="bullet bullet-primary"></div>
    <div class="bloc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, inventore fugit nulla voluptatum voluptas, numquam obcaecati ratione consequatur sit sunt praesentium culpa voluptatibus provident asperiores? Amet vero id maiores illum.
    </div>
    <div class="background">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa quam ad perferendis fugiat similique reiciendis, at incidunt consequatur est magni animi odio esse quibusdam pariatur dicta nisi ipsum dolore deleniti.
    <div class="center-grid">Centre grid</div>
    <iframe src="./snow/index.html" frameborder="0"></iframe>


    <div class="triangle"></div>
    <ul>
        <li>AAAA</li>
    </ul>
    <div class="diagonal">diagonal</div>

    <section class="rebond">
        <div class="balle"></div>
        <div class="sol"></div>
    </section>

    <div class="inner">
        <span>i</span>
        <h1>Tivotal</h1>
        <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam earum
            facilis similique aperiam delectus alias.
        </p>
    </div>

    <div class="wrapper">
        <div class="img"></div>
        <div class="text">
            <p>David Mehra - Certified Frontend Developer -</p>
        </div>
    </div>

    <div class="dropdown" id="dropdown-content"> <!-- Remix icon -->
        <button class="dropdown__button" id="dropdown-button">
            <i class="ri-user-3-line dropdown__icon"></i>
            <span class="dropdown__name">My profile</span>
            <div class="dropdown__icons">
                <i class="ri-arrow-down-s-line dropdown__arrow"></i>
                <i class="ri-close-line dropdown__close"></i>
            </div>
        </button>
        <ul class="dropdown__menu">
            <li class="dropdown__item">
                <i class="ri-message-3-line dropdown__icon"></i> 
                <span class="dropdown__name">Messages</span>
            </li>
            <li class="dropdown__item">
                <i class="ri-lock-line dropdown__icon"></i>
                <span class="dropdown__name">Accounts</span>
            </li>
            <li class="dropdown__item">
                <i class="ri-settings-3-line dropdown__icon"></i>
                <span class="dropdown__name">Settings</span>
            </li>
        </ul>
    </div>

    <script>
        let text = document.querySelector(".text p");
        text.innerHTML = text.innerText
            .split("")
            .map(
                (char, i) => `<span style="transform:rotate(${i * 8}deg)">${char}</span>`
            )
            .join("");

        const showDropdown = (content, button) =>{
            const dropdownContent = document.getElementById(content),
                dropdownButton = document.getElementById(button)
            dropdownButton.addEventListener('click', () => {
                dropdownContent.classList.toggle('show-dropdown')
            })
        }
        showDropdown('dropdown-content','dropdown-button')
    </script>







    <div class="container-sm">
        <div class="row">
            <div class="col-auto">Colonne ajustée</div>
            <div class="col-auto">Colonne ajustée 2</div>
            <div class="col-auto">Largeur auto</div>
        </div>
        <div class="row">
            <div class="col-6">Colonne 1</div>
            <div class="col-6">Colonne 2</div>
        </div>
        <div class="row">
            <div class="col-4">Colonne 1</div>
            <div class="col-4">Colonne 2</div>
            <div class="col-4">Colonne 3</div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1">Col 1</div>
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1">Col 2</div>
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 col-xxl-1">Col 3</div>
            <div class="col-12">Colonne pleine largeur</div>
        </div>
    </div>

    <span class="pill pill-green">Vert</span>
    <span class="pill pill-red">Rouge</span>
    <span class="pill pill-yellow">Jaune</span>
    <span class="pill pill-grey">Gris</span>
    <span class="pill pill-darkgrey">Gris foncé</span>
    <span class="pill pill-green pill-small">Petit Vert</span>
    <span class="pill pill-blue pill-small">Petit Bleu</span>
    <span class="pill pill-green pill-large">Grand Vert</span>
    <span class="pill pill-yellow pill-large">Grand Jaune</span>

    <div class="flex" style="border: 1px solid #ccc; padding: 10px;">
        <div>Élément 1</div>
        <div>Élément 2</div>
        <div>Élément 3</div>
    </div>
    <div class="flex-end" style="border: 1px solid #ccc; padding: 10px;">
        <div>Élément A</div>
        <div>Élément B</div>
        <div>Élément C</div>
    </div>
    <div class="flex-start" style="border: 1px solid #ccc; padding: 10px;">
        <div>Élément X</div>
        <div>Élément Y</div>
        <div>Élément Z</div>
    </div>

    <button class="btn">Bouton par défaut</button>
    <button class="btn btn-primary">Bouton primaire</button>
    <button class="btn btn-danger">Bouton danger</button>
    <button class="btn btn-success">Bouton succès</button>
    <button class="btn btn-warning">Bouton avertissement</button>
    <button class="btn btn-info">Bouton information</button>
    <button class="btn btn-light">Bouton léger</button>
    <button class="btn btn-dark">Bouton sombre</button>
    <br><br>
    <button class="btn btn-primary btn-big">Bouton primaire grand</button>
    <button class="btn btn-primary btn-small">Bouton primaire petit</button>
    <br><br>
    <button class="btn btn-primary-outlined">Bouton primaire bordé</button>
    <button class="btn btn-primary-outlined btn-big">Bouton primaire bordé grand</button>
    <br><br>
    <button class="btn" disabled>Bouton désactivé</button>
    <button class="btn btn-primary" disabled>Bouton primaire désactivé</button>

    <div class="alert alert-info">
        <strong>Info:</strong> Ceci est un message informatif.
    </div>
    <div class="alert alert-success">
        <strong>Succès:</strong> L'opération a été effectuée avec succès.
    </div>
    <div class="alert alert-danger">
        <strong>Erreur:</strong> Une erreur est survenue. Veuillez réessayer plus tard.
    </div>


    <div class="border border-primary rounded p-3">
        Exemple de bordure avec arrondi
    </div>

    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
        &times;
    </button>

    <div class="container">
        <h5>Exemple d'Ombre</h5>
        <div class="shadow p-3 mb-3 bg-white">
            Ceci est un conteneur avec une ombre standard.
        </div>
        <div class="shadow-sm p-3 mb-3 bg-white">
            Ceci est un conteneur avec une petite ombre.
        </div>
        <div class="shadow-lg p-3 mb-3 bg-white">
            Ceci est un conteneur avec une grande ombre.
        </div>
        <div class="shadow-none p-3 mb-3 bg-white">
            Ceci est un conteneur sans ombre.
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <img src="" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Titre de la carte</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Sous-titre</h6>
                    <p class="card-text">Texte de la carte.</p>
                    <a href="#" class="card-link">Lien 1</a>
                    <a href="#" class="card-link">Lien 2</a>
                    </div>
                    <div class="card-footer">
                    Footer de la carte
                    </div>  
                </div>
            </div>
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <img src="" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Titre de la carte</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Sous-titre</h6>
                    <p class="card-text">Texte de la carte.</p>
                    <a href="#" class="card-link">Lien 1</a>
                    <a href="#" class="card-link">Lien 2</a>
                    </div>
                    <div class="card-footer">
                    Footer de la carte
                    </div>  
                </div>
            </div>
            <div class="col-4">
                <div class="card" style="width: 18rem;">
                    <img src="" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Titre de la carte</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Sous-titre</h6>
                    <p class="card-text">Texte de la carte.</p>
                    <a href="#" class="card-link">Lien 1</a>
                    <a href="#" class="card-link">Lien 2</a>
                    </div>
                    <div class="card-footer">
                    Footer de la carte
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Table de base -->
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Âge</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Jean</td>
                <td>29</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Marie</td>
                <td>32</td>
            </tr>
        </tbody>
    </table>

    <!-- Table avec style supplémentaire -->
    <table class="table table-striped table-bordered table-hover table-sm">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Âge</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Jean</td>
                <td>29</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Marie</td>
                <td>32</td>
            </tr>
        </tbody>
    </table>

    <!-- Table responsive -->
    <div class="table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Âge</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Jean</td>
                    <td>29</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Marie</td>
                    <td>32</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="container mt-5">
        <h2>Formulaire avec Input Groups</h2>
        <form>
            <!-- Input Group avec Préfixe -->
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input type="text" class="form-control" placeholder="Nom d'utilisateur" aria-label="Nom d'utilisateur" aria-describedby="basic-addon1">
            </div>
            <!-- Input Group avec Suffixe -->
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Entrez le montant" aria-label="Montant">
                <span class="input-group-text">€</span>
            </div>
            <!-- Input Group avec un bouton -->
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Entrez votre email" aria-label="Email">
                <button class="btn btn-outline-secondary" type="button">S'inscrire</button>
            </div>
            <!-- Input Group avec un select -->
            <div class="input-group mb-3">
                <select class="form-select" aria-label="Sélectionnez une option">
                    <option selected>Choisissez une option...</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
                <span class="input-group-text">Sélection</span>
            </div>
            <button type="submit" class="btn btn-primary">Soumettre</button>
        </form>
    </div>

    <ul class="tabs-bar">
        <li class="active"><a href="#">Onglet 1</a></li>
        <li><a href="#">Onglet 2</a></li>
        <li><a href="#">Onglet 3</a></li>
        <li class="disabled"><a href="#">Onglet 4 (désactivé)</a></li>
    </ul>
    <ul class="tabs-bar small">
        <li class="active"><a href="#">Petit Onglet 1</a></li>
        <li><a href="#">Petit Onglet 2</a></li>
    </ul>
    <ul class="tabs-bar large">
        <li class="active"><a href="#">Grand Onglet 1</a></li>
        <li><a href="#">Grand Onglet 2</a></li>
        <li><a href="#">Grand Onglet 3</a></li>
    </ul>

    <div class="grid">
        <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa iste perspiciatis porro. Magni voluptatem, facere dolore hic qui aspernatur excepturi sunt nisi debitis, sint a commodi et blanditiis aliquam! Eos.
        </div>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aperiam harum similique ab deleniti voluptas, maiores, aspernatur explicabo suscipit rerum neque molestiae cumque voluptatibus sit. Reprehenderit ab neque aspernatur. Ducimus.
            Illum modi enim ipsam corrupti totam autem ipsum ut atque quaerat vero provident blanditiis iure, nisi libero, saepe earum, tempore neque nulla quibusdam animi nobis ad explicabo? Doloribus, tenetur error.
        </div>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aperiam harum similique ab deleniti voluptas, maiores, aspernatur explicabo suscipit rerum neque molestiae cumque voluptatibus sit. Reprehenderit ab neque aspernatur. Ducimus.
            Illum modi enim ipsam corrupti totam autem ipsum ut atque quaerat vero provident blanditiis iure, nisi libero, saepe earum, tempore neque nulla quibusdam animi nobis ad explicabo? Doloribus, tenetur error.
        </div>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis aperiam harum similique ab deleniti voluptas, maiores, aspernatur explicabo suscipit rerum neque molestiae cumque voluptatibus sit. Reprehenderit ab neque aspernatur. Ducimus.
            Illum modi enim ipsam corrupti totam autem ipsum ut atque quaerat vero provident blanditiis iure, nisi libero, saepe earum, tempore neque nulla quibusdam animi nobis ad explicabo? Doloribus, tenetur error.
        </div>
    </div>

    <blockquote class="blockquote">
        <p>La simplicité est la sophistication ultime.</p>
        <footer class="blockquote-footer">Leonard de Vinci</footer>
    </blockquote>

    <figure class="figure">
        <img src="" class="figure-img img-fluid rounded" alt="Image description">
        <figcaption class="figure-caption">Une légende descriptive pour l'image ci-dessus.</figcaption>
    </figure>

    <!-- Image fluide qui s'adapte à son conteneur -->
    <img src="" class="img-fluid" alt="Image fluide">
    <!-- Image avec coins arrondis -->
    <img src="" class="rounded" alt="Image arrondie">
    <!-- Image complètement ronde -->
    <img src="" class="rounded-circle" alt="Image ronde">
    <!-- Image avec style de vignette -->
    <img src="" class="img-thumbnail" alt="Image vignette">

    <form>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Adresse e-mail</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Entrez votre e-mail">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Entrez votre mot de passe">
        </div>
        <button type="submit" class="btn btn-primary">Soumettre</button>
    </form>

    <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action">Élément 1</a>
        <a href="#" class="list-group-item list-group-item-action">Élément 2</a>
        <a href="#" class="list-group-item list-group-item-action active" aria-current="true">Élément actif</a>
        <a href="#" class="list-group-item list-group-item-action disabled" aria-disabled="true">Élément désactivé</a>
    </div>

    <!-- Pagination de base -->
    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
            <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
            <a class="page-link" href="#">Next</a>
        </li>
        </ul>
    </nav>

    <!-- Pagination grande -->
    <nav aria-label="Large page navigation">
        <ul class="pagination pagination-lg">
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
            <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul>
    </nav>

    <!-- Pagination petite -->
    <nav aria-label="Small page navigation">
        <ul class="pagination pagination-sm">
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active" aria-current="page">
            <a class="page-link" href="#">2</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        </ul>
    </nav>

    <ul class="unordered-list">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
    </ul>

    <ol class="ordered-list">
        <li>First Item</li>
        <li>Second Item</li>
        <li>Third Item</li>
        <li>Fourth Item</li>
    </ol>

    <div class="list-group">
        <div class="list-group-item" onclick="selectItem(this)">Item 1</div>
        <div class="list-group-item" onclick="selectItem(this)">Item 2</div>
        <div class="list-group-item" onclick="selectItem(this)">Item 3</div>
        <div class="list-group-item" onclick="selectItem(this)">Item 4</div>
        <div class="list-group-item" onclick="selectItem(this)">Item 5</div>
    </div>

    <script>
        function selectItem(element) {
            // Remove 'selected' class from any other list-group-item
            const items = document.querySelectorAll('.list-group-item');
            items.forEach(item => item.classList.remove('selected'));
            // Add 'selected' class to the clicked item
            element.classList.add('selected');
        }
    </script>



































Excellent 🔥
On va donc faire deux versions complètes de ton système de grille personnalisé :

1. 🧱 Version 1 – Flexbox (avec gestion des gutters g-1 à g-5)


2. 🧩 Version 2 – CSS Grid moderne (plus simple et puissant)



Ces deux systèmes sont indépendants : tu peux utiliser l’un ou l’autre, ou même les deux selon ton projet.


---

🧱 VERSION 1 — Système FLEXBOX complet avec gutters (g-1 → g-5)

📄 Fichier : grid-flex.css

/* ================================
   SYSTEME DE GRILLE FLEXBOX PERSONNEL
   avec Gutters et Breakpoints
   ================================ */

/* ---- Variables ---- */
:root {
  --gutter: 1rem;
  --container-max-width-sm: 540px;
  --container-max-width-md: 720px;
  --container-max-width-lg: 960px;
  --container-max-width-xl: 1140px;
  --container-max-width-xxl: 1320px;
}

/* ---- Containers ---- */
.container {
  width: 100%;
  margin: 0 auto;
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
}
.container-fluid {
  width: 100%;
  margin: 0;
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
}

/* Responsives containers */
@media (min-width: 576px)  { .container { max-width: var(--container-max-width-sm); } }
@media (min-width: 768px)  { .container { max-width: var(--container-max-width-md); } }
@media (min-width: 992px)  { .container { max-width: var(--container-max-width-lg); } }
@media (min-width: 1200px) { .container { max-width: var(--container-max-width-xl); } }
@media (min-width: 1400px) { .container { max-width: var(--container-max-width-xxl); } }

/* ---- Row ---- */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(var(--gutter) / -2);
  margin-right: calc(var(--gutter) / -2);
}

/* ---- Colonnes ---- */
[class*="col"] {
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
  box-sizing: border-box;
}

/* Colonnes automatiques */
.col { flex: 1 0 0%; max-width: 100%; }

/* Colonnes fixes 1–12 */
.col-1  { flex: 0 0 8.333%;  max-width: 8.333%; }
.col-2  { flex: 0 0 16.666%; max-width: 16.666%; }
.col-3  { flex: 0 0 25%;     max-width: 25%; }
.col-4  { flex: 0 0 33.333%; max-width: 33.333%; }
.col-5  { flex: 0 0 41.666%; max-width: 41.666%; }
.col-6  { flex: 0 0 50%;     max-width: 50%; }
.col-7  { flex: 0 0 58.333%; max-width: 58.333%; }
.col-8  { flex: 0 0 66.666%; max-width: 66.666%; }
.col-9  { flex: 0 0 75%;     max-width: 75%; }
.col-10 { flex: 0 0 83.333%; max-width: 83.333%; }
.col-11 { flex: 0 0 91.666%; max-width: 91.666%; }
.col-12 { flex: 0 0 100%;    max-width: 100%; }

/* ---- Gutters (espacements) ---- */
.g-0  { --gutter: 0rem; }
.g-1  { --gutter: 0.25rem; }
.g-2  { --gutter: 0.5rem; }
.g-3  { --gutter: 1rem; }
.g-4  { --gutter: 1.5rem; }
.g-5  { --gutter: 3rem; }

/* ---- Offsets ---- */
.offset-1  { margin-left: 8.333%; }
.offset-2  { margin-left: 16.666%; }
.offset-3  { margin-left: 25%; }
.offset-4  { margin-left: 33.333%; }
.offset-5  { margin-left: 41.666%; }
.offset-6  { margin-left: 50%; }
.offset-7  { margin-left: 58.333%; }
.offset-8  { margin-left: 66.666%; }
.offset-9  { margin-left: 75%; }
.offset-10 { margin-left: 83.333%; }
.offset-11 { margin-left: 91.666%; }

/* ---- Alignements rapides ---- */
.row.center { justify-content: center; }
.row.end { justify-content: flex-end; }
.row.middle { align-items: center; }
.row.bottom { align-items: flex-end; }

/* ---- Débogage ---- */
.debug [class*="col"] {
  border: 1px dashed #aaa;
  background: #f4f4f4;
  text-align: center;
  padding: 1rem 0;
}


---

⚡ Exemple d’utilisation (index-flex.html)

<link rel="stylesheet" href="grid-flex.css">

<div class="container debug">
  <h2>Version Flexbox</h2>

  <div class="row g-3">
    <div class="col-12 col-md-8">col-12 col-md-8</div>
    <div class="col-12 col-md-4">col-12 col-md-4</div>
  </div>

  <div class="row g-1">
    <div class="col-6 col-md-3">col-6 col-md-3</div>
    <div class="col-6 col-md-3">col-6 col-md-3</div>
    <div class="col-6 col-md-3">col-6 col-md-3</div>
    <div class="col-6 col-md-3">col-6 col-md-3</div>
  </div>
  <div class="row center g-4">
    <div class="col-6 col-md-4">Centré</div>
  </div>

  <div class="row">
    <div class="col-4 offset-4">Offset 4</div>
  </div>
</div>


---

🧩 VERSION 2 — Système CSS GRID moderne

📄 Fichier : grid-grid.css

/* ==========================================
   SYSTEME DE GRILLE CSS GRID PERSONNALISÉ
   ========================================== */

:root {
  --gutter: 1rem;
  --columns: 12;
}

/* Container */
.container-grid {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gutter);
  box-sizing: border-box;
  padding: var(--gutter);
}

/* Responsives columns */
[class*="col-span-"] {
  background: #f6f6f6;
  text-align: center;
  padding: 1rem;
  border: 1px dashed #ccc;
}

/* Span fixe */
.col-span-1  { grid-column: span 1; }
.col-span-2  { grid-column: span 2; }
.col-span-3  { grid-column: span 3; }
.col-span-4  { grid-column: span 4; }
.col-span-5  { grid-column: span 5; }
.col-span-6  { grid-column: span 6; }
.col-span-7  { grid-column: span 7; }
.col-span-8  { grid-column: span 8; }
.col-span-9  { grid-column: span 9; }
.col-span-10 { grid-column: span 10; }
.col-span-11 { grid-column: span 11; }
.col-span-12 { grid-column: span 12; }

/* Responsive (breakpoints) */
@media (max-width: 991px) {
  .col-md-span-12 { grid-column: span 12 !important; }
  .col-md-span-6  { grid-column: span 6 !important; }
  .col-md-span-4  { grid-column: span 4 !important; }
  .col-md-span-3  { grid-column: span 3 !important; }
}

/* Gutter classes */
.g-0  { --gutter: 0rem; }
.g-1  { --gutter: 0.25rem; }
.g-2  { --gutter: 0.5rem; }
.g-3  { --gutter: 1rem; }
.g-4  { --gutter: 1.5rem; }
.g-5  { --gutter: 3rem; }


---

⚡ Exemple d’utilisation (index-grid.html)

<link rel="stylesheet" href="grid-grid.css">

<div class="container-grid g-3">
  <div class="col-span-12">col-span-12</div>
  <div class="col-span-8">col-span-8</div>
  <div class="col-span-4">col-span-4</div>
  <div class="col-span-3">col-span-3</div>
  <div class="col-span-3">col-span-3</div>
  <div class="col-span-3">col-span-3</div>
  <div class="col-span-3">col-span-3</div>
</div>


---

✅ Comparatif rapide

Fonctionnalité Flexbox (grid-flex.css) CSS Grid (grid-grid.css)

Structure Bootstrap-like ✅ Oui (row + col) ❌ Non (grille directe)
Compatible anciens navigateurs ✅ Oui ⚠️ Non IE
Contrôle précis sur chaque cellule ⚠️ Moyen ✅ Excellent
Gutters personnalisables ✅ Oui (g-1→g-5) ✅ Oui (g-1→g-5)
Code plus court / moderne ❌ ✅
Simplicité d’utilisation ✅ Facile à comprendre ⚠️ Besoin de pratique



---

Souhaites-tu que je te fasse maintenant :

🧾 un fichier unique combinant les deux systèmes (grid.css),

ou 💡 une version avec classes utilitaires supplémentaires (justify-content, align-items, etc.) pour enrichir ton système personnel ?










Parfait 🔥
Voici maintenant la version complète de ton système de grille personnel + classes utilitaires, inspirée de Bootstrap, faite à la main en pur CSS, propre et réutilisable.

Tu vas avoir un framework CSS maison :
➡️ Grille responsive (.container, .row, .col-*, .g-*)
➡️ Utilitaires d’alignement, espacement, affichage, texte, tailles, etc.


---

🧱 FICHIER UNIQUE — grid-utilities.css

/* ===================================================
   SYSTÈME DE GRILLE ET CLASSES UTILITAIRES PERSONNEL
   Inspiré de Bootstrap – 100% pur CSS
   =================================================== */

/* === VARIABLES GLOBALES === */
:root {
  --gutter: 1rem;
  --spacing-unit: 0.25rem;
  --container-max-width-sm: 540px;
  --container-max-width-md: 720px;
  --container-max-width-lg: 960px;
  --container-max-width-xl: 1140px;
  --container-max-width-xxl: 1320px;
}

/* === CONTAINERS === */
.container {
  width: 100%;
  margin: 0 auto;
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
}
.container-fluid {
  width: 100%;
  margin: 0;
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
}

/* Responsives containers */
@media (min-width: 576px)  { .container { max-width: var(--container-max-width-sm); } }
@media (min-width: 768px)  { .container { max-width: var(--container-max-width-md); } }
@media (min-width: 992px)  { .container { max-width: var(--container-max-width-lg); } }
@media (min-width: 1200px) { .container { max-width: var(--container-max-width-xl); } }
@media (min-width: 1400px) { .container { max-width: var(--container-max-width-xxl); } }

/* === ROWS === */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(var(--gutter) / -2);
  margin-right: calc(var(--gutter) / -2);
}

/* === COLONNES === */
[class*="col"] {
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
  box-sizing: border-box;
}
.col { flex: 1 0 0%; max-width: 100%; }

.col-1  { flex: 0 0 8.333%;  max-width: 8.333%; }
.col-2  { flex: 0 0 16.666%; max-width: 16.666%; }
.col-3  { flex: 0 0 25%;     max-width: 25%; }
.col-4  { flex: 0 0 33.333%; max-width: 33.333%; }
.col-5  { flex: 0 0 41.666%; max-width: 41.666%; }
.col-6  { flex: 0 0 50%;     max-width: 50%; }
.col-7  { flex: 0 0 58.333%; max-width: 58.333%; }
.col-8  { flex: 0 0 66.666%; max-width: 66.666%; }
.col-9  { flex: 0 0 75%;     max-width: 75%; }
.col-10 { flex: 0 0 83.333%; max-width: 83.333%; }
.col-11 { flex: 0 0 91.666%; max-width: 91.666%; }
.col-12 { flex: 0 0 100%;    max-width: 100%; }

/* === GUTTERS === */
.g-0  { --gutter: 0rem; }
.g-1  { --gutter: 0.25rem; }
.g-2  { --gutter: 0.5rem; }
.g-3  { --gutter: 1rem; }
.g-4  { --gutter: 1.5rem; }
.g-5  { --gutter: 3rem; }

/* === OFFSETS === */
.offset-1  { margin-left: 8.333%; }
.offset-2  { margin-left: 16.666%; }
.offset-3  { margin-left: 25%; }
.offset-4  { margin-left: 33.333%; }
.offset-5  { margin-left: 41.666%; }
.offset-6  { margin-left: 50%; }
.offset-7  { margin-left: 58.333%; }
.offset-8  { margin-left: 66.666%; }
.offset-9  { margin-left: 75%; }
.offset-10 { margin-left: 83.333%; }
.offset-11 { margin-left: 91.666%; }

/* === ALIGNEMENTS FLEX === */
.d-flex { display: flex; }
.d-inline-flex { display: inline-flex; }
.flex-column { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }

.justify-start    { justify-content: flex-start; }
.justify-center   { justify-content: center; }
.justify-end      { justify-content: flex-end; }
.justify-between  { justify-content: space-between; }
.justify-around   { justify-content: space-around; }
.justify-evenly   { justify-content: space-evenly; }

.align-start      { align-items: flex-start; }
.align-center     { align-items: center; }
.align-end        { align-items: flex-end; }
.align-stretch    { align-items: stretch; }
.align-baseline   { align-items: baseline; }

.self-start       { align-self: flex-start; }
.self-center      { align-self: center; }
.self-end         { align-self: flex-end; }

/* === ESPACEMENTS (margin/padding) === */
/* De 0 à 5 = 0 à 1.5rem par pas de 0.25rem */
.m-0  { margin: 0 !important; }
.m-1  { margin: calc(var(--spacing-unit) * 1) !important; }
.m-2  { margin: calc(var(--spacing-unit) * 2) !important; }
.m-3  { margin: calc(var(--spacing-unit) * 4) !important; }
.m-4  { margin: calc(var(--spacing-unit) * 6) !important; }
.m-5  { margin: calc(var(--spacing-unit) * 8) !important; }

.mt-1 { margin-top: calc(var(--spacing-unit) * 1) !important; }
.mb-1 { margin-bottom: calc(var(--spacing-unit) * 1) !important; }
.ms-1 { margin-left: calc(var(--spacing-unit) * 1) !important; }
.me-1 { margin-right: calc(var(--spacing-unit) * 1) !important; }

.p-0  { padding: 0 !important; }
.p-1  { padding: calc(var(--spacing-unit) * 1) !important; }
.p-2  { padding: calc(var(--spacing-unit) * 2) !important; }
.p-3  { padding: calc(var(--spacing-unit) * 4) !important; }
.p-4  { padding: calc(var(--spacing-unit) * 6) !important; }
.p-5  { padding: calc(var(--spacing-unit) * 8) !important; }

/* === TEXTES === */
.text-start   { text-align: left !important; }
.text-center  { text-align: center !important; }
.text-end     { text-align: right !important; }
.text-uppercase { text-transform: uppercase; }
.text-lowercase { text-transform: lowercase; }
.text-capitalize { text-transform: capitalize; }
.fw-bold { font-weight: 700; }
.fw-normal { font-weight: 400; }
.fw-light { font-weight: 300; }

/* === COULEURS RAPIDES === */
.bg-light { background: #f8f9fa; }
.bg-dark  { background: #212529; color: white; }
.bg-primary { background: #007bff; color: white; }
.bg-success { background: #198754; color: white; }
.bg-danger  { background: #dc3545; color: white; }
.bg-warning { background: #ffc107; color: #000; }
.bg-info    { background: #0dcaf0; color: #000; }

.text-primary { color: #007bff; }
.text-success { color: #198754; }
.text-danger  { color: #dc3545; }
.text-warning { color: #ffc107; }
.text-info    { color: #0dcaf0; }

/* === DIMENSIONS === */
.w-25  { width: 25% !important; }
.w-50  { width: 50% !important; }
.w-75  { width: 75% !important; }
.w-100 { width: 100% !important; }

.h-25  { height: 25% !important; }
.h-50  { height: 50% !important; }
.h-75  { height: 75% !important; }
.h-100 { height: 100% !important; }

/* === DISPLAY === */
.d-none        { display: none !important; }
.d-block       { display: block !important; }
.d-inline      { display: inline !important; }
.d-inline-block { display: inline-block !important; }
.d-grid        { display: grid !important; }

/* === VISUAL DEBUG === */
.debug [class*="col"] {
  border: 1px dashed rgba(0,0,0,0.3);
  background: rgba(0,0,0,0.05);
  text-align: center;
  padding: 1rem 0;
}


---

🧩 Exemple d’utilisation (index.html)

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Framework Perso</title>
  <link rel="stylesheet" href="grid-utilities.css">
</head>
<body class="debug bg-light p-4">

  <div class="container">
    <h2 class="text-center text-primary mb-3">Mon Framework CSS Maison</h2>

    <!-- Grille responsive -->
    <div class="row g-3">
      <div class="col-12 col-md-8 bg-info">col-12 col-md-8</div>
      <div class="col-12 col-md-4 bg-warning">col-12 col-md-4</div>
    </div>

    <!-- Colonnes égales -->
    <div class="row g-2 mt-3">
      <div class="col bg-success">col</div>
      <div class="col bg-success">col</div>
      <div class="col bg-success">col</div>
    </div>

    <!-- Alignement -->
    <div class="row justify-center align-center mt-4" style="min-height:100px;">
      <div class="col-4 bg-danger">Centré verticalement & horizontalement</div>
    </div>

    <!-- Espacements -->
    <div class="bg-dark text-center p-3 mt-5">
      <span class="text-warning fw-bold">.p-3</span> et <span class="text-info">.mt-5</span> appliqués
    </div>
  </div>

</body>
</html>


---

✅ Ce que ce fichier t’apporte

🧱 Grille complète :

.container, .container-fluid

.row, .col, .col-1 à .col-12

.g-0 à .g-5

.offset-*

⚙️ Utilitaires flex :

.d-flex, .flex-column, .justify-center, .align-center, etc.


🎨 Apparence et texte :

.bg-*, .text-*, .fw-*, .text-center, .text-uppercase...


📏 Espacements et tailles :

.m-*, .p-*, .w-*, .h-*


💡 Utilitaires d’affichage :

.d-none, .d-block, .d-inline-block, .d-grid



---

Souhaites-tu que je t’ajoute à ce framework :

1. une section responsive complète (comme .col-md-*, .d-md-none, etc.),


2. ou une version minifiée (grid-utilities.min.css) prête pour la prod ?










Excellent 👑
Voici donc la version complète du framework CSS personnel avec système responsive,
incluant toutes les variantes comme .col-sm-*, .col-md-*, .col-lg-*, .col-xl-*, .col-xxl-*,
ainsi que les utilitaires responsive (.d-md-none, .text-lg-center, etc.).

Tu pourras l’utiliser exactement comme Bootstrap, mais 100 % maison 💪


---

🧱 FICHIER : grid-utilities-responsive.css

/* ===================================================
   FRAMEWORK CSS PERSONNEL – VERSION RESPONSIVE
   Inspiré de Bootstrap, écrit à la main
   =================================================== */

/* === VARIABLES === */
:root {
  --gutter: 1rem;
  --spacing-unit: 0.25rem;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
}

/* === CONTAINERS === */
.container {
  width: 100%;
  margin: 0 auto;
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
}
.container-fluid {
  width: 100%;
  margin: 0;
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
}
@media (min-width: 576px)  { .container { max-width: 540px; } }
@media (min-width: 768px)  { .container { max-width: 720px; } }
@media (min-width: 992px)  { .container { max-width: 960px; } }
@media (min-width: 1200px) { .container { max-width: 1140px; } }
@media (min-width: 1400px) { .container { max-width: 1320px; } }

/* === ROW === */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(var(--gutter) / -2);
  margin-right: calc(var(--gutter) / -2);
}

/* === COLONNES DE BASE === */
[class*="col"] {
  padding-left: calc(var(--gutter) / 2);
  padding-right: calc(var(--gutter) / 2);
  box-sizing: border-box;
}
.col { flex: 1 0 0%; max-width: 100%; }

.col-1  { flex: 0 0 8.333%;  max-width: 8.333%; }
.col-2  { flex: 0 0 16.666%; max-width: 16.666%; }
.col-3  { flex: 0 0 25%;     max-width: 25%; }
.col-4  { flex: 0 0 33.333%; max-width: 33.333%; }
.col-5  { flex: 0 0 41.666%; max-width: 41.666%; }
.col-6  { flex: 0 0 50%;     max-width: 50%; }
.col-7  { flex: 0 0 58.333%; max-width: 58.333%; }
.col-8  { flex: 0 0 66.666%; max-width: 66.666%; }
.col-9  { flex: 0 0 75%;     max-width: 75%; }
.col-10 { flex: 0 0 83.333%; max-width: 83.333%; }
.col-11 { flex: 0 0 91.666%; max-width: 91.666%; }
.col-12 { flex: 0 0 100%;    max-width: 100%; }

/* === RESPONSIVE COLUMNS === */

/* SM ≥ 576px */
@media (min-width: 576px) {
  .col-sm   { flex: 1 0 0%; max-width: 100%; }
  .col-sm-1 { flex: 0 0 8.333%;  max-width: 8.333%; }
  .col-sm-2 { flex: 0 0 16.666%; max-width: 16.666%; }
  .col-sm-3 { flex: 0 0 25%;     max-width: 25%; }
  .col-sm-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-sm-5 { flex: 0 0 41.666%; max-width: 41.666%; }
  .col-sm-6 { flex: 0 0 50%;     max-width: 50%; }
  .col-sm-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-sm-8 { flex: 0 0 66.666%; max-width: 66.666%; }
  .col-sm-9 { flex: 0 0 75%;     max-width: 75%; }
  .col-sm-10{ flex: 0 0 83.333%; max-width: 83.333%; }
  .col-sm-11{ flex: 0 0 91.666%; max-width: 91.666%; }
  .col-sm-12{ flex: 0 0 100%;    max-width: 100%; }
}

/* MD ≥ 768px */
@media (min-width: 768px) {
  .col-md   { flex: 1 0 0%; max-width: 100%; }
  .col-md-1 { flex: 0 0 8.333%;  max-width: 8.333%; }
  .col-md-2 { flex: 0 0 16.666%; max-width: 16.666%; }
  .col-md-3 { flex: 0 0 25%;     max-width: 25%; }
  .col-md-4 { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-md-5 { flex: 0 0 41.666%; max-width: 41.666%; }
  .col-md-6 { flex: 0 0 50%;     max-width: 50%; }
  .col-md-7 { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-md-8 { flex: 0 0 66.666%; max-width: 66.666%; }
  .col-md-9 { flex: 0 0 75%;     max-width: 75%; }
  .col-md-10{ flex: 0 0 83.333%; max-width: 83.333%; }
  .col-md-11{ flex: 0 0 91.666%; max-width: 91.666%; }
  .col-md-12{ flex: 0 0 100%;    max-width: 100%; }
}

/* LG ≥ 992px */
@media (min-width: 992px) {
  .col-lg-1  { flex: 0 0 8.333%;  max-width: 8.333%; }
  .col-lg-2  { flex: 0 0 16.666%; max-width: 16.666%; }
  .col-lg-3  { flex: 0 0 25%;     max-width: 25%; }
  .col-lg-4  { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-lg-5  { flex: 0 0 41.666%; max-width: 41.666%; }
  .col-lg-6  { flex: 0 0 50%;     max-width: 50%; }
  .col-lg-7  { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-lg-8  { flex: 0 0 66.666%; max-width: 66.666%; }
  .col-lg-9  { flex: 0 0 75%;     max-width: 75%; }
  .col-lg-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-lg-11 { flex: 0 0 91.666%; max-width: 91.666%; }
  .col-lg-12 { flex: 0 0 100%;    max-width: 100%; }
}

/* XL ≥ 1200px */
@media (min-width: 1200px) {
  .col-xl-1  { flex: 0 0 8.333%;  max-width: 8.333%; }
  .col-xl-2  { flex: 0 0 16.666%; max-width: 16.666%; }
  .col-xl-3  { flex: 0 0 25%;     max-width: 25%; }
  .col-xl-4  { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-xl-5  { flex: 0 0 41.666%; max-width: 41.666%; }
  .col-xl-6  { flex: 0 0 50%;     max-width: 50%; }
  .col-xl-7  { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-xl-8  { flex: 0 0 66.666%; max-width: 66.666%; }
  .col-xl-9  { flex: 0 0 75%;     max-width: 75%; }
  .col-xl-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-xl-11 { flex: 0 0 91.666%; max-width: 91.666%; }
  .col-xl-12 { flex: 0 0 100%;    max-width: 100%; }
}

/* XXL ≥ 1400px */
@media (min-width: 1400px) {
  .col-xxl-1  { flex: 0 0 8.333%;  max-width: 8.333%; }
  .col-xxl-2  { flex: 0 0 16.666%; max-width: 16.666%; }
  .col-xxl-3  { flex: 0 0 25%;     max-width: 25%; }
  .col-xxl-4  { flex: 0 0 33.333%; max-width: 33.333%; }
  .col-xxl-5  { flex: 0 0 41.666%; max-width: 41.666%; }
  .col-xxl-6  { flex: 0 0 50%;     max-width: 50%; }
  .col-xxl-7  { flex: 0 0 58.333%; max-width: 58.333%; }
  .col-xxl-8  { flex: 0 0 66.666%; max-width: 66.666%; }
  .col-xxl-9  { flex: 0 0 75%;     max-width: 75%; }
  .col-xxl-10 { flex: 0 0 83.333%; max-width: 83.333%; }
  .col-xxl-11 { flex: 0 0 91.666%; max-width: 91.666%; }
  .col-xxl-12 { flex: 0 0 100%;    max-width: 100%; }
}

/* === DISPLAY RESPONSIVE === */
@media (min-width: 576px)  { .d-sm-none { display: none !important; } .d-sm-block { display: block !important; } }
@media (min-width: 768px)  { .d-md-none { display: none !important; } .d-md-block { display: block !important; } }
@media (min-width: 992px)  { .d-lg-none { display: none !important; } .d-lg-block { display: block !important; } }
@media (min-width: 1200px) { .d-xl-none { display: none !important; } .d-xl-block { display: block !important; } }
@media (min-width: 1400px) { .d-xxl-none { display: none !important; } .d-xxl-block { display: block !important; } }

/* === TEXT RESPONSIVE === */
@media (min-width: 576px)  { .text-sm-center { text-align: center !important; } }
@media (min-width: 768px)  { .text-md-center { text-align: center !important; } }
@media (min-width: 992px)  { .text-lg-center { text-align: center !important; } }
@media (min-width: 1200px) { .text-xl-center { text-align: center !important; } }
@media (min-width: 1400px) { .text-xxl-center { text-align: center !important; } }

/* === DEBUG === */
.debug [class*="col"] {
  border: 1px dashed rgba(0,0,0,0.3);
  background: rgba(0,0,0,0.05);
  text-align: center;
  padding: 1rem 0;
}


---

⚙️ EXEMPLE HTML RESPONSIVE

<div class="container debug">
  <div class="row g-3">
    <div class="col-12 col-md-8 col-lg-9 bg-primary">col-12 col-md-8 col-lg-9</div>
    <div class="col-12 col-md-4 col-lg-3 bg-warning">col-12 col-md-4 col-lg-3</div>
  </div>

  <div class="row mt-3">
    <div class="col-6 col-sm-4 col-md-3 bg-success">Responsive 1</div>
    <div class="col-6 col-sm-4 col-md-3 bg-success">Responsive 2</div>
    <div class="col-6 col-sm-4 col-md-3 bg-success">Responsive 3</div>
    <div class="col-6 col-sm-4 col-md-3 bg-success">Responsive 4</div>
  </div>
</div>


---

Souhaites-tu que je te fasse maintenant la version minifiée et optimisée (taille réduite, prête pour la production) de ce framework ?















Voici les balises HTML modernes comme <popover>, <dialog>, etc., ainsi que comment les utiliser, avec exemples simples et fonctionnels.


---

✅ 1. <dialog> — Fenêtre de dialogue modale ou non‐modale

La balise <dialog> est native HTML et sert à afficher une fenêtre de type pop-up.

✔️ Exemple : ouvrir / fermer un dialog

<button id="open">Ouvrir</button>
<button id="close">Fermer</button>

<dialog id="box">
  <h2>Titre du dialog</h2>
  <p>Contenu du message.</p>
</dialog>

<script>
  const dlg = document.getElementById("box");

  document.getElementById("open").onclick = () => dlg.showModal();
  document.getElementById("close").onclick = () => dlg.close();
</script>

✔️ Méthodes utiles

Méthode Description

show() Affiche le dialog (non-modal)
showModal() Affiche comme modal (bloque la page)
close() Ferme le dialog



---

✅ 2. popover (HTML Popover API)

Les popovers sont nouveaux en HTML 2023+, sans JS obligatoire.

✔️ Structure

Un élément popover doit avoir popover="auto" ou "manual".

✔️ Exemple simple (auto)

<button popovertarget="info">Voir info</button>

<div id="info" popover="auto">
  Ceci est un popover natif HTML.
</div>

Le popover s’ouvre et se ferme automatiquement.

✔️ Exemple en mode manual (contrôle par JS ou attribut HTML)

<button popovertarget="pop" popovertargetaction="show">Ouvrir</button>
<button popovertarget="pop" popovertargetaction="hide">Fermer</button>

<div id="pop" popover="manual">
  Popover avec contrôle manuel.
</div>


---

✅ 3. <details> / <summary> — Accordéon natif HTML

Permet de créer un menu déroulant simple.

✔️ Exemple

<details>
  <summary>Clique pour ouvrir</summary>
  <p>Contenu caché.</p>
</details>


---

✅ 4. <menu> et <menuitem> (déprécié)

Ces balises ne sont plus recommandées.
À éviter → utilise plutôt des <ul> + <li>.


---

✅ 5. <dialog> + Popover combinés

Tu peux faire un toast, un menu contextuel, une info-bulle, etc.

✔️ Exemple d’infobulle popover

<button popovertarget="tip">?</button>

<div id="tip" popover="auto">
  Ceci est une infobulle native.
</div>


---

✅ 6. Exemple complet avec tous les éléments

<button id="open">Ouvrir le dialog</button>

<dialog id="d">
  <h3>Dialog natif HTML</h3>
  <p>Fenêtre modale</p>
  <button onclick="d.close()">Fermer</button>
</dialog>

<hr>

<button popovertarget="p1">Afficher le popover</button>
<div id="p1" popover="auto">
  Ceci est un popover HTML5.
</div>

<hr>

<details>
  <summary>Voir plus</summary>
  <p>Du contenu caché</p>
</details>

<script>
  const d = document.getElementById("d");
  open.onclick = () => d.showModal();
</script>


---

⭐ Résumé rapide

Balise / API Utilité Support

<dialog> Pop-up modale ★★★★★
popover Popover natif ★★★★☆ (modern browsers)
<details> / <summary> Accordéon ★★★★★
<menu> Ancien menu ⚠️ Déprécié



---

Si tu veux, je peux te faire :
✅ un template complet d’interface moderne avec dialog + popovers
ou
✅ des composants réutilisables (bouton, tooltip, popover, modal) en HTML/CSS/JS ou Tailwind

Dis-moi ce que tu préfères !












Voici exactement l’effet que tu demandes :

La barre de navigation est fixée (sticky) quand on scroll.

Elle reste collée en haut de la fenêtre.

Quand le scroll arrive au footer, la barre ne doit pas recouvrir le footer :
➜ elle remonte en même temps que le scroll descend, comme si elle était “repoussée”.


C’est un comportement impossible en pure CSS, donc on utilise JavaScript + CSS.


---

✅ Code complet fonctionnel (HTML + CSS + JS)

Tu peux copier-coller tel quel dans un fichier .html et tester directement.

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Sticky nav stoppée avant le footer</title>
<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
    }

    header {
        height: 300px;
        background: #ddd;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:2rem;
    }

    /* La NAV */
    .navbar {
        background: #333;
        color: #fff;
        padding: 15px;
        position: sticky;  
        top: 0;
        z-index: 10;
    }

    .navbar.stopped {
        position: absolute;
    }

    main {
        height: 2000px;
        padding: 20px;
        background: #f4f4f4;
    }

    footer {
        height: 250px;
        background: #222;
        color: white;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:1.5rem;
        position: relative;
    }
</style>
</head>

<body>

<header>
    HEADER
</header>

<div id="navbar-wrapper" style="position: relative;">
    <div class="navbar" id="navbar">
        Ma barre de navigation
    </div>
</div>

<main>
    Contenu de la page…  
</main>

<footer id="footer">
    FOOTER
</footer>

<script>
const nav = document.getElementById("navbar");
const navWrapper = document.getElementById("navbar-wrapper");
const footer = document.getElementById("footer");

// On observe le footer
window.addEventListener("scroll", () => {
    const navHeight = nav.offsetHeight;
    const footerTop = footer.getBoundingClientRect().top;

    if (footerTop <= navHeight) {
        // Empêche la nav de passer sur le footer
        nav.classList.add("stopped");
        nav.style.top = (footerTop - navHeight) + "px";
    } else {
        nav.classList.remove("stopped");
        nav.style.top = "0px";
    }
});
</script>

</body>
</html>


---

🧠 Comment ça marche ?

✔ Sticky jusqu’au footer

La navigation utilise :

position: sticky;
top: 0;

👉 Elle reste collée en haut de l’écran pendant tout le scroll.

✔ Détection du footer

On détecte quand le haut du footer arrive au même niveau que la nav :

const footerTop = footer.getBoundingClientRect().top;

✔ Blocage juste avant le footer

Quand le footer touche la nav, on transforme la nav en :

position: absolute;

Et on la force à remonter avec :

nav.style.top = (footerTop - navHeight) + "px";

Donc la nav ne passe jamais devant le footer et remonte naturellement avec le scroll.


---

🔥 Tu veux une version avec animation, transition, shadow, ou un framework (Bootstrap, Tailwind) ?

Dis-moi ton style préféré et je t’adapte ça !


























Parfait, je te fais 4 mini-démos simples, chacune indépendante, pour que tu puisses les intégrer facilement dans ton site.

Tu auras :

1️⃣ Background généré dynamiquement (dégradé animé)
2️⃣ Menu hamburger animé + ouverture du menu
3️⃣ Texte qui tombe / rebondit / glisse / lettre par lettre
4️⃣ Glassmorphism (background flou + transparence + bordure claire)

Chaque bloc est copier–coller direct, sans dépendances externes.


---

🟦 1. Background généré dynamiquement (dégradé animé)

Effet très moderne (style "morphing gradient") :

<style>
body {
    margin: 0;
    height: 100vh;
    background: linear-gradient(240deg, #ff0080, #00b3ff, #7bff00);
    background-size: 600% 600%;
    animation: gradientMove 15s ease infinite;
}

@keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
</style>

🎨 Le fond change légèrement de forme et de couleurs en continu = super “clean”.


---

🟩 2. Menu hamburger animé + menu déroulant

<style>
.hamburger {
    width: 35px;
    cursor: pointer;
    margin: 20px;
}

.hamburger span {
    display: block;
    height: 4px;
    background: black;
    margin: 6px 0;
    transition: .4s;
    border-radius: 3px;
}

.hamburger.active span:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
}
.hamburger.active span:nth-child(2) {
    opacity: 0;
}
.hamburger.active span:nth-child(3) {
    transform: translateY(-10px) rotate(-45deg);
}

nav {
    position: fixed;
    top: 0;
    right: -250px;
    width: 250px;
    height: 100%;
    background: #333;
    padding-top: 60px;
    transition: .4s;
}

nav.open {
    right: 0;
}

nav a {
    display: block;
    padding: 20px;
    color: white;
    text-decoration: none;
}
</style>

<div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
</div>

<nav id="menu">
    <a href="#">Accueil</a>
    <a href="#">Services</a>
    <a href="#">Contact</a>
</nav>

<script>
const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

burger.onclick = () => {
    burger.classList.toggle('active');
    menu.classList.toggle('open');
};
</script>

Effet smooth : le menu glisse + hamburger se transforme en croix.


---

🟨 3. Effets de texte (tombe, rebondit, glisse, lettre par lettre)

✔ Texte qui tombe

<style>
.fall {
    display: inline-block;
    opacity: 0;
    animation: fall 1s forwards;
}

@keyframes fall {
    0% { transform: translateY(-50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}
</style>

<h1>
    <span class="fall">T</span>
    <span class="fall" style="animation-delay:.1s">e</span>
    <span class="fall" style="animation-delay:.2s">x</span>
    <span class="fall" style="animation-delay:.3s">t</span>
    <span class="fall" style="animation-delay:.4s">e</span>
</h1>


---

✔ Texte rebondit

<style>
.bounce {
    display: inline-block;
    opacity: 0;
    animation: bounce .6s forwards;
}

@keyframes bounce {
    0% { transform: translateY(30px); opacity: 0; }
    60% { transform: translateY(-10px); opacity: 1; }
    100% { transform: translateY(0); }
}
</style>

Tu utilises comme pour l'exemple précédent.


---

✔ Texte qui glisse (slide-in)

<style>
.slide {
    opacity: 0;
    transform: translateX(-40px);
    animation: slideIn .7s forwards;
}

@keyframes slideIn {
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>

<h2 class="slide">Bonjour !</h2>


---

✔ Texte lettre par lettre (JS auto)

<div id="typeText" style="font-size:2rem; font-weight:600;"></div>

<script>
const text = "Bonjour, ceci apparaît lettre par lettre !";
let i = 0;

function type() {
    if (i < text.length) {
        document.getElementById("typeText").innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 50);
    }
}
type();
</script>

Simple et efficace.


---

🟧 4. Glassmorphism (fond flou + glas + bordure)
<style>
.card {
    width: 300px;
    padding: 20px;
    margin: 50px auto;
    background: rgba(255, 255, 255, .15);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,.3);
    box-shadow: 0 4px 30px rgba(0,0,0,.1);
    color: #fff;
}
</style>

<div class="card">
    <h2>Glassmorphism</h2>
    <p>Effet iOS / Windows 11 stylé ✨</p>
</div>

Résultat : un bloc transparent + flou + bordure claire.


---

👉 Si tu veux, je peux aussi te créer :

✅ un site complet avec tous les effets
✅ un template Landing Page full animations
✅ une page portfolio moderne avec scroll dynamique
✅ un header avec sticky + blur + animations

Tu veux quoi ensuite ?










// Loader
// ===========
/*
.loader {
    width: 25px;
    height: 25px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
}

.loader-circles {
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FFF;
    -webkit-animation: spin 1s linear infinite;
    -moz-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
}

.loader-circles:before, .loader-circles:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    bottom: 5px;
    right: 5px;
    border-radius: 50%; /* px 
    border: 3px solid transparent;
    border-top-color: #FFF;
    opacity: 0.8;
    -webkit-animation: spin 10s linear infinite;
    -moz-animation: spin 10s linear infinite;
    animation: spin 10s linear infinite;
}

.loader-circles:before {
    top: 12px;
    left: 12px;
    bottom: 12px;
    right: 12px;
    opacity: .5;
    -webkit-animation: spin 5s linear infinite;
    -moz-animation: spin 5s linear infinite;
    animation: spin 5s linear infinite;
}

@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg); 
    }
    to {
        -webkit-transform: rotate(360deg); 
    }
}
@-moz-keyframes spin {
    from {
        -moz-transform: rotate(0deg);
    }
    to {
        -moz-transform: rotate(360deg);
    }
}
@keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg); 
    }
}
*/










const menubtn = document.getElementById('menu-btn')
const navLinks = document.getElementById('nav-links')
const menubtnIcon = menubtn.querySelector('i')

menubtn.addEventListener('click', e => {
    navLinks.classList.toggle('open')
    const isOpen = navLinks.classList.contains('open')
    menubtnIcon.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line')
})

navLinks.addEventListener('click', e => {
    navLinks.classList.remove('open')
    menubtnIcon.setAttribute('class', 'ri-menu-line')
})

    <header class="header">
        <nav class="nav">
            <div class="nav_header">
                <div class="nav_logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="25px">
                        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="30"
                            fill="#006DFF" dominant-baseline="middle" text-anchor="middle">
                        Meto
                        </text>
                    </svg>
                    <!-- <a href="" class="logo">
                        <img src="" alt="" class="logo_white">
                        <img src="" alt="" class="logo_dark">
                        <span>Meto</span>
                    </a> -->
                </div>
                <div class="nav_menu_btn" id="menu-btn">
                    <i>menu</i>
                </div>
            </div>
            <ul class="nav_links" id="nav-links">
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">Home</a>
                </li>
                <li>
                    <a href="">Home</a>
                </li>
            </ul>
            <div class="nav_btns">
                <button class="btnn">Register</button>
            </div>
        </nav>
    </header>

.btnn {
    padding: .75rem 1.5rem;
    outline: none;
    border: none;
    font-size: 1rem;
    color: var(--lite);
    background-color: var(--bleu);
    border-radius: .5rem;
    transition: .3s;
    cursor: pointer;
}

.btnn:hover {
    background-color: var(--primary);
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo img {
    max-width: 35px;
}

.logo span {
    font-size: 1.25rem;
    font-weight: 700;
    font-style: italic;
    color: var(--lite);
    white-space: nowrap; // --
}

.logo img { // ??
    display: flex;
    width: 100%;
}

/*
a {
    text-decoration: none;
    transition: .3s;
}

ul {
    list-style: none;
}
*/

.header {
    background: linear-gradient(
        to bottom,
        rgba(138, 121, 240, 0),
        rgba(138, 121, 240, 0.1)
    );
}

.nav {
    position: fixed; // ou relative
    isolation: isolate; // !!
    width: 100%;
    z-index: 10;
    top: 0;
}

.nav_header {
    padding: .75rem 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);
}

.nav_logo .logo_dark {
    display: none;
}

.nav_menu_btn {
    font-size: 1.5rem;
    color: var(--text-color);
    cursor: pointer;
}

.nav_links {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    background-color: var(--primary);
    transition: transform .3s;
    z-index: -1;
}

.nav_links.open {
    transform: translateY(100%);
}

.nav_links a {
    color: var(--bleu);
}

.nav_links a:hover {
    color: var(--primary);
}

.nav_btns {
    display: none;
}

@media only screen and (min-width: 768px) {
    .nav {
        position: static;
        padding: .75rem 1rem;

        max-width: 1050px;
        margin-inline: auto;
        // margin-bottom: 5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .nav_header {
        flex: 1;
        padding: 0;
        background-color: transparent;
    }

    .nav_logo .logo_dark {
        display: flex;
    }

    .nav_logo .logo_white {
        display: none;
    }

    .nav_logo span {
        font-size: 1.5rem;
        color: var(--primary);
    }

    .nav_menu_btn {
        display: none;
    }

    .nav_links {
        position: static;
        width: fit-content; // !!
        padding: 0;
        margin: 0;
        flex-direction: row;
        background-color: transparent;
        transform: none !important;
    }

    .nav_links a {
        font-weight: 500;
        color: var(--text-color);
    }

    .nav_links li:last-child {
        display: none;
    }

    .nav_btns {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }
}





















.btns{
  display:inline-flex;align-items:center;justify-content:center;gap:.375rem;
  white-space:nowrap;border-radius:var(--radius-lg);
  font-size:.875rem;font-weight:500;font-family:'Geist',sans-serif;
  line-height:1;cursor:pointer;border:none;outline:none;
  transition:background .12s,opacity .12s,box-shadow .15s;
  flex-shrink:0;
}
.btn:disabled{opacity:.5;pointer-events:none;}
.btn-sm{height:2rem;padding:0 .75rem;font-size:.8125rem;}
.btns-md{height:2.25rem;padding:0 1rem;}
.btn-icon-sm{height:2rem;width:2rem;padding:0;}
.btn-default{background:var(--primary);color:var(--primary-fg);}
.btn-default:hover{opacity:.88;}
.btn-outline{background:transparent;color:var(--fg);border:1px solid var(--input);}
.btn-outline:hover{background:var(--accent);}
.btn-ghost{background:transparent;color:var(--muted-fg);}
.btn-ghost:hover{background:var(--accent);color:var(--fg);}
.btns-secondary{background:var(--secondary);color:var(--secondary-foreground);}
.btns-secondary:hover{opacity:.85;}

.select-sm{
  height:2rem;padding:0 1.875rem 0 .625rem;
  border:1px solid var(--input);border-radius:var(--radius-lg);
  background:var(--background);
  font-size:.8125rem;font-family:'Geist',sans-serif;color:var(--foreground);
  appearance:none;-webkit-appearance:none;cursor:pointer;outline:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right .5rem center;
  transition:border-color .15s;
}
.select-sm:focus{border-color:var(--ring);}

.cards{
  border:1px solid var(--border);
  border-radius:calc(var(--radius) + 2px);
  background:var(--card);color:var(--card-fg);
  min-width:0;
}
.card-header{
  padding:1.25rem 1.5rem .875rem;
  display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;
}
.card-title{font-size:.9375rem;font-weight:600;letter-spacing:-.02em;}
.card-description{font-size:.8125rem;color:var(--muted-fg);margin-top:.1875rem;line-height:1.4;}
.card-content{padding:0 1.5rem 1.5rem;}
.card-footer{
  padding:.875rem 1.5rem;border-top:1px solid var(--border);
  display:flex;align-items:center;gap:.5rem;
  font-size:.8125rem;color:var(--muted-fg);
} 

.page-head{
  display:flex;align-items:flex-start;justify-content:space-between;
  margin-bottom:1.5rem;gap:1rem;flex-wrap:wrap;
}
.page-title{font-size:1.375rem;font-weight:700;letter-spacing:-.03em;line-height:1.2;}
.page-subtitle{font-size:.875rem;color:var(--color-muted-foreground);margin-top:.25rem;}
.page-actions{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;}


.tab-bar{
  display:flex;align-items:center;
  border-bottom:1px solid var(--border);
  margin-bottom:1.5rem;gap:0;
  overflow-x:auto;
}
.tab-bar::-webkit-scrollbar{display:none;}
.tab-item{
  display:flex;align-items:center;gap:.375rem;
  padding:.625rem .875rem;
  font-size:.875rem;font-weight:500;
  color:var(--muted-foreground);
  border-bottom:2px solid transparent;
  margin-bottom:-1px;cursor:pointer;
  background:none;border-top:none;border-left:none;border-right:none;
  border-bottom-style:solid;
  transition:color .12s;
  font-family:'Geist',sans-serif;
  white-space:nowrap;flex-shrink:0;
}
.tab-item:hover{color:var(--foreground);}
.tab-item.active{color:var(--foreground);border-bottom-color:var(--foreground);}
.tab-count{
  font-size:.625rem;font-weight:600;
  background:var(--muted);color:var(--muted-foreground);
  border-radius:9999px;padding:.15rem .4rem;
}

<div class="cards">
    <div class="card-header">loror</div>
    <div class="card-content">
        <div class="card-title">
            lorror
        </div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore ipsa tempore molestias itaque, inventore sint reiciendis, minus deserunt doloremque accusamus unde laudantium architecto. Iusto nisi nostrum error quia illo quis.
        <div class="card-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum saepe molestias numquam ad soluta aspernatur omnis cum id repellendus, reprehenderit nobis explicabo sunt laudantium minima voluptate provident voluptates sint? Nisi!
        </div>
    </div>
    <div class="card-footer">
        dkkdkdkd
    </div>
</div>
<a href="" class="btns btns-md btns-secondary">SKSKS</a>
<select name="" class="select-sm" id="">
    <option value="">SKSS</option>
    <option value="">SKSS</option>
    <option value="">SKSS</option>
</select>

<div class="page-head">
    <div class="page-title">
        sllslsss
        <div class="page-subtitle">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur tenetur quisquam aperiam, ratione, veniam, quia libero eligendi ipsa architecto delectus iure doloremque maxime sed? Consequuntur laborum ducimus culpa maiores temporibus?
    </div>
    </div>
    <div class="page-actions">
        <button>sss</button>
        <button>sss</button>
    </div>
</div>

<div class="tab-bar">
    <a href="#tab-1" class="tab-item active">SBSSBSJS</a>
    <a href="#tab-2" class="tab-item">LSLSSL</a>
    <a href="#tab-3" class="tab-item">LSLSSL</a>
    <div class="tab-item">LSLSSL</div>
</div>