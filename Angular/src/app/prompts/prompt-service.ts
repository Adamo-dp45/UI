import { inject, Injectable } from '@angular/core'
import { Prompt } from './prompt.model'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { delay } from 'rxjs'

@Injectable({ /*
        - Pour indiquer qu'il sera injectable dans les composants
    */
    providedIn: 'root', /*
        - 'root' pour indiquer qu'il est disponible dans toute l'application
    */
})
export class PromptService {

    httpClient = inject(HttpClient) /*
        - On injecte le service 'HttpClient' pour faire des requêtes http
    */
    baseUrl = environment.apiUrl /*
        - On doit importer pour la production et sera remplacé par le developpement quand on est en local
    */

    getPrompts() {
        return this.httpClient.get<Prompt[]>(this.baseUrl + '/prompts').pipe(delay(3000)) /*
            - Va renvoyer un 'Observable<Prompt[]>' qui permet gérer les opérations 'async' sur lequel le composant pourra s'abonner pour obtenir les données et qui provient de 'RxJS'
        */
    }

    getPrompt(promptId: number) {
        return this.httpClient.get<Prompt>(`${this.baseUrl}/prompts/${promptId}`).pipe(delay(3000))
    }

    createPrompt(prompt: {title: string, content: string, categoryId: number}) {
        return this.httpClient.post<Prompt>(this.baseUrl + '/prompts', prompt).pipe(delay(3000))
    }

    updatePrompt(promptId: number, prompt: {title: string, content: string, categoryId: number}) {
        return this.httpClient.put<Prompt>(`${this.baseUrl}/prompts/${promptId}`, prompt).pipe(delay(3000))
    }

    deletePrompt(promptId: number) {
        return this.httpClient.delete(`${this.baseUrl}/prompts/${promptId}`).pipe(delay(3000))
    }

    upvotePrompt(promptId: number) {
        return this.httpClient.post<Prompt>(`${this.baseUrl}/prompts/${promptId}/upvote`, null).pipe(delay(3000))
    }

    downvotePrompt(promptId: number) {
        return this.httpClient.post<Prompt>(`${this.baseUrl}/prompts/${promptId}/downvote`, null).pipe(delay(3000))
    }
}
