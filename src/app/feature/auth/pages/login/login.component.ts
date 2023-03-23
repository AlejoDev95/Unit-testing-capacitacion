import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Users } from '../../model/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loginr',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public isUserValid = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  public get email() {
    return this.loginForm.get('email');
  }

  public get password() {
    return this.loginForm.get('password');
  }

  public submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.log(this.loginForm);
    }

    this.authService
      .login(this.email?.value, this.password?.value)
      .pipe(
        tap((data: Users[]) => {
          if (data.length > 0) {
            this.isUserValid = false;
            this.router.navigate(['movies']);
            return;
          }
          this.isUserValid = true;
        })
      )
      .subscribe();
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
