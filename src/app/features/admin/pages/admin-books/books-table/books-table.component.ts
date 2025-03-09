import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { BooksTableService } from './books-table.service';
import { Book } from './books.model';
import { BooksTrComponent } from "./books-tr/books-tr.component";

@Component({
  selector: 'app-books-table',
  imports: [BooksTrComponent],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css',
})
export class BooksTableComponent implements OnInit {
  private readonly booksTableService = inject(BooksTableService);
  private destoryRef = inject(DestroyRef);

  books: Book[] = [];
  isLoading = signal(true);

  ngOnInit(): void {
    this.fetchBookData();
  }

  fetchBookData() {
    this.isLoading.set(true);

    const subscription = this.booksTableService.fetchBooks().subscribe({
      next: (data) => {
        this.books = data.data;
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    })

  }
}
