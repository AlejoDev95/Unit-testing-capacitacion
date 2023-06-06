import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Users } from '../../model/auth';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';
import {
  setCheckboxValue,
  setInputValue,
  setSelectValue,
} from '../../../../../testing/forms';
import { asyncData, mockObservable } from '../../../../../testing/async-data';
import { clickElement } from '../../../../../testing/click';
import {
  queryByTestId,
  queryById,
  getText,
  queryAll,
} from '../../../../../testing/finder';

fdescribe('Register Component', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const spyAuthService = jasmine.createSpyObj('AuthService', [
      'registerUser',
      'validateEmail',
    ]);
    fixture = TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: spyAuthService,
        },
      ],
    }).createComponent(RegisterComponent);
  });

  beforeEach(() => {
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('fullname field', () => {
    xit('should show error messages when the field is empty', () => {
      const inputFullNameDe = fixture.debugElement.query(By.css('input#name'));
      const inputFullNameEl: HTMLInputElement = inputFullNameDe.nativeElement;

      inputFullNameEl.value = '';
      inputFullNameEl.dispatchEvent(new Event('input'));
      inputFullNameEl.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      const errorMessages: HTMLElement = fixture.debugElement.query(
        By.css('span[data-id="fullname-error"]')
      ).nativeElement;

      expect(component.userName?.invalid).toBeTrue();
      expect(errorMessages.textContent).toContain('The field is required');
    });

    it('should show error messages when the field is empty', () => {
      const inputFullNameDe = queryById(fixture, 'name');
      const inputFullNameEl: HTMLInputElement = inputFullNameDe.nativeElement;

      inputFullNameEl.value = '';
      inputFullNameEl.dispatchEvent(new Event('input'));
      inputFullNameEl.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      const errorMessages = getText(fixture, 'fullname-error', true);

      expect(component.userName?.invalid).toBeTrue();
      expect(errorMessages).toContain('The field is required');
    });

    xit('should not show error messages when the field is completed', () => {
      const inputFullNameEl: HTMLInputElement = queryById(
        fixture,
        'name'
      ).nativeElement;

      inputFullNameEl.value = 'Julian Sanchez';
      inputFullNameEl.dispatchEvent(new Event('input'));
      inputFullNameEl.dispatchEvent(new Event('blur'));
      fixture.detectChanges();

      const errorMessages = queryByTestId(fixture, 'fullname-error', false);

      expect(component.userName?.valid).toBeTrue();
      expect(errorMessages).toBeNull();
    });

    it('should not show error messages when the field is completed', () => {
      setInputValue(fixture, 'name', 'Julian Sanchez');
      fixture.detectChanges();

      const errorMessages = queryByTestId(fixture, 'fullname-error', false);

      expect(component.userName?.valid).toBeTrue();
      expect(errorMessages).toBeNull();
    });

    it('deberia ser valido', () => {
      setInputValue(fixture, 'name', 'julian');
      fixture.detectChanges();
      expect(component.userName?.valid).toBeTrue();
    });
  });

  describe('email field', () => {
    const selector = 'email';
    it('deberia mostrar el error de "The email already exists"', fakeAsync(() => {
      authService.validateEmail.and.returnValue(asyncData(true));
      setInputValue(fixture, selector, 'usuario-1@email.com');
      tick(1000);
      fixture.detectChanges();
      const errorMessages = getText(fixture, 'email-repeat', true);
      expect(errorMessages).toContain('The email already exists');
    }));

    it('No deberia mostrar el error de "The email already exists"', fakeAsync(() => {
      authService.validateEmail.and.returnValue(asyncData(false));
      setInputValue(fixture, selector, 'usuario-1@email.com');
      tick(1000);
      fixture.detectChanges();
      const errorMessages = queryByTestId(fixture, 'email-repeat', false);
      expect(errorMessages).toBeNull();
    }));

    it('El campo deberia ser valido"', fakeAsync(() => {
      authService.validateEmail.and.returnValue(asyncData(false));
      setInputValue(fixture, selector, 'usuario-1@email.com');
      tick(1000);
      fixture.detectChanges();
      expect(component.email?.valid);
    }));
  });

  describe('gender field', () => {
    const id = 'gender';
    it('Deberia mostrar un error cuando el campo esta vacio', () => {
      const select = queryById(fixture, id);
      select.triggerEventHandler('blur');
      fixture.detectChanges();
      const error = getText(fixture, 'gender-required', true);
      expect(error).toContain('The field is required');
    });

    it('Deberia ser valido cuando se selecciona una opcion', () => {
      setSelectValue(fixture, id, 'F', true);
      expect(component.gender?.value).toBe('F');
    });

    it('Deberia ser valido cuando se selecciona un opcion', () => {
      const selectEl: HTMLSelectElement = queryById(fixture, id).nativeElement;
      selectEl.dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      const options = queryAll(fixture, 'option');

      const optionSelected: HTMLOptionElement = options[2].nativeElement;
      optionSelected.selected = true;
      selectEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      expect(component.gender?.value).toBe('M');
    });
  });

  describe('password field', () => {
    const selector = 'password';
    it('Deberia mostrar el siguiente mensaje de error "The password must contain at least one number"', () => {
      setInputValue(fixture, selector, 'asdfgghjk');
      fixture.detectChanges();
      const errorMessage = getText(fixture, 'password-number', true);
      expect(errorMessage).toContain(
        'The password must contain at least one number'
      );
    });

    it('Deberia mostrar el siguiente mensaje de error "The passwords do not match"', () => {
      const expectedMessage = 'The passwords do not match';
      setInputValue(fixture, selector, 'julian123');
      setInputValue(fixture, 'confirm-password', '123julian');
      fixture.detectChanges();
      const errorMessage = getText(fixture, 'password-dont-match', true);
      expect(errorMessage).toContain(expectedMessage);
    });

    it('Deberia ser valido el input', () => {
      setInputValue(fixture, selector, 'julian1233');
      fixture.detectChanges();
      expect(component.password?.valid);
    });
  });

  describe('confirm Password', () => {
    const selector = 'confirm-password';
    it('Deberia mostrar el mensaje de error "The passwords do not match"', () => {
      const errorMessageExpected = 'The passwords do not match';
      setInputValue(fixture, selector, 'julian123');
      setInputValue(fixture, 'password', '123julian');
      fixture.detectChanges();
      const dontMatch = getText(fixture, 'confirmPassword-dont-match', true);
      expect(dontMatch).toContain(errorMessageExpected);
    });
  });

  describe('accepTerms', () => {
    const id = 'accep-terms';
    it('Deberia cambiar de estado cuando se selecciona', () => {
      const inputDe = queryById(fixture, id);
      const inputEl: HTMLInputElement = inputDe.nativeElement;

      expect(inputEl.checked).toBeFalse();
      expect(component.accepTerms?.invalid).toBeTrue();
      setCheckboxValue(fixture, id, true);
      fixture.detectChanges();
      expect(inputEl.checked).toBeTrue();
      expect(component.accepTerms?.valid).toBeTrue();
    });
  });

  describe('form', () => {
    const userExpected: Users = {
      id: '123',
      userName: 'Julian',
      email: 'julian@email.com',
      password: 'Julian123',
      confirmPassword: 'Julian123',
    };

    it('Debería enviar el formulario', fakeAsync(() => {
      authService.registerUser.and.returnValue(mockObservable(userExpected));
      authService.validateEmail.and.returnValue(asyncData(false));
      const spyRouter = spyOn(router, 'navigate');

      setInputValue(fixture, 'name', 'Julian');
      setInputValue(fixture, 'email', 'julian@email.com');
      setInputValue(fixture, 'password', 'Julian123');
      setInputValue(fixture, 'confirm-password', 'Julian123');
      setSelectValue(fixture, 'gender', 'F');
      setCheckboxValue(fixture, 'accep-terms', true);

      tick(1000);
      fixture.detectChanges();

      clickElement(fixture, 'btn-submit', true);
      expect(authService.registerUser).toHaveBeenCalled();
      expect(component.registerForm.valid).toBeTrue();
      expect(spyRouter).toHaveBeenCalled();
    }));

    it('No debería enviar el formulario', fakeAsync(() => {
      authService.registerUser.and.returnValue(mockObservable(userExpected));
      authService.validateEmail.and.returnValue(asyncData(false));
      const spyRouter = spyOn(router, 'navigate');

      setInputValue(fixture, 'name', '');
      setInputValue(fixture, 'email', 'julian');
      setInputValue(fixture, 'password', 'Julian1234');
      setInputValue(fixture, 'confirm-password', 'Julian1235');

      tick(1000);
      fixture.detectChanges();

      clickElement(fixture, 'btn-submit', true);
      expect(component.registerForm.valid).toBeFalse();
      expect(authService.registerUser).not.toHaveBeenCalled();
      expect(spyRouter).not.toHaveBeenCalled();
    }));
  });
});
