import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  cartItemCount = 0;

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.updateCartCount();
    this.cartService.cartUpdated.subscribe(() => {
      this.updateCartCount();
    });
  }

  updateCartCount(): void {
    this.cartItemCount = this.cartService.getCart().length;
  }
}
