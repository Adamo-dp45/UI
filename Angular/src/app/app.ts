import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Test } from './test/test';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromptList } from './prompts/prompt-list/prompt-list';
import { Navbar } from './layouts/navbar/navbar';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, DatePipe, CurrencyPipe, UpperCasePipe, Test, Navbar, FormsModule, Toast], /*
        - Va contenir l'ensemble des composants qu'on veut utiliser dans ce template
        - Les pipes
            - 'DatePipe' pour formater une date, on fais 'value | date' ou '..date: 'HH:mm..'
            - 'CurrencyPipe' !! un prix 'value | currency: 'EUR'
            - 'UpperCasePipe'.. 'value | uppercase'
            - 'FormsModule' pour utiliser le two way data binding avec 'ngModel'
    */
    templateUrl: './app.html', /*
        - Pour indiquer le template du composant ou utiliser l'option 'template: ``' pour écrire du html
    */
    styleUrl: './app.css' /*
        - !! le style ou utiliser l'option 'styles: ['h1{..}']'
    */
})
export class App { /*
        - On peut déclarer des variables ou fonctions pour y accedé dans le html
            - '{{ title + ' :)' }}' pour utiliser une variable
    */
    protected readonly title = signal('Angular');

    onNameClick(name: string) {
        console.log(name)
    }

    message = 'Salut à tous !'
    disabledButton = true
    count = 0
    inputValue = 'Text'
    a = 10
    b = 5
    people = [
        {id: 1, name: 'Jean', age: 15},
        {id: 2, name: 'Lea', age: 25},
        {id: 3, name: 'Luc', age: 31}
    ]
    countSignal = signal(0) // Ou.. comme 'ref' ou 'useState'
    quantitie = signal(10)
    price = signal(2) // 'price()' pour avoir la valeur du signal
    total = computed(() => this.quantitie() * this.price()) /*
        - Va per.. d'avoir la valeur d'autre signal, va être à jour automatiquement et 'total' est 'readonly' on ne peut pas le modifié via '.set'
    */

    constructor() {
        setTimeout(() => (this.countSignal.set(30)), 2000)
    }

    decrementer() {
        this.count--
    }

    logkey(event: KeyboardEvent) {
        console.log(event.key)
    }
}
