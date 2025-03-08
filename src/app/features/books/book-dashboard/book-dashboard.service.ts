import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookDashboardService {
  private readonly http = inject(HttpClient);

  private readonly LIMIT = 6;

  fetchBooks(page: number = 1, search?: string) {
    return this.http.get(
      `${environment.back_end}/books?search=${search}&page=${page}&limit=${this.LIMIT}`,
      {
        withCredentials: true,
      }
    );
  }
}
