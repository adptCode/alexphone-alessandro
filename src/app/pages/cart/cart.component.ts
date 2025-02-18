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
  isLoading = false;

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

  placeOrder(): void {
    if (this.cart.length === 0) {
      alert('El carrito está vacío.')
      return
    }

    this.isLoading = true

    this.cartService.placeOrder().subscribe({
      next: () => {
        alert('Pedido realizado con éxito!')
        this.clearCart()
        this.isLoading = false
      },
      error: (err) => {
        console.error('Error al realizar el pedido:', err)
        alert('Hubo un problema al procesar el pedido.')
        this.isLoading = false
      }
    })
  }

}
