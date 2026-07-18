import { Component, effect, inject, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { AuthService } from '../../auth/auth-service';

@Component({
    selector: 'app-navbar',
    imports: [Button, RouterLink], /*
        - 'RouterLink' pour utiliser le router dans la vue
    */
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    authService = inject(AuthService)
    router = inject(Router)
    loggingOut = signal(false)
    readonly DARK_MODE_KEY = 'dark-mode' 
    isDark = signal(localStorage.getItem(this.DARK_MODE_KEY) === 'true') /*
        - On a mis 'true' en string vu qu'on va les stockés ainsi, epuis si 'isDark' est à 'true' le problème est que le 'toggleDarkMode()' ne vas pas se déclanché comme ça pour on utilise le 'effect()'
    */
    constructor() {
        effect(() => {
            document.documentElement.classList.toggle('dark', this.isDark())
            localStorage.setItem(this.DARK_MODE_KEY, String(this.isDark()))
        })
    }

    toggleDarkMode() {
        this.isDark.update(value => !value) /*
            - 'update' pour 'set' la variable à partire de sa valeur actuelle
        */
        document.documentElement.classList.toggle('dark', this.isDark())
    }

    logout() {
        this.loggingOut.set(true)
        this.authService.logout().subscribe(() => {
            this.loggingOut.set(false)
            void this.router.navigate(['/'])
        })
    }
}
