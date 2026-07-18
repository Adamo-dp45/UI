import { HttpInterceptorFn } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => { // Ensuite dans 'app.config.ts'.. 'provideHttpClient'
    return next(req.clone({
        withCredentials: true
    }))
} /*
    - On modifie nos requêtes pour qu'elles envoi tous ce qui est cookie sécurisé d'authentification vu que la backend renvoi un 'set-Cookie' contenant le 'token jwt'
*/
