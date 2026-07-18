### Next `nextjs.org`

- 
- npm run dev

- `next.config.ts` la configuration
- `app/layout.tsx` le layout de toute l'application, s'applique à toutes les pages enfants
- Pour la librairie on.. `Shadcn`, pour changer le chemin des composants vers `src/` on.. `components.json`
- Le système de routing se fais avec les dossiers `Folder based routing`
    > `[...all]` permet de récupérer tous les paramètres dans l'url après /blog dans un tableau
- `loading.tsx` permet de définir l'interface lors du chargement
- `error.tsx` pour gérer les erreurs

Le `use client` permet de passer en client component et tous les enfants de ce composant le seront aussi, `use server` !! le server component par défaut

<Suspend pour chargement skeleton

21st.dev
tanstack react form, react hook form
nuqs : permet de gérer un state dans l'url utile pour les filtres

Client(hooks, dom, fetch), Server(fetch, database, async)

- Backend
    - Pour créer une `api route` on créer le dossier `api/`
    - !! sauvegarder les données on.. `prisma`


Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour optimiser et charger automatiquement [Geist](https://vercel.com/font), une nouvelle famille de polices pour Vercel.

- [Apprendre Next.js](https://nextjs.org/learn) : un tutoriel interactif sur Next.js.
ou mlv.sh/nextjs

## Déploiement sur Vercel

La méthode la plus simple pour déployer votre application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) des créateurs de Next.js.

Pour plus d'informations, consultez notre [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying)