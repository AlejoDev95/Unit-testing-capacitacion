import { AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export class FormValidations {
  static validateEmail(service: AuthService) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(500),
        take(1),
        switchMap(email => service.validateEmail(email)),
        map(isInvalid => (isInvalid ? { email_not_avaiable: true } : null))
      );
    };
  }

  static validNumberInThePassword(control: AbstractControl) {
    const value = control.value;
    if (!/\d/.test(value)) {
      return { containsNumber: true };
    }
    return null;
  }

  static matchPassword(fieldA: string, fieldB: string) {
    return (form: AbstractControl) => {
      const valueA = form.get(fieldA);
      const valueB = form.get(fieldB);

      if (!valueA || !valueB) {
        throw new Error(`no_match: fields not found`);
      }

      const erroresA = getInitialErrors(valueA.errors);
      const erroresB = getInitialErrors(valueB.errors);

      if (valueA.value === valueB.value) {
        valueA.setErrors(erroresA);
        valueB.setErrors(erroresB);
        return null;
      }

      valueA.setErrors({ ...erroresA, no_match: true });
      valueB.setErrors({ ...erroresB, no_match: true });

      return null;
    };
  }
}

function getInitialErrors(errors: ValidationErrors | null) {
  const errorObj = { ...errors };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { no_match, ...error } = errorObj;
  return Object.keys(error).length > 0 ? error : null;
}
