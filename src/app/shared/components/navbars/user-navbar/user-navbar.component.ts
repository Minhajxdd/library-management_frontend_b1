import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/service/auth.service';

@Component({
  selector: 'app-user-navbar',
  imports: [],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  private readonly authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
