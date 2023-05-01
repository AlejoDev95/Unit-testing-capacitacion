import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { FormValidations } from '../../custom-validations/form-validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  public get userName() {
    return this.registerForm.get('userName');
  }

  public get email() {
    return this.registerForm.get('email');
  }

  public get gender() {
    return this.registerForm.get('gender');
  }

  public get password() {
    return this.registerForm.get('password');
  }

  public get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  public get accepTerms() {
    return this.registerForm.get('accepTerms');
  }

  ngOnInit(): void {
    this.createForm();
  }

  public submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.log(this.registerForm);
      return;
    }

    this.authService
      .registerUser(this.registerForm.value)
      .pipe(tap(() => this.router.navigate(['private', 'movies'])))
      .subscribe();
  }

  public clearForm(): void {
    this.registerForm.reset();
  }

  private createForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        userName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required],
          [FormValidations.validateEmail(this.authService)],
        ],
        gender: ['', Validators.required],
        password: [
          '',
          [Validators.required, FormValidations.validNumberInThePassword],
        ],
        confirmPassword: ['', [Validators.required]],
        accepTerms: [false, Validators.requiredTrue],
      },
      {
        validators: FormValidations.matchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }
}
