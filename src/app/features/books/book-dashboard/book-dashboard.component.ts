import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { UserNavbarComponent } from '../../../shared/components/navbars/user-navbar/user-navbar.component';
import { DahsboardSearchComponent } from './dahsboard-search/dahsboard-search.component';
import { BookDashboardService } from './book-dashboard.service';

@Component({
  selector: 'app-book-dashboard',
  imports: [UserNavbarComponent, DahsboardSearchComponent],
  templateUrl: './book-dashboard.component.html',
  styleUrl: './book-dashboard.component.css',
})
export class BookDashboardComponent implements OnInit{
  private readonly bookDashboardService = inject(BookDashboardService);
  private readonly destoryRef = inject(DestroyRef);

  isLoading = signal(true);

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(page?: number, search?: string) {
    const subscription = this.bookDashboardService.fetchBooks(page, search)
    .subscribe({
      next: (data) => {
        console.log(data);
      }
    });

    this.destoryRef.onDestroy(() => {
      subscription.unsubscribe();
    })

  }
}
