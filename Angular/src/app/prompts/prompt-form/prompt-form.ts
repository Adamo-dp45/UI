import { Component, effect, inject, input, signal } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CategoryService } from '../category-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { PromptService } from '../prompt-service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
    selector: 'app-prompt-form',
    imports: [CardModule, Button, InputTextModule, TextareaModule, Select, ReactiveFormsModule, ProgressSpinner], /*
        - 'ReactiveFormsModule' pour les formulaires réactifs, on a aussi 'SignalForm..'
    */
    templateUrl: './prompt-form.html',
    styleUrl: './prompt-form.css'
})
export class PromptForm {
    router = inject(Router)
    promptService = inject(PromptService)
    categoryService = inject(CategoryService)
    messageService = inject(MessageService)
    categories = toSignal(this.categoryService.getCategories(), {initialValue: []})

    submitting = signal(false)
    deletting = signal(false)
    loading = signal(false)

    promptId = input<number>() /*
        - Non 'required' vu que le new l'utilise
    */
    // - Pour exécuter du code dès qu'on reçois un signal ici mon input 'promptId' on utilise un 'effect' dans le.. - //
    constructor() {
        effect(() => {
            const promptId = this.promptId()
            if(promptId) {
                this.loading.set(true)
                this.promptService.getPrompt(promptId).subscribe(prompt => {
                    this.form.patchValue({ /*
                            - Permet de remplir le formulaire
                        */
                        title: prompt.title,
                        content: prompt.content,
                        categoryId: prompt.category.id
                    })
                    this.loading.set(false)
                })
            }
        })
    }

    form = new FormGroup({ /*
            - formBuilder = inject(FormBuilder) - this.formBuilder.group({id: ['', Val..]}) -- Un factory pour créer des 'FormGroup'
        */
        title: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.maxLength(30)
            ] /*
                - Permet de valider le champ
            */
        }),
        content: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(2)
            ]
        }),
        categoryId: new FormControl(-1, {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.min(0)
            ]
        }) // Une astuce pour éviter que le '-1' correspon à null sans être 'nonNullable' vu qu'on ne peut pas avoir de chose null ici
    }) /*
        - 'FormGroup' va grouper un ensemble de champs, pour créer un formulaire réactif, on peut aussi utiliser les formulaires basés sur les templates avec 'ngModel'
        - 'FormControl' représente un champ
        - Pour la class d'invalidation des champs, dans 'styles.css'
    */ /*
        - Ensuite dans la vue via '[formGroup]', '(ngSubmit)' et 'formControlName'
    */
    submit() {
        this.form.markAllAsTouched() /*
            - On marque tous les champs comme 'touched' lorsqu'on soumet le formulaire puis tous les champs invalides seront marqués en rouge
        */
        if(this.form.invalid) {
            return
        }
        const prompt = this.form.getRawValue() /*
            - 'getRawValue' pour éviter que les champs soient 'undefined' par défaut vu que notre méthode attend des données
        */
        this.submitting.set(true)

        const promptId = this.promptId() // Sinon il va rallé
        if(promptId) {
            this.promptService.updatePrompt(promptId, prompt).subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Modifié',
                    detail: 'Le prompt a été modifié avec succès'
                })
                this.submitting.set(false)
                void this.router.navigate(['/'])
            })
        } else {
            this.promptService.createPrompt(prompt).subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Crée',
                    detail: 'Le prompt a été crée avec succès'
                })
                this.submitting.set(false)
                void this.router.navigate(['/']) // 'void' vu que 'navigate()' renvoi une 'Promise' et qu'on ne veut rien faire
            }) /*
                - Si on lui passe directement le 'prompt' on aura une erreur vu qu'il va recevoir un type 'Partial<{title: string | null..}> dans lequel chaque champ est optionnel et 'undifned' donc pour éviter le 'undifned' on a utiliser '..form.getRawValue()' au lieu de '..form.value' et le null on l'a géré dans 'new FormControl('', {nonNullable: true})'
                - 'subscribe()' sinon rien ne se passe vu que c'est un 'Observable'
            */
        }
    }

    deletePrompt() {
        this.deletting.set(true)
        this.promptService.deletePrompt(this.promptId()!).subscribe(() => {
            this.messageService.add({
                severity: 'success',
                summary: 'Supprimé',
                detail: 'Le prompt a été supprimé avec succès'
            })
            this.deletting.set(false)
            void this.router.navigate(['/'])
        }) /*
            - On met 'this.promptId()!' pour indiquer à typescript qu'on aura forçement une donnée ou on peut vérifier
        */
    }
}
