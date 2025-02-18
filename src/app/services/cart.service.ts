import { inject, Injectable } from '@angular/core';
import { Sku } from '../models/sku.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateOrderBody } from '../models/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart_items';
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  private cartUpdatedSubject = new BehaviorSubject<void>(undefined);
  cartUpdated = this.cartUpdatedSubject.asObservable();

  getCart(): Sku[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(product: Sku): void {
    const cart = this.getCart();
    cart.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartUpdatedSubject.next();
  }

  removeFromCart(productSku: string): void {
    const cart = this.getCart();
    const index = cart.findIndex((item) => item.sku === productSku);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      this.cartUpdatedSubject.next();
    }
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.cartUpdatedSubject.next();
  }

  placeOrder(): Observable<void> {
    const order: CreateOrderBody = { skus: this.getCart() };
    return this.http.put<void>(`${this.apiUrl}/order`, order);
  }
}
