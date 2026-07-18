import { ChangeDetectorRef, Component, computed, inject, input, InputSignal, linkedSignal, signal } from '@angular/core'
import { Prompt } from '../prompt.model'
import { Button } from 'primeng/button'
import { TagModule } from 'primeng/tag'
import { Card } from 'primeng/card'
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../auth/auth-service'
import { PromptService } from '../prompt-service'
import { from } from 'rxjs'
import { MessageService } from 'primeng/api'

@Component({
    selector: 'app-prompt-card',
    imports: [Button, TagModule, Card, RouterLink],
    templateUrl: './prompt-card.html',
    styleUrl: './prompt-card.css',
})
export class PromptCard {
    prompt: InputSignal<Prompt> = input.required<Prompt>() /*
        - 'input' ce qui rentre dans le composant, 'required' pour indiquer qu'il est obligatoire
    */
    authService = inject(AuthService)
    promptService = inject(PromptService)
    router = inject(Router)
    messageService = inject(MessageService)
    voting = signal(false)

    canEdit = computed(() => {
        const currentUser = this.authService.currentUser()
        return currentUser && this.prompt().author.id === currentUser.id
    })

    score = linkedSignal(() => this.prompt().score) /*
        - Permet d'avoir une valeur initial qui vient de 'prompt().score' et le 'linkedSignal' est comme un 'computed' mais on peut écrire dessus
    */
    userVote = linkedSignal(() => (this.authService.currentUser() ? this.prompt().userVote : null)) // 'authService' pour que quand on se déconnecte la class du bouton s'actualise

    copyToClipboard() {
        from(navigator.clipboard.writeText(this.prompt().content)).subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Copié',
                detail: 'Le prompt a été copié dans le presse-papier'
            })
        }) /*
            - 'writeText' renvoi une promise donc 'async'
            - 'from()' pour le transformer en un 'Observable' ce qui permet le 'subscribe()'
        */
    }

    upvote() {
        if(!this.authService.currentUser()) {
            void this.router.navigate(['/auth'])
            return
        }
        this.voting.set(true)
        this.promptService.upvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
            // this.prompt.set(updatedPrompt) -- On pourrais se dire ça mais un 'input' par défaut n'est pas un 'signal' on ne peut pas écrire dessus, Ou.. 'this.prompt().score = updatedPrompt.score' mais ne déclanche pas le rafraichement du dom mais on peut utiliser le 'ChangeDetectorRef' qui permet déclancher le refresh du dom et ça va marché mais on vas utiliser les 'linkedSignal'
            this.score.set(updatedPrompt.score)
            this.userVote.set(updatedPrompt.userVote)

            this.voting.set(false)
        })
    }

    downvote() {
        if(!this.authService.currentUser()) {
            void this.router.navigate(['/auth'])
            return
        }
        this.voting.set(true)
        this.promptService.downvotePrompt(this.prompt().id).subscribe((updatedPrompt) => {
            this.score.set(updatedPrompt.score)
            this.userVote.set(updatedPrompt.userVote)

            this.voting.set(false)
        })
    }
}
