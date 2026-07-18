import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App.jsx'
import Koa from 'koa'
import serve from 'koa-static'

// console.log(ReactDOMServer.renderToString(<App />)) -- Lui va permettre ensuite une phase d'hydratation
// console.log(ReactDOMServer.renderToStaticMarkup(<App />)) -- Le rendu html pur tel qu'on l'a écrit dans notre fichier

// Koa static pour pouvoir charger le js sur notre page web, permet de rendre un dossier static dans koa, on lui demande de prendre tous ce qui se situe dans le ./dist

const app = new Koa()
app.use(serve('./server/dist')) // L'idée est de pouvoir faire un localhost:8000/main.js pour avoir le javascript
app.use((ctx) => {
    const html = ReactDOMServer.renderToString(<App />)
    ctx.body = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="./dist/main.js" defer></script>
<title>Document</title>
</head>
<body>
<div id="root">${html}</div>
</body>
</html>`
})
app.listen(8000)

// node server/dist/server.js -- Pour démarrer le serveur
// npx nodemon server/server.js