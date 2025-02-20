import { Component, inject, OnInit } from '@angular/core';
import { Sku } from '../../models/sku.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { GradeFormatPipe } from "../../pipes/grade-format.pipe";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, GradeFormatPipe, CapitalizePipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product!: Sku;
  loading = true;
  showAlert = false;

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    const productSku = this.route.snapshot.paramMap.get('sku');

    if (productSku) {
      this.productService.getProductById(productSku).subscribe((data) => {
        this.product = data;
        this.loading = false;
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 3000);
    }
  }
}
