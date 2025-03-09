import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserNavbarComponent } from '../../../../shared/components/navbars/user-navbar/user-navbar.component';
import { BorrowedBooksService } from './borrowed-books.service';
import { Book } from '../../shared/models/books.model';
import { BookBoxComponent } from '../../shared/book-box/book-box.component';

@Component({
  selector: 'app-borrowed-books',
  imports: [UserNavbarComponent, BookBoxComponent],
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.css',
})
export class BorrowedBooksComponent implements OnInit {
  onAddBook($event: Event) {
    throw new Error('Method not implemented.');
  }
  private readonly borrowedBooksService = inject(BorrowedBooksService);
  private readonly destoryRef = inject(DestroyRef);

  isLoading = signal(true);
  books: Book[] = [];

  ngOnInit(): void {
    console.log('this ist etestlog');
    this.fetchBooks();
  }

  fetchBooks() {
    this.isLoading.set(true);

    const subscription = this.borrowedBooksService
      .getBorrowedBooks()
      .subscribe({
        next: (data) => {
          this.books = [];
          data.data.forEach((element) => {
            this.books.push(element.bookId);
          });
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onReturnBook(value: string) {
    throw new Error('UnImplemneted Method');
  }
}
