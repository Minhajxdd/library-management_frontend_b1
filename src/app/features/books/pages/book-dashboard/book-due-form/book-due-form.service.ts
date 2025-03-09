import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookDueFormService {
  private readonly http = inject(HttpClient);

  borrowBook(bookId: string, dueDate: string) {
    const query = { bookId, dueDate };
    return this.http.post(
      `${environment.back_end}/transactions/borrow`,
      query,
      { withCredentials: true }
    );
  }
}
