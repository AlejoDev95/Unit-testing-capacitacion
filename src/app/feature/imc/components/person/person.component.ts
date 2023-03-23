import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImcService } from '../../service/imc.service';
import { Person } from '../../class/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styles: [],
})
export class PersonComponent {
  @Input()
  public person = new Person('', 0, 0, 0);

  @Output()
  public selectedPerson = new EventEmitter<Person>();

  public imc = '';

  constructor(private imcService: ImcService) {}

  public calculateIMC = () => {
    this.imc = this.imcService.calculateIMC(
      this.person.weight,
      this.person.height
    );
  };

  public sendSelectedPerson = () => this.selectedPerson.emit(this.person);
}
