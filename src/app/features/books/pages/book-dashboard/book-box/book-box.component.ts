import { Component, input, output } from '@angular/core';
import { Book } from '../books.model';

@Component({
  selector: 'app-book-box',
  imports: [],
  templateUrl: './book-box.component.html',
  styleUrl: './book-box.component.css'
})
export class BookBoxComponent {
  book = input.required<Book>()
  onAddBook = output<string>();


  onBookAdd() {
    this.onAddBook.emit(this.book()._id);
  }

}
