import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Book } from '../../shared/models/books.model';

@Injectable({
  providedIn: 'root',
})
export class BookDashboardService {
  private readonly http = inject(HttpClient);

  private readonly LIMIT = 6;

  fetchBooks(page: number = 1, search?: string) {
    let url = `${environment.back_end}/books?page=${page}&limit=${this.LIMIT}`;
    if (search) url += `search=${search}`;

    return this.http.get<{ data: Book[] }>(url, {
      withCredentials: true,
    });
  }
}
