import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { CurrentUser } from './current-user.model'
import { catchError, delay, of, tap } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    httpClient = inject(HttpClient)
    baseUrl = environment.apiUrl + '/auth'
    currentUser = signal<CurrentUser | undefined>(undefined)

    login(username: string, password: string) {
        return this.httpClient
            .post<CurrentUser>(`${this.baseUrl}/login`, {username, password})
            .pipe(tap(currentUser => this.currentUser.set(currentUser))) /*
                - Pour stocker la valeur qu'on du 'post' via le système d'opérateur de 'RxJS' et ensuite 'subscribe' quelque part pour déclancher
                - On peut ', delay(3000)' pour tester dans '.pipe()'
            */
    }

    register(username: string, password: string) {
        return this.httpClient
            .post<CurrentUser>(`${this.baseUrl}/register`, {username, password})
            .pipe(tap(currentUser => this.currentUser.set(currentUser))) /*
                - Pour stocker la valeur qu'on du 'post' via le système d'opérateur de 'RxJS' et ensuite 'subscribe' quelque part pour déclancher
            */
    }

    logout() {
        return this.httpClient
            .post(`${this.baseUrl}/logout`, {})
            .pipe(tap(() => this.currentUser.set(undefined)))
    }

    loadCurrentUser() { /*
            - Le 'loadCurrentUser' on peut le mettre dans plusieurs endroit de l'application comme 'app.ts' mais vu qu'on est sur quelque chose qu'on veut utiliser au chargement de l'application on vas charger le 'load..' au moment de 'app.initialisor' l'initialisation de l'application pour l'appeler le plus tôt possible via 'app.config.ts'..'provideAppInitializer'
        */
        return this.httpClient
            .get<CurrentUser>(`${this.baseUrl}/me`)
            .pipe(
                tap(currentUser => this.currentUser.set(currentUser)),
                catchError(() => { /*
                        - Pour gérer l'erreur et il attend un 'Observable' en retour
                    */
                    this.currentUser.set(undefined)
                    return of() /*
                        - L'observable 'of' retourne 'undefined'
                    */
                })
            )
    }
}
