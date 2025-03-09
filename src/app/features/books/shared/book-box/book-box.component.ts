import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { Book } from '../models/books.model';

@Component({
  selector: 'app-book-box',
  imports: [],
  templateUrl: './book-box.component.html',
  styleUrl: './book-box.component.css',
})
export class BookBoxComponent {
  book = input.required<Book>();
  type = input.required<'borrow' | 'return'>();
  onClickBook = output<string>();

  onBookAdd() {
    this.onClickBook.emit(this.book()._id);
  }
}
