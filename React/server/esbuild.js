import { build } from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals' // Pour éviter l'erreur de 'eval', permet de ne pas bundler tous ce qui est externe comme koa, koa-static ou react

build({
    entryPoints: ['server/App.jsx', 'server/server.jsx'], // Les fichiers qu'on veut convertir
    target: 'node14', // Pour préciser le format, pour savoir s'il doit convertir certaines variables
    format: 'esm', // Avoir un type 'module'
    platform: 'node', // On cible node ici, pas un navigateur
    outdir: 'server/dist', // Le dossier de destination
    logLevel: 'debug',
    bundle: true,
    plugins: [nodeExternalsPlugin()]
}) // Le 'plugin' va permettre de ne pas essayer de bundler tous ce qui est extérieur 'koa', 'koa-static' ou comme 'react'

build({
    entryPoints: ['server/main.jsx'], // Le fichier qu'on veut convertir
    target: 'chrome96', // Pour préciser le format et savoir s'il doit convertir certaines variables
    format: 'esm', // Avoir un type 'module'
    platform: 'browser', // On cible n navigateur
    outdir: 'server/dist', // Le dossier de destination
    bundle: true, // On veut bundler tous, mettre le code de react et tous directement dans le fichier
    logLevel: 'debug'
})

// node server/esbuild.js