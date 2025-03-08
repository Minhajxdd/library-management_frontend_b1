import { Component } from '@angular/core';
import { UserNavbarComponent } from '../../../shared/components/navbars/user-navbar/user-navbar.component';
import { DahsboardSearchComponent } from "./dahsboard-search/dahsboard-search.component";

@Component({
  selector: 'app-book-dashboard',
  imports: [UserNavbarComponent, DahsboardSearchComponent],
  templateUrl: './book-dashboard.component.html',
  styleUrl: './book-dashboard.component.css'
})
export class BookDashboardComponent {

}
