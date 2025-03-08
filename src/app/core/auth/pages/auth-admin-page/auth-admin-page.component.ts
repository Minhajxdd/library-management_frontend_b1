import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthAdminFormService } from './auth-admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { authFormTemplateModel, DataModel } from '../auth-form/auth-form.model';
import { authAdminFormTemplate } from './auth-admin-template';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-auth-admin-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-admin-page.component.html',
  styleUrl: './auth-admin-page.component.css',
})
export class AuthAdminPageComponent {
  private readonly authAdminService = inject(AuthAdminFormService);
  private readonly router = inject(Router);
  private readonly destoryRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  authForm: FormGroup<authFormTemplateModel>;

  errMsg = signal<string>('');

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group(authAdminFormTemplate);
  }

  onSubmit() {
    if (this.propertyIsValid('email')) {
      this.errMsg.set('Please Enter Valid Email');
    }

    if (this.propertyIsValid('password')) {
      this.errMsg.set(
        'Password Should Be 6 Characters & Should Contain One Number or Symbol'
      );
    }

    this.submitData();
  }

  submitData() {
    const email = this.authForm.controls.email?.value;
    const password = this.authForm.controls.password?.value;

    if (!email || !password) {
      return this.errMsg.set('All Fields are required');
    }

    const data: DataModel = {
      email,
      password,
    };

    let sucessFullyLogged = false;

    const subscription = this.authAdminService.login(data).subscribe({
      next: (data: any) => {
        if (this.authService.isAdmin()) {
          this.errMsg.set('No Admin Found!');
        } else {
          sucessFullyLogged = true;
        }
      },
      error: (err: string) => {
        this.errMsg.set(err);
      },
      complete: () => {
        if (sucessFullyLogged) {
          this.router.navigate(['admin', 'dashboard']);
        }
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  propertyIsValid(propertyName: keyof typeof this.authForm.controls) {
    const control = this.authForm.controls[propertyName];
    return control?.touched && control?.invalid;
  }
}
