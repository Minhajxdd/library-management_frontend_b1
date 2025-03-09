import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItemDetails } from './add-books.model';
import { environment } from '../../../../../environments/environment';
import { Book } from '../books-table/books.model';

@Injectable({
  providedIn: 'root',
})
export class AddBooksFormService {
  private readonly http = inject(HttpClient);

  createBook(data: ItemDetails) {
    const formData = new FormData();

    formData.append('image', data.image);
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('quantity', data.quantity.toString());

    if (data.description) {
      formData.append('description', data.description);
    }

    return this.http.post<{ data: Book }>(
      `${environment.back_end}/books`,
      formData,
      {
        withCredentials: true,
      }
    );
  }
}
