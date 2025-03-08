import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminAuthGuard } from '../../../core/auth/guards/admin.guards';
import { AdminBooksComponent } from './admin-books/admin-books.component';

export const adminRoute: Routes = [
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/books',
    component: AdminBooksComponent,
    canActivate: [AdminAuthGuard],
  },
];
