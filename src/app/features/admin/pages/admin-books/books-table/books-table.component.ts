import { Component, inject, OnInit, signal } from '@angular/core';
import { BooksTableService } from './books-table.service';
import { Book } from './books.model';

@Component({
  selector: 'app-books-table',
  imports: [],
  templateUrl: './books-table.component.html',
  styleUrl: './books-table.component.css',
})
export class BooksTableComponent implements OnInit {
  private readonly booksTableService = inject(BooksTableService);

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
  }
}
