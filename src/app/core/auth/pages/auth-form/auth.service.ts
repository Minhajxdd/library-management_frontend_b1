import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataModel, RegisterResponseModel } from './auth-form.model';
import { environment } from '../../../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthFormService {
  private readonly http = inject(HttpClient);

  register(userData: DataModel) {
    return this.http
      .post<RegisterResponseModel>(
        environment.back_end + '/auth/register',
        userData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  login(userData: DataModel) {
    return this.http
      .post<{ access_token: string }>(
        `${environment.back_end}/auth/login`,
        userData,
        {
          withCredentials: true,
        }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err.error.message);
        })
      );
  }

  getCookie(name: string): string | null {
    const match = document.cookie.match(
      new RegExp('(^| )' + name + '=([^;]+)')
    );
    return match ? decodeURIComponent(match[2]) : null;
  }
}
