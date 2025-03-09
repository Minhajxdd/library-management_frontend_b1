import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  imports: [RouterLink],
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  private readonly authService = inject(AuthService);

  onLogout() {
    this.authService.logout();
  }
}
