import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImcComponent } from './imc.component';
import { PersonComponent } from './components/person/person.component';
import { ImcService } from './service/imc.service';

fdescribe('IMC component', () => {
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
});
