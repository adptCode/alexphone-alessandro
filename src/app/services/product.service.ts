import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sku } from '../models/sku.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.API_URL;

  private http = inject(HttpClient);

  getProducts(): Observable<Sku[]> {
    return this.http.get<Sku[]>(`${this.apiUrl}/skus`);
  }

  getProductById(id: string): Observable<Sku> {
    return this.http.get<Sku>(`${this.apiUrl}/sku/${id}`);
  }
}
