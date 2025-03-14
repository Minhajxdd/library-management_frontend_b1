import { Component } from '@angular/core';
import { AdminNavbarComponent } from "../../../../shared/components/navbars/admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminNavbarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
