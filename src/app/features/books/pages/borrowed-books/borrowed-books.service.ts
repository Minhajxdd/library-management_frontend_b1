import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BorrowedBooksService {
  private readonly http = inject(HttpClient);

  getBorrowedBooks() {
    return this.http.get(`${environment.back_end}/borrow`, {
      withCredentials: true,
    });
  }
}
