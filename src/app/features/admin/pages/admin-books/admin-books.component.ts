import { Component, signal } from '@angular/core';
import { AdminNavbarComponent } from "../../../../shared/components/navbars/admin-navbar/admin-navbar.component";
import { AddBooksFormComponent } from "./add-books-form/add-books-form.component";
import { BooksTableComponent } from "./books-table/books-table.component";

@Component({
  selector: 'app-admin-books',
  imports: [AdminNavbarComponent, AddBooksFormComponent, BooksTableComponent],
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css'
})
export class AdminBooksComponent {
  isAddFormOpen = signal(false);

  toggleAddForm() {
    this.isAddFormOpen.set(!this.isAddFormOpen());
  }
}
