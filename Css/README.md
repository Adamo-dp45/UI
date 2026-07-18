### Css `developer.mozilla.org`

uiball.com : Pour des loaders animés

- **Important !**
    > Pour les polices utilisé le `link` plutôt que le `@import`
    > !! de la performence on peut utiliser le préchargement pour indiquer au navigateur de charger des ressources spécifiques en avance <link rel="preload" href="image-large.jpg" as="image">

- Les sites
    > `jgthms.com/minireset.css`, `meyerweb.com/eric/tools/css/reset` pour le reset css
    > `necolas.github.io` !! nomralize css
    > `cssportal.com` un outil qui permet de générer du css
    > `curveeditor.com` !! faire des cubic-besié pour les animations
    > `animista.net`, `animate.style` pour des animation css
    > `color piker`, `coolors.co`, `colorhunt.co`, `imagecolorpicker.com` !! les couleurs
    > `cssgradient.io`, `uigradients.com`, `gradientmagic.com` !! les dégradé de couleur et les grandient image
    > `smoothshadows.com` !! les ombres
    > `9elements.github.io/fancy-border-radius` !! des bordures élliptiques
    > `cssloaders.github.io` !! des loaders
    > `amp-what.com` !! des caractères particuliers
    > `loading.io`, `samherbert.net/svg-loaders`, `svgbackgrounds.com`, `tensor-svg-loaders.vercel.app` !! loader svg animé
    > `autoprefixer.github.io` pour l'autoprefixer
    > `transfonter.org` permet de convertir les fonts en d'autre format comme `woff` recommandé
    > `codingnepalweb.com` pour des templates css
    > `uiverse.io` !! composants css comme des buttons, formlaire..
    > `boxy-svg.com` !! des logos
    > `themewagon.com`, `html5up.net` une collection de templates déjà fait
    > `adminmart.com`, `themewagon.com`, `mui.com/store`, `tailadmin.com` !! avec plusieurs technologie
    > `specificity.keegan.st` permet de déterminer la spécificité des sélecteur
    > `w3.org`, `html.spec.whatwg.org` pour les standards css et html
    > `css-tricks.com`, `css weekly` pour les actualités de css
    > Les icônes
        > `fonts.google.com/icons`, `lucide.dev`, `icones8.fr`, `heroicons.com`, `boxicons.com`, `flaticon.com`, `fontawesome.com`, `iconify`, `tabler.io`
    > Les images
        > `unsplash.com`, `pinterest`
        > Le `resize crop image` pour redimenssionner et optimiser des images
            > `squoosh.app`, `tinypng.com`, `imageresize.org`, `resizeimage.io`, `imageoptim.com`
        > `svgomg.net`, `svgrepo.com` pour optimiser les svg
        > `favicon-generator.org` pour génèrer des favicons à partir d'une image
        > `irfanview.com` léger et rapide pour visualiser et convertir des images
        > `xnview.com` supporte de nombreux formats d'images et à des fonctions de conversion en masse
        > `svg.enshrined.co.uk` un outil pour vérifier les svg et supprimer les scripts malveillants appelé `svg-sanitizer`
        > `svgsprit.es` permet de générer automatiquement un sprite à partir de plusieurs fichiers svg
        > `svgai.org` pour traiter et convertir un svg
        > `blender.org`, `autodesk.com` pour créer et manipuler des images 3d

- Les framework css
    > Bootstrap `getbootstrap.com`
        > `bootstrapdash.com/all-free-templates`, `adminlte.io`, `startbootstrap.com` une collection de dashbord
    > Tailwind `tailwindcss.com`
    > Bulma `bulma.io`
    > Pico `picocss.com`

- Les logiciels de design et logo
    > Figma `figma.com`
        > `uidesigndaily.com` pour plus de design
    > Lunacy `lunacyapp.com`
    > Sketch `sketch.com`
    > Avocode `avocode.com`

- Les préprocessor css
    > Sass `sass-lang.com`
    > Less `lesscss.org`
    > Stylus `stylus-lang.com`

- - 
    > Les sélecteurs
        > h1, h2 : Va stylisé les 2 à la foi
        > ol li : On sélectionne tous les `li` qui sont sont des enfants directe ou indirecte du `ol`
        > td > h2 : !! tous les `h2`qui sont enfants directe de `td`
        > h2 + p : !! le `p` qui est juste après le `h2`
        > h2 ~ p : !! tous les paragraphe qui sont après a un `h2`
        > ol p:first-child : !! tous les `p` qui sont les premiers enfants de `ol`, `last-child` pour le dernier
        > tr:nth-child(2) : !! un élément à un index, `(2n)` tous les éléments qui sont des multiples de 2, `(odd)` !! avec un index impaire et `(even)` paires
        > a[title] : tous les liens qui ont un attribut title
            > a[href$=".fr"] : Pour sélectionner un élément en fonction d'un attribut, `$=".fr"` si la valeur fini par
            > a[href^="http"] : !! tous les liens qui commence par http
        > p:has(span) : !! le parent d'un enfant
        > p:first-of-type : !! le premier élément du type p, `last-of-type` pour le dernier
        > p::nth-of-type(2) : !! le deuxième élément du type 2
        > p::first-line : !! la première ligne
        > main p:first-of-type::first-letter : !! le premier paragraphe ensuite la prémière lettre 

    > Les pseudo éléments permettent de rajouter un mot clé après un sélecteur pour venir séléctionner une partie de l'élément
        > a:hover : Permet d'appliquer un style au survol de l'élément, `:visited` pour les liens lorsqu'il a déjà été visité
        > input:focus : !! au clique sur l'élément, utile pour les champs de formulaires
        > ::selection : !! à la sélection de texte sur notre page web
        > ::before, ::after : Pour ajouter du contenu avant et après nos élément
        > ::-moz-selection : Pour le support de firefox

    > Les styles de textes `app.css`
    > Les styles de fond et bordures `app.css`
    > Les couleurs `app.css`
        > En optique on a 2 types de couleur `Additive` - 255 255 255 - Blanc et `Soustractive` - 0 0 0 - Noir
            > rgb & rgba : Le a `aplha` fais référence à la transparence
            > hsl & hsla : Une autre manière de spécifier les couleurs plus simple pour gérer plusieurs versions d'une même couleur `hslpicker.com`
                > La 1ère valeur permet de choisir une teinte, la 2ème la saturation, la 3ème la lumunosité et la 4ème la transparence
            > oklch : Un système qui contre balance le problème de lumunosité au changement de teint du hsl `oklch.com` et permet de représenter beaucoup plus de couleur
                > La 1ère valeur est la luminosité, la 2ème le chroma l'équivalent de la saturation, la 3ème l'alpha et la 4ème la teinte qui permet de choisir comment va se comporter la couleur
    > Le modèle de boîte est qu'en css chaque élément qu'on crée va se comporter comme une boîte  `app.css`
    > Les unités de mésure `app.css`
    > Le flexbox `app.css`
    > Le positionnement `app.css`
    > Le grid `app.css`
    > Le responsive `app.css`
    > Les polices personnalisées `app.css`
    > Le reset `app.css`
    > Les pseudo éléments `app.css`
    > Le défilement `app.css`
    > Les transformations `blog/app.css`
    > Les animations `blog/app.css`
    > L'imbrication et import pour mieux découper notre css `app.css`
    > Les calques pour mieux organiser .. voir `layer.css`
    > L'organisation
        > base/
            > `reset.css` pour la réinitialisation des styles par défaut
            > `typographie.css` pour les styles de texte générique
            > `colors.css` pour des styles particulier comme les dégradés, les box-shadow.. qui ne rentrerait pas dans une variable
            > `layout.css` pour les styles générique qui ont attré à la structure de la page
        > components/
            > `btn.css`, `card.css`.. pour les composants réutilisable
        > modules/
            > `header.css`, `footer.css`.. qui correspondent à des sections de notre application
        > utilities
            > `visibility.css`.. des class qui correspondent toujours à un élément
- - 

- Les cesures
    > &plus; &uarr; &darr; &gt; &lt; &#94; &#65123; &#9650; &#9660; &#9654; &#9664; &larr; &rarr; &copy; &reg; &hearts; &#9834; &CounterClockwiseContourIntegral; &shy permet de casser un mot;

- Pour dompter la hauteur de ligne on a `capsize` - `seek-oss.github.io/capsize` projet dans lequel l'ensemble des métriques de toutes polices, `font-viewer` pour grafikart, `text box trim` de css sur mdn
    > text-box: trim-both cap alphabetic
        > `trim-both` pour couper les deux bords, `cap` mésure, `ex` pour couper au niveau des minuscule, `alphabetic` ne pas géré tous ce qui est les petit queue de nos caractère

- **Figma** permet de designer des interfaces web et mobile, aussi de retoucher des svg
    > Double clic : Pour sélectionner les sous éléments
    > CTRL + Clic : !! directement sélectionner un élément
    > En haut on a la barre d'outils - Sur la barre de gauche on a la partie `pages` qui permet de naviger de page en page  - Sur la barre de gauche on a les informations de l'élément selectionné
    > La partie `Prototype` permet de décrire les intéractions et le fonctionnement de différents éléments, pour voir les propotypes on clique sur le bouton ou l'icon `Lecture`
    > Les composants ont une bordure voilette, pour y accéder on fais un clique droit sur l'élément et choisir l'option `Go to component`
    > Le mode `Développeur` nous donne plus d'informations sur la maquette et génère aussi le css
        > Par défaut on peut sélectionner directement un élément à l'intérieur d'un groupe
        > Raccourci
    > `figma.com/community/website-templates` : Pour des templates gratuit

- **Lunacy** !!
    > CTRL + Molette : Pour zoumé ou dézoumé
    > Clic + Molette : !! se déplacer
    > CTRL + Clic : !! directement sélectionner un élément
    > Alt + Survol : Va montrer la position de l'élément par rapport aux autres avec les dimensions
    > On peut choisir d'être sur le `Design` ou le `Components` sur le menu déroulant en haut à gauche
    > Pour avoir les informations sur un élément on vas sur le menu en haut à droite
    > Si on clic sur un élément et que son calc est affiché en `rose` ça signifie que c'est un composant, on peut faire un clic droit sur l'élément et choisir l'option `Go to component` qui dirige sur une page qui liste tous les composants utilisés dans la maquette
    > Exporter les icones en svg
    > Palette de couleur :
        > On vas sur une couleur et dans le menu en haut à droite on regarde si elle a un nom, si oui c'est que c'est une palette accessible sur le menu en haut a gauche sur l'onglet `Variables`
    > Pour créer des styles de texte ou de layer on vas sur le menu en haut a gauche sur l'onglet `Styles`

- **Tailwind** `tailwindcss.com` - Va proposer une approche différente de bootstrap basé sur les class utilitaires
    > npx @tailwindcss/cli -i ./tailwind/app.css -o ./tailwind/output.css --watch : Permet de générer le css en ligne de commande
    > Plugins
        > `daisyui.com` permet de créer des composants comme bootstrap
    > Les outils
        > `oklch.com` un site de palette de couleur
        > `flowbite.com` pour des composants de plusieurs framework avec le style de tailwind
        > Pinesui `devdojo.com` pour utiliser alpine et tailwind
    > L'avantage de tailwind est qu'on aura dans le css final que les class qu'on a utilisé
    > Pour que nos textes est une apparence par défaut qui est correct comme le `normalize` on n'a le plugin `npm i @tailwindcss/typography`, on le charge dans le css `@plugin '@tailwindcss/typography'` ensuite dans notre `html` on donne la class `prose` qui va mettre en place du style par défaut pour nos éléments
    > On a `npx @tailwindcss/upgrade@next` qui permet d'automatiser la partie migration















- Animer le changement de thème via la propriété `clip-path`