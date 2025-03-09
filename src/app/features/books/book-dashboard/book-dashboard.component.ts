import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserNavbarComponent } from '../../../shared/components/navbars/user-navbar/user-navbar.component';
import { DahsboardSearchComponent } from './dahsboard-search/dahsboard-search.component';
import { BookDashboardService } from './book-dashboard.service';
import { Book } from './books.model';
import { BookBoxComponent } from "./book-box/book-box.component";
import { BookDueFormComponent } from "./book-due-form/book-due-form.component";

@Component({
  selector: 'app-book-dashboard',
  imports: [UserNavbarComponent, DahsboardSearchComponent, BookBoxComponent, BookDueFormComponent],
  templateUrl: './book-dashboard.component.html',
  styleUrl: './book-dashboard.component.css',
})
export class BookDashboardComponent implements OnInit {
  private readonly bookDashboardService = inject(BookDashboardService);
  private readonly destoryRef = inject(DestroyRef);

  isLoading = signal(true);
  books: Book[] = [];

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(page?: number, search?: string) {
    this.isLoading.set(true);

    const subscription = this.bookDashboardService
      .fetchBooks(page, search)
      .subscribe({
        next: (data) => {
          this.books = data.data;
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  isDueModalOpen = signal(false);
  bookId: string = '';

  onAddBook(bookId: string) {
    this.bookId = bookId;
    this.isDueModalOpen.set(true);
  }

  onDueModalClose(value: boolean) {
    this.isDueModalOpen.set(value);
  }
}
