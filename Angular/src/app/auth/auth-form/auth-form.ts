import { Component, inject, signal } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from "primeng/inputtext";
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-auth-form',
    imports: [ReactiveFormsModule, Card, ButtonModule, InputText, PasswordModule],
    templateUrl: './auth-form.html',
    styleUrl: './auth-form.css'
})
export class AuthForm {
    mode = signal<'login' | 'register'>('login')
    authService = inject(AuthService)
    router = inject(Router)
    messageService = inject(MessageService)

    submitting = signal(false)

    form = new FormGroup({
        username: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required
            ]
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(4)
            ]
        })
    })

    toggleMode() {
        this.mode.update((value) => (value === 'login' ? 'register' : 'login'))
    }

    submit() {
        this.form.markAllAsTouched()
        if(this.form.invalid) return

        this.submitting.set(true)
        const {username, password} = this.form.getRawValue()
        if(this.mode() === 'login') {
            this.login(username, password)
        } else {
            this.register(username, password)
        }
    }

    login(username: string, password: string) {
        this.authService.login(username, password).subscribe({
            next: () => {
                this.submitting.set(false)
                void this.router.navigate(['/'])
            },
            error: () => {
                this.submitting.set(false) /*
                    - Sinon s'il y'a une erreur le loader s'affichera
                */
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Connexion impossible, réssayez.'
                })
            }
        }) /*
            - Le 'subscribe()' à plusieurs choses dans son cycle de vie, par défaut il exécute la fonction 'next' qui s'exécute quand on a la première et autre valeur
        */
    }

    register(username: string, password: string) {
        this.authService.register(username, password).subscribe(() => {
            this.submitting.set(false)
            void this.router.navigate(['/'])
        }) /*
            - On peut faire une gestio d'erreur globale..
        */
    }
}
