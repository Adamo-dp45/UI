import { Component, inject, signal } from '@angular/core'
import { Prompt } from '../prompt.model'
import { PromptCard } from '../prompt-card/prompt-card'
import { PromptService } from '../prompt-service'
import { AsyncPipe } from '@angular/common'
import { toSignal } from '@angular/core/rxjs-interop'
import { tap } from 'rxjs'
import { ProgressSpinner } from 'primeng/progressspinner'

@Component({
    selector: 'app-prompt-list',
    imports: [PromptCard, AsyncPipe, ProgressSpinner],
    templateUrl: './prompt-list.html',
    styleUrl: './prompt-list.css'
})
export class PromptList {
    promptService = inject(PromptService) // Pour injecter le service
    prompts = signal<Prompt[]>([])
    loading = signal(true) // Puis dans 'promptsT'

    constructor() {
        this.promptService.getPrompts().subscribe(prompts =>  {
            this.prompts.set(prompts)
        }) /*
            - 'getPrompts()' va se déclancher uniquement lorsqu'il y'a un abonnement dessus via 'subscribe()'
        */
    } /*
        - On peut simplifier cette manière de récupérer les données via les déclaratives
    */
    prompts$ = this.promptService.getPrompts() /*
        - Puis dans la vue on utilise la pipe 'async' qui déclanche automatiquement le 'Observable'
    */ /*
        - Ou.. via 'toSignal()'
    */
    promptsT = toSignal(
        this.promptService.getPrompts().pipe(tap(() => this.loading.set(false))), // Dès qu'on reçois la reponse le 'loading' devient 'false'
        {initialValue: []}
    )

    /*
        prompts: Prompt[] = [ -- Vu qu'on n'a utilisé le 'promptService'
            {
                id: 2,
                title: "Post LinkedIn engageant",
                content: "Écris un post LinkedIn court (150–200 mots) qui :\n\n- commence par une accroche question ou chiffre\n- partage une idée concrète ou une leçon apprise\n- se termine par un call-to-action (question ou invitation à commenter)\n\nTon professionnel mais humain.",
                score: 1,
                createdAt: "2025-01-20T14:30:00.000Z",
                category: {
                    id: 2,
                    name: "Posts LinkedIn"
                },
                author: {
                    id: 2,
                    username: "alice"
                },
                userVote: null
            },
            {
                "id": 3,
                "title": "Article de blog SEO",
                "content": "Rédige une introduction d'article de blog (2–3 paragraphes) optimisée SEO :\n\n- inclure le mot-clé principal dans le premier paragraphe\n- poser le problème du lecteur\n- annoncer ce que l'article va apporter\n\nTon clair et direct.",
                "score": 0,
                "createdAt": "2025-01-25T09:15:00.000Z",
                "category": {
                "id": 3,
                "name": "Rédaction"
                },
                "author": {
                "id": 2,
                "username": "alice"
                },
                "userVote": null
            },
            {
                "id": 4,
                "title": "Prompt pour image IA stylisée",
                "content": "Crée une image avec :\n\n- un sujet principal bien défini\n- un style artistique cohérent (ex. aquarelle, pixel art, photoréaliste)\n- une composition équilibrée\n- des couleurs harmonieuses\n\nÉviter le texte dans l'image.",
                "score": 0,
                "createdAt": "2025-01-28T11:00:00.000Z",
                "category": {
                "id": 1,
                "name": "Génération d'image"
                },
                "author": {
                "id": 3,
                "username": "bob"
                },
                "userVote": null
            },
            {
                "id": 5,
                "title": "Commentaire de code expliqué",
                "content": "Génère un court commentaire (1–2 lignes) en anglais pour une fonction :\n\n- décrire l'intention (what/why), pas le détail d'implémentation\n- style JSDoc ou docstring selon la langue.",
                "score": 0,
                "createdAt": "2025-02-01T08:45:00.000Z",
                "category": {
                "id": 4,
                "name": "Code"
                },
                "author": {
                "id": 3,
                "username": "bob"
                },
                "userVote": null
            }
        ] -- Ou.. 'fetch'
    */
}
