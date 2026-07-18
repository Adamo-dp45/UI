import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './auth-service'

export const authGuard: CanActivateFn = (route, state) => { /*
        - On peut l'utiliser sur nos routes 'app.routes.ts' via 'canActivate' vu qu'à la création du guard on l'a choisi
    */
    const authService = inject(AuthService)
    const router = inject(Router)
    if(authService.currentUser()) {
        return router.createUrlTree(['/prompts']) /*
            - Permet de naviguer parfaitement sur le auth
        */
    }
    return true
}