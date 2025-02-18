import { Injectable } from '@angular/core';
import { Sku } from '../models/sku.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cart_items';

  getCart(): Sku[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  addToCart(product: Sku): void {
    const cart = this.getCart()
    cart.push(product)
    localStorage.setItem(this.cartKey, JSON.stringify(cart))
  }

  removeFromCart(product: Sku): void {
    const cart = this.getCart()
    const index = cart.findIndex(item => item.id === product.id)
    cart.splice(index, 1)
    localStorage.setItem(this.cartKey, JSON.stringify(cart))
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey)
  }
}
