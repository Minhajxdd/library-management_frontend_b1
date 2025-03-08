import { Routes } from '@angular/router';
import { AuthFormComponent } from './pages/auth-form/auth-form.component';
import { UserUnauthorizedAuthGuard } from './guards/user-unauthorized.guards';
import { AuthAdminPageComponent } from './pages/auth-admin-page/auth-admin-page.component';

export const authRoutes: Routes = [
  {
    path: 'register',
    component: AuthFormComponent,
    canActivate: [UserUnauthorizedAuthGuard],
  },
  {
    path: 'login',
    component: AuthFormComponent,
    canActivate: [UserUnauthorizedAuthGuard],
  },
  {
    path: 'admin/login',
    component: AuthAdminPageComponent,
    canActivate: [UserUnauthorizedAuthGuard],
  },
];
