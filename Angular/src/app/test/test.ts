import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { LevelPipe } from '../level-pipe';

type Employee = {
    name: string
}

@Component({
    selector: 'app-test',
    imports: [LevelPipe],
    // templateUrl: './test.html',
    template: `
        <p>{{ age }}</p>
        <button (click)="incrementer()">Incrémenter</button>
        <input #myInput (input)="onEdit(myInput.value)" type="text" />
        <p>{{ theValue }}</p>

        <input [type]="inputType" />
        <button (click)="toggleInputType()">Toggle input</button>

        {{ 'S' | level }}

        @let d = data();
        <p>Test {{ d.name }}</p>
        <button (click)="onNameClick()"></button>
    `, /*
        - '(input)' lorsqu'on écris dans le champ
        - '(click)' au clique
        - '[type]' pour indiquer qu'un attribut est dynamique
    */
    styleUrl: './test.css',
})
export class Test {
    protected readonly title = 'Test'
    protected age = 20
    theValue = ''
    inputType: 'password' | 'text' = 'password'

    data: InputSignal<Employee> = input.required<Employee>() /*
        - Pour que le composant puisse recevoir des données, on l'a 'app.ts'.. ensuite pour l'afficher {{ data().name }}, pour éviter d'appeler le getter à chaque fois on peut dans la vue '@let d = data()..'
    */
    nameClick: OutputEmitterRef<string> = output<string>() /*
        - Pour émettre un évènement, 'string' ce qu'on envoi au parent et ': OutputEmitterRef<string>' optionnel
    */
    onNameClick() {
        this.nameClick.emit(this.data().name) /*
            - 'emit' pour émttre l'évènement vers l'extérieur, dans 'app.ts'
        */
    }

    incrementer() {
        this.age++
    }

    onEdit(value: string) {
        console.log(value)
        this.theValue = value
    }

    toggleInputType() {
        this.inputType = this.inputType === 'password' ? 'text' : 'password'
    }
} /*
    - Pour utiliser ce composant on le fait dans 'app.ts' via 'imports'
*/