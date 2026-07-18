import { Pipe, PipeTransform } from '@angular/core';
import { Level } from './models/level.model';

const LEVEL: Record<Level, string> = { /*
        - 'Record' pour indiquer la clé et valeur
    */
    'J': 'Junior',
    'M': 'Mid',
    'S': 'Senior'
}

@Pipe({
    name: 'level',
})
export class LevelPipe implements PipeTransform {
    transform(value: Level): string {
        return LEVEL[value] || value;
    }
}
