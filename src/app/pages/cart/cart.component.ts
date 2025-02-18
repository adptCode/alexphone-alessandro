import { Component, inject, OnInit } from '@angular/core';
import { Sku } from '../../models/sku.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Sku[] = [];
  isLoading = false;
  alertMessage = '';
  alertType = '';

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  showAlert(message: string, type: 'success' | 'danger' | 'warning'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }

  removeItem(sku: string): void {
    this.cartService.removeFromCart(sku);
    this.cart = this.cartService.getCart();
    this.showAlert('Producto eliminado del carrito!', 'warning');
  }

  clearCart(showAlert = true): void {
    this.cartService.clearCart();
    this.cart = [];
    if (showAlert) {
      this.showAlert('Carrito vaciado!', 'danger');
    }
  }

  placeOrder(): void {
    if (this.cart.length === 0) {
      this.showAlert('El carrito está vacío.', 'warning');
      return;
    }

    this.isLoading = true;

    this.cartService.placeOrder().subscribe({
      next: () => {
        this.showAlert('Pedido realizado con éxito!', 'success');
        this.clearCart(false);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al realizar el pedido:', err);
        this.showAlert('Hubo un problema al procesar el pedido.', 'danger');
        this.isLoading = false;
      },
    });
  }
}
