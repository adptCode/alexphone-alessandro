import { Component, inject, OnInit } from '@angular/core';
import { Sku } from '../../models/sku.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cart: Sku[] = [];

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeItem(sku: string): void {
    this.cartService.removeFromCart(sku)
    this.cart = this.cartService.getCart()
  }

  clearCart(): void {
    this.cartService.clearCart()
    this.cart = []
  }

}
