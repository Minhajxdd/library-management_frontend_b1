import { Component, input } from '@angular/core';
import { Book } from '../books.model';

@Component({
  selector: '[app-books-tr]',
  imports: [],
  templateUrl: './books-tr.component.html',
  styleUrl: './books-tr.component.css'
})
export class BooksTrComponent {
  book = input.required<Book>();
}
