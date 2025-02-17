import { Component, inject, OnInit } from '@angular/core';
import { Sku } from '../../models/sku.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  products: Sku[] = []

  private productService = inject(ProductService)

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data
    })
  }

}
