import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserNavbarComponent } from "../../../../shared/components/navbars/user-navbar/user-navbar.component";
import { BorrowedBooksService } from './borrowed-books.service';

@Component({
  selector: 'app-borrowed-books',
  imports: [UserNavbarComponent],
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.css'
})
export class BorrowedBooksComponent implements OnInit{
  private readonly borrowedBooksService = inject(BorrowedBooksService);
  private readonly destoryRef = inject(DestroyRef);

  ngOnInit(): void {
    console.log('this ist etestlog')
    this.fetchBooks();
  }

  fetchBooks() {
    const subscription = this.borrowedBooksService.getBorrowedBooks()
    .subscribe({
      next: (data) => {
        console.log(`This is the data received`);
        console.log(data);
      }
    });
    
    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }
}
