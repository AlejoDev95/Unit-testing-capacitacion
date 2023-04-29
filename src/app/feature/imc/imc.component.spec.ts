import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from './class/person';
import { ImcComponent } from './imc.component';
import { PersonComponent } from './components/person/person.component';
import { ImcService } from './service/imc.service';

describe('IMC component', () => {
  let component: ImcComponent;
  let fixture: ComponentFixture<ImcComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [PersonComponent, ImcComponent],
      providers: [ImcService],
    }).createComponent(ImcComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    component.listOfPeople = [
      new Person('Persona 1', 27, 40, 1.68),
      new Person('Persona 2', 27, 58, 1.68),
      new Person('Persona 3', 34, 70, 1.5),
    ];

    fixture.detectChanges();
    const peopleDebug: DebugElement[] = fixture.debugElement.queryAll(
      By.css('app-person')
    );

    expect(peopleDebug.length).toBe(component.listOfPeople.length);
    expect(peopleDebug.length).not.toBe(5);
  });

  it('should show person selected', () => {
    const index = 1;
    const debugElement: DebugElement = fixture.debugElement;
    component.listOfPeople = [
      new Person('Persona 1', 27, 40, 1.68),
      new Person('Persona 2', 27, 58, 1.68),
      new Person('Persona 3', 34, 70, 1.5),
    ];

    fixture.detectChanges();
    const personDebug: DebugElement = debugElement.queryAll(
      By.css('app-person')
    )[index];

    const selectedButton = personDebug.query(
      By.css('button[data-id="person-button"]')
    );

    selectedButton.triggerEventHandler('click');
    fixture.detectChanges();

    const selectedPerson = debugElement.query(By.css('div#selected-person'));

    const name: HTMLElement = selectedPerson.query(
      By.css('ul > li')
    ).nativeElement;

    expect(name.textContent).toContain(component.listOfPeople[index].name);
  });
});
