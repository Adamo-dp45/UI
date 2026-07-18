import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

ReactDOM.hydrate(<App />, document.querySelector('#root')) // 'hydrate' permet de brancher notre virtualDOM sur du DOM qui a déjà été rendu côté serveur