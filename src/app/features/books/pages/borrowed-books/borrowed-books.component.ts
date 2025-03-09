import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserNavbarComponent } from "../../../../shared/components/navbars/user-navbar/user-navbar.component";
import { BorrowedBooksService } from './borrowed-books.service';
import { Book } from '../../shared/models/books.model';

@Component({
  selector: 'app-borrowed-books',
  imports: [UserNavbarComponent],
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.css'
})
export class BorrowedBooksComponent implements OnInit{
  private readonly borrowedBooksService = inject(BorrowedBooksService);
  private readonly destoryRef = inject(DestroyRef);

  isLoading = signal(true);
  books: Book[] = [];

  ngOnInit(): void {
    console.log('this ist etestlog')
    this.fetchBooks();
  }

  fetchBooks() {

    this.isLoading.set(true);

    const subscription = this.borrowedBooksService.getBorrowedBooks()
    .subscribe({
      next: (data) => {
        this.books = data.data;
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
    
    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }
}
