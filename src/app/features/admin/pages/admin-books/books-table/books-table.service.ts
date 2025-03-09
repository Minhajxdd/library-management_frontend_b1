import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Book } from './books.model';

@Injectable({
  providedIn: 'root',
})
export class BooksTableService {
  private readonly http = inject(HttpClient);

  fetchBooks() {
    return this.http.get<{data: Book[]}>(`${environment.back_end}/books`, {
      withCredentials: true,
    });
  }
}
