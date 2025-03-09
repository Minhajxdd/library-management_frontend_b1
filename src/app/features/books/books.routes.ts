import { Routes } from '@angular/router';
import { BookDashboardComponent } from './pages/book-dashboard/book-dashboard.component';
import { UserAuthorizedGuard } from '../../core/auth/guards/user.authorized.guards';

export const booksRoute: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: BookDashboardComponent,
    canActivate: [UserAuthorizedGuard],
  },
  { path: '**', redirectTo: 'dashboard' },
];
