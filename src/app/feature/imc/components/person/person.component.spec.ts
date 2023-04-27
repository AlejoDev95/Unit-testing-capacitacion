import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from '../../class/person';
import { ImcService } from '../../service/imc.service';
import { PersonComponent } from './person.component';

describe('Person component', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let imcService: jasmine.SpyObj<ImcService>;

  beforeEach(() => {
    const imcSpy = jasmine.createSpyObj(ImcService, ['calculateIMC']);
    fixture = TestBed.configureTestingModule({
      declarations: [PersonComponent],
      providers: [{ provide: ImcService, useValue: imcSpy }],
    }).createComponent(PersonComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    imcService = TestBed.inject(ImcService) as jasmine.SpyObj<ImcService>;
    component.person = new Person('Julian', 27, 67, 168);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title with the person name', () => {
    const expectTitle = `Hi, my name is ${component.person.name}`;
    const title = fixture.debugElement.query(By.css('h3'));
    const titleElement: HTMLElement = title.nativeElement;
    expect(titleElement.textContent).toBe(expectTitle);
  });

  // TODO: Challenge -> Get the height

  it('It should calculate the BMI when the "calculate IMC" button is clicked and display it on the screen', () => {
    imcService.calculateIMC.and.returnValue('Fake message');
    const ImcButton: DebugElement = fixture.debugElement.query(
      By.css('button[data-id="imc-button"]')
    );

    ImcButton.triggerEventHandler('click');
    fixture.detectChanges();
    const imcMessage: HTMLElement = fixture.debugElement.query(
      By.css('p[data-id="imc-result"]')
    ).nativeElement;

    expect(imcService.calculateIMC).toHaveBeenCalled();
    expect(imcMessage.textContent).toContain('Fake message');
  });

  it('should call selectedPerson when the "Send selected person" button is clicked', doneFn => {
    const expectPerson = new Person('Alejandro', 27, 84, 1.68);
    const buttonDebug = fixture.debugElement.query(
      By.css('button[data-id="person-button"]')
    );
    let selectedPerson: Person | undefined;
    component.person = expectPerson;

    component.selectedPerson.subscribe(person => {
      selectedPerson = person;
      doneFn();
    });

    buttonDebug.triggerEventHandler('click');
    fixture.detectChanges();

    expect(selectedPerson).toEqual(expectPerson);
  });
});

@Component({
  template: ` <app-person
    [person]="person"
    (selectedPerson)="getSelectedPerson($event)" />`,
})
class HostComponent {
  public person = new Person('Usuario-test', 24, 80, 1.85);
  public selectedPerson: Person | undefined;

  public getSelectedPerson = (person: Person) => {
    this.selectedPerson = person;
  };
}
