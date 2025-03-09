import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../books-table/books.model';

@Injectable({
  providedIn: 'root',
})
export class AddBookService {
  private bookSource = new BehaviorSubject<Book | null>(null);

  currentBook = this.bookSource.asObservable();

  constructor() {}

  changeBook(book: Book) {
    this.bookSource.next(book);
  }
}
