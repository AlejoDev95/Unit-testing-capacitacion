import { Component } from '@angular/core';
import { Person } from './class/person';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.component.html',
  styles: [],
})
export class ImcComponent {
  public listOfPeople: Person[] = [
    new Person('Persona 1', 27, 40, 1.68),
    new Person('Persona 2', 27, 58, 1.68),
    new Person('Persona 3', 34, 70, 1.5),
    new Person('Persona 4', 18, 95, 1.92),
    new Person('Persona 5', 23, 58, 1.88),
    new Person('Persona 6', 44, 59, 1.72),
  ];

  public selectedPerson!: Person;

  public getSelectedPerson = (person: Person) => {
    this.selectedPerson = person;
  };
}
