import { createMachine, guard, invoke, reduce, state, transition } from 'robot3'

const wait = (duration) => { // On simule un appel a un serveur
    return new Promise((resolve, reject) => {
        window.setTimeout(function() {
            resolve()
            // reject(new Error('Impossile de syncroniser'))
        }, duration)
    })
}

export default createMachine(
    { // -- Schema de notre machine 
    idle: state( // Etat
        transition('edit', 'edit') // Permet de passer d'un état à un autre, prend en paramètre un nom et vers quel état je veut partir
    ),
    edit: state(
        transition('cancel', 'idle'),
        transition('input', 'edit', reduce((ctx, event) => ({ // Prend en params le context et l'évènement, en fonction de ça on doit retourner le nouveau context
            ...ctx, editedTitle: event.value // title: event.value -- Plutôt que de changer la valeur directement on a sauvegarder une nouvelle valeur pour pouvoir des traitements
        }))), // 'reduce' Va être appeler lorsqu'il y'aura un changement d'état
        transition('submit', 'loading', guard(ctx => ctx.editedTitle && ctx.editedTitle !== ctx.title)) // 'guard' prend en params une fonction qui reçoit un context et qui va vérifier si oui ou non on doit faire les choses, donc si on soumet sans changer le titre rien ne vas se passer
    ),
    // Permet d'empêcher une transition sous certaines conditions
    loading: invoke(
        async () => {
            await wait(3000)
            return {title: 'Titre côté serveur'}
        }, // On pourrait réupérer des informations depuis le serveur
        transition(
            'done', // 'done' est appelé avec un évènement et contiendra dans ses données il aura ceux que renvoi la promese
            'success',
            reduce((ctx, e) => ({...ctx, title: e.data.title}))
        ),
        transition(
            'error', // En cas d'erreur
            'error',
            reduce((ctx, e) => ({...ctx, error: e.error.message}))
        ) 
    ), // 'invoke' permet de lancer une promesse et lors de la résolution va permettre d'éffectuer une transition, prend en premier params une promesse
    success: invoke(() => wait(2000), transition('done', 'idle')), // state(transition('dismiss', 'idle')),
    error: state(
        transition('cancel', 'idle'),
        transition('input', 'edit', reduce((ctx, event) => ({
            ...ctx, editedTitle: event.value
        }))),
        transition('submit', 'loading', guard(ctx => ctx.editedTitle && ctx.editedTitle !== ctx.title)),
        transition('dismiss', 'edit')
    )
}, (ctx) => ({...ctx, editedTitle: ctx.title, error: null })) // Prend en deuxième params un context, qui va nous permettre de persisiter les informations et autres, ici une fonction qui renvoi le context car on pourrait l'utiliser dans 'interpret', chaque nouvelle machine aura un context différent