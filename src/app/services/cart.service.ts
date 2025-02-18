import { inject, Injectable } from '@angular/core';
import { Sku } from '../models/sku.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CreateOrderBody } from '../models/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart_items';
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  getCart(): Sku[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(product: Sku): void {
    const cart = this.getCart()
    cart.push(product)
    localStorage.setItem(this.cartKey, JSON.stringify(cart))
  }

  removeFromCart(productSku: string): void {
    const cart = this.getCart().filter(item => item.sku !== productSku)
    localStorage.setItem(this.cartKey, JSON.stringify(cart))
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey)
  }

  placeOrder(): Observable<void> {
    const order: CreateOrderBody = { skus: this.getCart() }
    return this.http.put<void>(`${this.apiUrl}/order`, order)
  }
}
